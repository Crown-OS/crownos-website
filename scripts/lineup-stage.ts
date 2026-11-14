import { APP_LINEUP } from "../src/data/system-apps/stack";

const {
  window: WINDOW,
  stage,
  scale,
  tilt,
  perspective,
  top,
  firstCenter,
  lastCenter,
  brightness,
  order,
} = APP_LINEUP;
const STEP = (lastCenter - firstCenter) / (order.length - 1);
const OFFSET_TOP = top - (WINDOW.height * (1 - scale)) / 2;

export const LINEUP_STAGE_SELECTOR = ".app-lineup";

const STAGE_CSS = `
body::before, body::after { display: none !important; }
.app-lineup {
  position: absolute;
  top: 0;
  left: 0;
  width: ${stage.width}px;
  height: ${stage.height}px;
  mask-image: linear-gradient(180deg, #000 82%, transparent);
}
.lineup-shade { position: absolute; }
.lineup-frame {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: #0a0a0b;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 0.9),
    inset 0 0 0 1px rgb(255 255 255 / 0.07),
    -40px 40px 90px -30px rgb(0 0 0 / 0.9);
  -webkit-box-reflect: below 16px
    linear-gradient(transparent 66%, rgb(255 255 255 / 0.14));
}
`;

function placement(index: number) {
  const depth = index / (order.length - 1);
  const shade = brightness.back + (brightness.front - brightness.back) * depth;
  return [
    `left: ${firstCenter + index * STEP - WINDOW.width / 2}px`,
    `top: ${OFFSET_TOP}px`,
    `width: ${WINDOW.width}px`,
    `height: ${WINDOW.height}px`,
    `z-index: ${index}`,
    `transform: perspective(${perspective}px) rotateY(${tilt}deg) scale(${scale})`,
    `filter: brightness(${shade})`,
  ].join("; ");
}

export const composeLineupScript = `(() => {
  const style = document.createElement("style");
  style.textContent = ${JSON.stringify(STAGE_CSS)};
  document.head.append(style);
  const stage = document.createElement("div");
  stage.className = "app-lineup";
  ${JSON.stringify(order.map((id, index) => ({ id, style: placement(index) })))}
    .forEach(({ id, style }) => {
      const shade = document.createElement("div");
      shade.className = "lineup-shade";
      shade.style.cssText = style;
      const frame = document.createElement("div");
      frame.className = "lineup-frame";
      frame.append(document.querySelector('[data-app="' + id + '"]'));
      shade.append(frame);
      stage.append(shade);
    });
  document.body.append(stage);
})()`;
