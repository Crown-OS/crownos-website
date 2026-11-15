"use client";

import { type CSSProperties, useEffect, useId, useRef } from "react";
import type { TeamMember } from "@/data/team";
import type { Point } from "./rope-physics";
import { TeamIdCard } from "./TeamIdCard";
import { buildWire } from "./wire-layout";

const WIRE_TOP = 8;
const STRAP_LENGTHS = [70, 130, 90, 150] as const;
const INITIAL_SWINGS = [-260, 320, -200, 280] as const;
const DRAG_THRESHOLD = 6;
const TWIST_PER_VELOCITY = 0.045;
const MAX_TWIST = 60;
const TWIST_FOLLOW = 0.12;
const HOLO_PER_TWIST = 0.9;
const HOLO_PER_RADIAN = 160;
const STRAP_PRINT = "CROWNOS · ".repeat(30);

function smoothPath(points: readonly Point[]) {
  let path = `M${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length - 1; index++) {
    const midX = (points[index].x + points[index + 1].x) / 2;
    const midY = (points[index].y + points[index + 1].y) / 2;
    path += ` Q${points[index].x} ${points[index].y} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  return `${path} L${last.x} ${last.y}`;
}

function strapLengthAt(index: number) {
  return STRAP_LENGTHS[index % STRAP_LENGTHS.length];
}

function restStyle(index: number, count: number) {
  return {
    left: `${((index + 0.5) / count) * 100}%`,
    top: `${WIRE_TOP + strapLengthAt(index)}px`,
  } as CSSProperties;
}

