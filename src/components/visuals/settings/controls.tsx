import { useId } from "react";
import { LucideIcon } from "./icons";
import { SettingsText } from "./text";
import { SETTINGS_COLOR } from "./theme";

const TOGGLE = { width: 48, height: 24, knobWidth: 28, padding: 2, travel: 16 };
const SLIDER = { thumbWidth: 26, thumbHeight: 20, trackHeight: 8, height: 30 };
const SLIDER_RING = 1.75;
const SELECT = { height: 34, radius: 16, padding: 10, chevron: 20, inset: 8 };

function VerticalGradient({
  id,
  from,
  to,
}: {
  id: string;
  from: string;
  to: string;
}) {
  return (
    <linearGradient id={id} x1={0} y1={0} x2={0} y2={1}>
      <stop offset={0} stopColor={from} />
      <stop offset={1} stopColor={to} />
    </linearGradient>
  );
}

export function Toggle({
  right,
  centerY,
  on,
}: {
  right: number;
  centerY: number;
  on: boolean;
}) {
  const trackId = useId();
  const shadowId = useId();
  const x = right - TOGGLE.width;
  const y = centerY - TOGGLE.height / 2;
  const knobHeight = TOGGLE.height - TOGGLE.padding * 2;
  const knobX = x + TOGGLE.padding + (on ? TOGGLE.travel : 0);
  return (
    <g>
      <defs>
        {on ? (
          <VerticalGradient
            id={trackId}
            from={SETTINGS_COLOR.accentStart}
            to={SETTINGS_COLOR.accentEnd}
          />
        ) : (
          <VerticalGradient id={trackId} from="#3f3f46" to="#2a2a2e" />
        )}
        <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx={0}
            dy={0}
            stdDeviation={2}
            floodColor="#000"
            floodOpacity={0.14}
          />
        </filter>
      </defs>
      <rect
        x={x}
        y={y}
        width={TOGGLE.width}
        height={TOGGLE.height}
        rx={TOGGLE.height / 2}
        fill={`url(#${trackId})`}
      />
      <rect
        x={knobX}
        y={y + TOGGLE.padding}
        width={TOGGLE.knobWidth}
        height={knobHeight}
        rx={knobHeight / 2}
        fill={SETTINGS_COLOR.knob}
        filter={`url(#${shadowId})`}
      />
      <rect
        x={knobX + 1}
        y={y + TOGGLE.padding + 1}
        width={TOGGLE.knobWidth - 2}
        height={knobHeight - 2}
        rx={knobHeight / 2 - 1}
        fill="none"
        stroke={SETTINGS_COLOR.knobRim}
        strokeWidth={2}
      />
    </g>
  );
}

export function Select({
  right,
  y,
  width,
  value,
}: {
  right: number;
  y: number;
  width: number;
  value: string;
}) {
  const x = right - width;
  return (
    <g>
      <rect
        x={x + 0.5}
        y={y + 0.5}
        width={width - 1}
        height={SELECT.height - 1}
        rx={SELECT.radius - 0.5}
        fill={SETTINGS_COLOR.selectFill}
        stroke={SETTINGS_COLOR.selectBorder}
      />
      <SettingsText
        x={x + SELECT.padding}
        y={y + 23}
        color={SETTINGS_COLOR.primary}
      >
        {value}
      </SettingsText>
      <LucideIcon
        name="chevronDown"
        x={right - SELECT.inset - SELECT.chevron}
        y={y + (SELECT.height - SELECT.chevron) / 2}
        size={SELECT.chevron}
        stroke={1.8}
        color={SETTINGS_COLOR.muted}
      />
    </g>
  );
}

export function Slider({
  x,
  top,
  right,
  value,
}: {
  x: number;
  top: number;
  right: number;
  value: number;
}) {
  const accentId = useId();
  const rimId = useId();
  const clipId = useId();
  const trackX = x + SLIDER.thumbWidth / 2;
  const trackWidth = right - x - SLIDER.thumbWidth;
  const trackY = top + (SLIDER.height - SLIDER.trackHeight) / 2;
  const fill = value * trackWidth;
  const thumbX = x + fill;
  const thumbY = top + (SLIDER.height - SLIDER.thumbHeight) / 2;
  const thumbRadius = SLIDER.thumbHeight / 2;
  const rimDepth = (SLIDER.thumbWidth / 2) * 0.22;
  const rimStop = rimDepth / SLIDER.thumbWidth;
  return (
    <g>
      <defs>
        <linearGradient
          id={accentId}
          gradientUnits="userSpaceOnUse"
          x1={trackX}
          x2={trackX + trackWidth}
          y1={0}
          y2={0}
        >
          <stop offset={0} stopColor={SETTINGS_COLOR.accentStart} />
          <stop offset={1} stopColor={SETTINGS_COLOR.accentEnd} />
        </linearGradient>
        <linearGradient id={rimId}>
          <stop offset={0} stopColor="#f5f5f5" />
          <stop offset={rimStop} stopColor="#f5f5f5" stopOpacity={0} />
          <stop offset={1 - rimStop} stopColor="#f5f5f5" stopOpacity={0} />
          <stop offset={1} stopColor="#f5f5f5" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect
            x={trackX}
            y={trackY}
            width={trackWidth}
            height={SLIDER.trackHeight}
            rx={SLIDER.trackHeight / 2}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect
          x={trackX}
          y={trackY}
          width={trackWidth}
          height={SLIDER.trackHeight}
          fill={`url(#${accentId})`}
        />
        <rect
          x={trackX + fill}
          y={trackY}
          width={trackWidth - fill}
          height={SLIDER.trackHeight}
          fill={SETTINGS_COLOR.track}
        />
      </g>
      <rect
        x={thumbX - SLIDER_RING / 2}
        y={thumbY - SLIDER_RING / 2}
        width={SLIDER.thumbWidth + SLIDER_RING}
        height={SLIDER.thumbHeight + SLIDER_RING}
        rx={thumbRadius + SLIDER_RING / 2}
        fill="none"
        stroke={SETTINGS_COLOR.knobShadow}
        strokeWidth={SLIDER_RING}
      />
      <rect
        x={thumbX}
        y={thumbY}
        width={SLIDER.thumbWidth}
        height={SLIDER.thumbHeight}
        rx={thumbRadius}
        fill={SETTINGS_COLOR.knob}
        fillOpacity={0.85}
      />
      <rect
        x={thumbX}
        y={thumbY}
        width={SLIDER.thumbWidth}
        height={SLIDER.thumbHeight}
        rx={thumbRadius}
        fill={`url(#${rimId})`}
      />
    </g>
  );
}
