import { FlowLine, Mono, Pill, SkeletonLine, VisualSvg } from "./primitives";

const LAPTOP_SCREEN = { x: 40, y: 170, width: 300, height: 190 };
const TABLET_SCREEN = { x: 384, y: 192, width: 180, height: 128 };
const SPANNING_WINDOW = { x: 196, y: 214, width: 296, height: 118 };
const STYLUS_STROKE = "M500 290c8-14 16-14 18-4s8 12 14 0 10-10 14 2";

export function SecondScreen() {
  const { x, y, width } = SPANNING_WINDOW;
  return (
    <VisualSvg
      viewBox="0 0 600 520"
      label="A window stretched across a laptop and a tablet used as a second screen"
    >
      <defs>
        <clipPath id="second-screen-displays">
          <rect {...LAPTOP_SCREEN} rx={6} />
          <rect {...TABLET_SCREEN} rx={6} />
        </clipPath>
      </defs>

      <rect
        x={28}
        y={158}
        width={324}
        height={214}
        rx={14}
        className="fill-gray-850 stroke-white/30"
      />
      <rect {...LAPTOP_SCREEN} rx={6} className="fill-gray-900" />
      <path
        d="M8 372h364l-14 18H22z"
        className="fill-gray-750 stroke-white/30"
      />

      <rect
        x={372}
        y={180}
        width={204}
        height={152}
        rx={16}
        className="fill-gray-850 stroke-white/30"
      />
      <rect {...TABLET_SCREEN} rx={6} className="fill-gray-900" />

      <g clipPath="url(#second-screen-displays)">
        <rect
          {...SPANNING_WINDOW}
          rx={10}
          className="fill-gray-800 stroke-white/40"
        />
        <path d={`M${x} ${y + 24}h${width}`} className="stroke-white/12" />
        <SkeletonLine x={x + 16} y={y + 44} width={200} />
        <SkeletonLine x={x + 16} y={y + 58} width={150} />
        <SkeletonLine x={x + 16} y={y + 72} width={240} />
        <rect
          x={x + 16}
          y={y + 86}
          width={96}
          height={20}
          rx={6}
          className="fill-white/8"
        />
        <path
          d={STYLUS_STROKE}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          className="draw-stroke stroke-white"
        />
      </g>

      <path
        d="M548 300 590 236"
        strokeWidth={6}
        strokeLinecap="round"
        className="stroke-gray-500"
      />
      <path
        d="m546 303 3-6"
        strokeWidth={3}
        strokeLinecap="round"
        className="stroke-white"
      />

      <FlowLine d="M190 150C240 96 420 96 474 170" />
      <Pill x={332} y={110} centered label="Crown Link · 6 ms" tone="solid" />
      <Mono x={190} y={420} anchor="middle" className="fill-white/45">
        Laptop
      </Mono>
      <Mono x={474} y={360} anchor="middle" className="fill-white/45">
        Tablet · touch + stylus
      </Mono>
    </VisualSvg>
  );
}