export function TeamWire({ members }: { members: readonly TeamMember[] }) {
  const strapId = useId();
  const frameRef = useRef<HTMLDivElement>(null);
  const wirePathRef = useRef<SVGPathElement>(null);
  const strapPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const twistRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const frame = frameRef.current;
    const wirePath = wirePathRef.current;
    const cardElements = cardRefs.current;
    const twistElements = twistRefs.current;
    const strapPaths = strapPathRefs.current;
    if (!frame || !wirePath) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const twists = members.map(() => 0);
    let layout = buildLayout();
    let layoutWidth = frame.clientWidth;
    if (!reducedMotion) {
      layout.cards.forEach((card, index) => {
        layout.system.nudge(
          card.body,
          INITIAL_SWINGS[index % INITIAL_SWINGS.length],
        );
      });
    }

    function buildLayout() {
      return buildWire({
        width: frame?.clientWidth ?? 0,
        wireTop: WIRE_TOP,
        strapLengths: members.map((_, index) => strapLengthAt(index)),
        cardHeights: cardElements.map((card) => card?.offsetHeight ?? 0),
      });
    }

    let frameRequest = 0;
    let lastTime = 0;
    let isVisible = false;
    let topLayer = 1;
    let suppressNextClick = false;
    let gesture: {
      pointerId: number;
      cardIndex: number;
      startX: number;
      startY: number;
      offsetX: number;
      offsetY: number;
      isDragging: boolean;
    } | null = null;

    const render = () => {
      const { system, wire, cards } = layout;
      wirePath.setAttribute(
        "d",
        smoothPath(wire.map((index) => system.points[index])),
      );
      cards.forEach((card, index) => {
        const element = cardElements[index];
        const twistElement = twistElements[index];
        if (!element || !twistElement) return;
        const clip = system.points[card.clip];
        const body = system.points[card.body];
        const angle = Math.atan2(body.x - clip.x, body.y - clip.y);
        const twistTarget = Math.max(
          -MAX_TWIST,
          Math.min(
            MAX_TWIST,
            -system.velocityX(card.body) * TWIST_PER_VELOCITY,
          ),
        );
        twists[index] += (twistTarget - twists[index]) * TWIST_FOLLOW;
        element.style.transform = `translate(${clip.x}px, ${clip.y}px) translateX(-50%) rotate(${-angle}rad)`;
        element.style.setProperty(
          "--holo-shift",
          `${50 + twists[index] * HOLO_PER_TWIST + angle * HOLO_PER_RADIAN}%`,
        );
        twistElement.style.transform = `rotateY(${twists[index]}deg)`;
        strapPaths[index]?.setAttribute(
          "d",
          smoothPath(card.strap.map((point) => system.points[point])),
        );
      });
    };

    const isSettled = () =>
      layout.system.isResting() &&
      twists.every((twist) => Math.abs(twist) < 0.05);

    const tick = (time: number) => {
      const elapsed = lastTime ? (time - lastTime) / 1000 : 0;
      lastTime = time;
      layout.system.advance(elapsed);
      render();
      frameRequest =
        isVisible && !isSettled() ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (frameRequest || !isVisible) return;
      lastTime = 0;
      frameRequest = requestAnimationFrame(tick);
    };

    const toFrame = (event: PointerEvent) => {
      const bounds = frame.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element;
      const cardElement = target.closest<HTMLElement>("[data-card-index]");
      if (event.button !== 0 || !cardElement || target.closest("a")) return;
      const cardIndex = Number(cardElement.dataset.cardIndex);
      const body = layout.system.points[layout.cards[cardIndex].body];
      const pointer = toFrame(event);
      topLayer += 1;
      cardElement.style.zIndex = String(topLayer);
      gesture = {
        pointerId: event.pointerId,
        cardIndex,
        startX: pointer.x,
        startY: pointer.y,
        offsetX: pointer.x - body.x,
        offsetY: pointer.y - body.y,
        isDragging: false,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!gesture || event.pointerId !== gesture.pointerId) return;
      const pointer = toFrame(event);
      const cardElement = cardElements[gesture.cardIndex];
      if (!gesture.isDragging) {
        const travel = Math.hypot(
          pointer.x - gesture.startX,
          pointer.y - gesture.startY,
        );
        if (travel < DRAG_THRESHOLD) return;
        gesture.isDragging = true;
        cardElement?.setPointerCapture(event.pointerId);
        if (cardElement) cardElement.dataset.dragging = "true";
      }
      layout.system.grab(
        layout.cards[gesture.cardIndex].body,
        pointer.x - gesture.offsetX,
        pointer.y - gesture.offsetY,
      );
      wake();
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (!gesture || event.pointerId !== gesture.pointerId) return;
      if (gesture.isDragging) {
        suppressNextClick = true;
        layout.system.release();
        const cardElement = cardElements[gesture.cardIndex];
        if (cardElement) delete cardElement.dataset.dragging;
        wake();
      }
      gesture = null;
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!suppressNextClick) return;
      suppressNextClick = false;
      event.stopPropagation();
      event.preventDefault();
    };

    const visibility = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      wake();
    });
    const resize = new ResizeObserver(() => {
      if (
        frame.clientWidth === 0 ||
        Math.abs(frame.clientWidth - layoutWidth) < 1
      )
        return;
      layoutWidth = frame.clientWidth;
      layout = buildLayout();
      render();
      wake();
    });

    for (const card of cardElements) {
      if (!card) continue;
      card.style.left = "0";
      card.style.top = "0";
    }
    render();
    visibility.observe(frame);
    resize.observe(frame);
    frame.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);
    frame.addEventListener("click", onClickCapture, true);

    return () => {
      cancelAnimationFrame(frameRequest);
      visibility.disconnect();
      resize.disconnect();
      frame.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      frame.removeEventListener("click", onClickCapture, true);
    };
  }, [members]);

  const tallestStrap = Math.max(
    ...members.map((_, index) => strapLengthAt(index)),
  );

  return (
    <div
      ref={frameRef}
      className="relative h-[calc(var(--wire-drop)+32rem)]"
      style={{ "--wire-drop": `${WIRE_TOP + tallestStrap}px` } as CSSProperties}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        <path
          ref={wirePathRef}
          className="fill-none stroke-[#8d8d93] stroke-2 [stroke-linecap:round] [filter:drop-shadow(0_6px_4px_rgb(0_0_0/0.6))]"
        />
        {members.map((member, index) => (
          <g key={member.id}>
            <path
              ref={(element) => {
                strapPathRefs.current[index] = element;
              }}
              id={`${strapId}-${index}`}
              className="fill-none stroke-[#141416] stroke-[26] [stroke-linejoin:round] [filter:drop-shadow(0_0_0.5px_rgb(255_255_255/0.5))_drop-shadow(0_6px_5px_rgb(0_0_0/0.55))]"
            />
            <text
              className="fill-[rgb(255_255_255/0.78)] font-inter text-[10px] font-bold tracking-[0.28em]"
              dy="0.36em"
            >
              <textPath href={`#${strapId}-${index}`}>{STRAP_PRINT}</textPath>
            </text>
          </g>
        ))}
      </svg>
      <ul aria-label="Team member profile cards">
        {members.map((member, index) => (
          <TeamIdCard
            key={member.id}
            member={member}
            index={index}
            restStyle={restStyle(index, members.length)}
            cardRef={(element) => {
              cardRefs.current[index] = element;
            }}
            twistRef={(element) => {
              twistRefs.current[index] = element;
            }}
          />
        ))}
      </ul>
    </div>
  );
}
