import { Detail, Flow, HotDot, Lifted, STROKE } from "./line-kit";

const LENS = { cx: 24, cy: 24, knurl: 48, iris: 6 };

const polar = (radius: number, degrees: number) => {
  const angle = (degrees * Math.PI) / 180;
  const x = LENS.cx + radius * Math.cos(angle);
  const y = LENS.cy + radius * Math.sin(angle);
  return `${x.toFixed(2)} ${y.toFixed(2)}`;
};

const KNURL = Array.from(
  { length: LENS.knurl },
  (_, index) => (index * 360) / LENS.knurl,
)
  .map((angle) => `M${polar(13.2, angle)}L${polar(14.4, angle)}`)
  .join("");

const IRIS = Array.from(
  { length: LENS.iris },
  (_, index) => (index * 360) / LENS.iris,
)
  .map((angle) => `M${polar(4.6, angle)}L${polar(10, angle + 52)}`)
  .join("");

const APERTURE = `M${Array.from({ length: LENS.iris }, (_, index) =>
  polar(4.6, (index * 360) / LENS.iris),
).join("L")}Z`;

const Clipboard = () => (
  <>
    <Lifted>
      <rect x="11" y="9" width="24" height="31" rx="2.5" />
    </Lifted>
    <Detail tone="stroke-white/20" strokeWidth={STROKE.hair}>
      <rect x="13.5" y="13" width="19" height="24.5" rx="1" />
    </Detail>
    <Detail tone="stroke-white/35" strokeWidth={STROKE.hair}>
      <path d="M16.5 18h13M16.5 21h10M16.5 24h12M16.5 27h7" />
    </Detail>
    <Flow d="M16.5 30.5h9" />
    <Lifted>
      <rect x="17" y="6.5" width="12" height="5" rx="1.4" />
    </Lifted>
    <Detail strokeWidth={STROKE.hair}>
      <circle cx="23" cy="8.5" r="0.9" />
    </Detail>
    <Lifted>
      <circle cx="35" cy="36" r="5.4" />
    </Lifted>
    <Detail tone="stroke-white/80">
      <path d="M32.4 35a2.7 2.7 0 0 1 4.8-1.5M37.6 37a2.7 2.7 0 0 1-4.8 1.5M37.4 32.2v1.6h-1.6M32.6 39.8v-1.6h1.6" />
    </Detail>
  </>
);

const Camera = () => (
  <>
    <Lifted>
      <circle cx="24" cy="24" r="16" />
    </Lifted>
    <Detail tone="stroke-white/25" strokeWidth={STROKE.hair}>
      <path d={KNURL} />
    </Detail>
    <Detail tone="stroke-white/20" strokeWidth={STROKE.hair}>
      <circle cx="24" cy="24" r="12.4" />
    </Detail>
    <Detail>
      <circle cx="24" cy="24" r="10.6" />
    </Detail>
    <Detail tone="stroke-white/35" strokeWidth={STROKE.hair}>
      <path d={IRIS} />
    </Detail>
    <Detail tone="stroke-white/80">
      <path d={APERTURE} />
      <path d="M16.6 19.5a8.4 8.4 0 0 1 4.6-4.6" />
    </Detail>
    <HotDot cx={24} cy={24} r={1.3} />
  </>
);

const Remote = () => (
  <>
    <Lifted>
      <rect x="10" y="7" width="15.5" height="34" rx="3" />
    </Lifted>
    <Detail tone="stroke-white/20" strokeWidth={STROKE.hair}>
      <rect x="11.6" y="8.6" width="12.3" height="30.8" rx="2" />
    </Detail>
    <Detail strokeWidth={STROKE.hair}>
      <rect x="15.7" y="10" width="4" height="1.2" rx="0.6" />
    </Detail>
    <Detail tone="stroke-white/35" strokeWidth={STROKE.hair}>
      {[14, 17.6, 21.2].flatMap((y) =>
        [13.5, 16.7, 19.9].map((x) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="2.2"
            height="2.2"
            rx="0.6"
          />
        )),
      )}
    </Detail>
    <Lifted strokeWidth={STROKE.detail}>
      <path d="M16 26v6.4l1.7-1.6 1.2 2.7 1.1-.5-1.2-2.6 2.3-.1Z" />
    </Lifted>
    <Detail tone="stroke-white/80">
      <path d="M29 13.5a3.5 3.5 0 0 1 3.5 3.5M29 9.5a7.5 7.5 0 0 1 7.5 7.5" />
    </Detail>
    <Flow d="M29 5.5a11.5 11.5 0 0 1 11.5 11.5" />
    <Lifted>
      <circle cx="36.5" cy="34" r="5.4" />
    </Lifted>
    <Detail tone="stroke-white/80">
      <rect x="33.6" y="31.6" width="5.8" height="3.8" rx="0.6" />
      <path d="M35.2 37h2.6" />
    </Detail>
  </>
);

const Folder = () => (
  <>
    <Flow d="M24 10V3" />
    <Lifted>
      <path d="M7 14a2 2 0 0 1 2-2h8l2.6 2.6H39a2 2 0 0 1 2 2V38H7Z" />
    </Lifted>
    <Lifted strokeWidth={STROKE.detail}>
      <rect
        x="10.5"
        y="15.5"
        width="25"
        height="16"
        rx="1"
        transform="rotate(-4 23 23.5)"
      />
      <rect x="12.5" y="17" width="25" height="16" rx="1" />
    </Lifted>
    <Detail tone="stroke-white/35" strokeWidth={STROKE.hair}>
      <path d="M15.5 20.5h12M15.5 23h18" />
    </Detail>
    <Lifted>
      <rect x="7" y="21" width="34" height="19" rx="2" />
    </Lifted>
    <Detail tone="stroke-white/12" strokeWidth={STROKE.hair}>
      <rect x="8.4" y="22.4" width="31.2" height="16.2" rx="1.2" />
    </Detail>
    <Detail tone="stroke-white/80">
      <path d="M24 35.5v-9m-3.4 3.4 3.4-3.4 3.4 3.4" />
    </Detail>
  </>
);

const Bell = () => (
  <>
    <Detail>
      <path d="M8.5 18a12 12 0 0 1 3.6-7.6M11.8 19.4a8 8 0 0 1 2.4-5" />
    </Detail>
    <Lifted>
      <circle cx="24" cy="37.4" r="2.6" />
    </Lifted>
    <Lifted>
      <path d="M24 7.5c-1.1 0-2 .9-2 2v.8c-4.3 1-7.2 4.9-7.2 9.4v6.6l-3.3 4.3V34h25v-3.4l-3.3-4.3v-6.6c0-4.5-2.9-8.4-7.2-9.4v-.8c0-1.1-.9-2-2-2Z" />
    </Lifted>
    <Detail tone="stroke-white/20" strokeWidth={STROKE.hair}>
      <path d="M17.4 26.3v-6.6c0-3.4 2.4-6.4 6.6-7M11.5 31.4h25" />
    </Detail>
    <Lifted>
      <circle cx="34.5" cy="11" r="4.4" />
    </Lifted>
    <HotDot cx={34.5} cy={11} r={1.7} />
  </>
);

const SecondScreen = () => (
  <>
    <Lifted>
      <path d="M16.5 27.5h5l1 5h-7Z" />
      <rect x="12" y="32.5" width="14" height="1.8" rx="0.9" />
      <rect x="4" y="7" width="30" height="20.5" rx="1.6" />
    </Lifted>
    <Detail tone="stroke-white/20" strokeWidth={STROKE.hair}>
      <rect x="5.4" y="8.4" width="27.2" height="17.7" rx="0.8" />
    </Detail>
    <Detail>
      <rect x="8" y="11" width="13" height="9" rx="0.8" />
      <path d="M8 13h13" />
    </Detail>
    <Flow d="M21 15.5h9.5v8" />
    <Lifted>
      <rect x="28.5" y="18.5" width="16" height="22" rx="2.2" />
    </Lifted>
    <Detail tone="stroke-white/20" strokeWidth={STROKE.hair}>
      <rect x="30" y="20" width="13" height="19" rx="1.2" />
    </Detail>
    <Detail tone="stroke-white/80">
      <rect x="31.5" y="25" width="10" height="7" rx="0.8" />
      <path d="M31.5 26.8h10" />
    </Detail>
  </>
);

const Hotspot = () => (
  <>
    <Detail tone="stroke-white/20" strokeWidth={STROKE.hair}>
      <path d="M9.9 7.9a20 20 0 0 0 0 28.3M38.1 7.9a20 20 0 0 1 0 28.3" />
    </Detail>
    <Flow d="M14.1 12.1a14 14 0 0 0 0 19.8" />
    <Flow d="M33.9 12.1a14 14 0 0 1 0 19.8" />
    <Detail tone="stroke-white/80">
      <path d="M18.3 16.3a8 8 0 0 0 0 11.4M29.7 16.3a8 8 0 0 1 0 11.4" />
    </Detail>
    <Lifted>
      <path d="M22.6 25.5 19 41h10l-3.6-15.5Z" />
    </Lifted>
    <Detail tone="stroke-white/35" strokeWidth={STROKE.hair}>
      <path d="M21.6 30h4.8M20.6 35.5h6.8M21.6 30l5.8 5.5M26.4 30l-5.8 5.5" />
    </Detail>
    <Lifted>
      <circle cx="24" cy="22" r="3.6" />
    </Lifted>
    <HotDot cx={24} cy={22} r={1.4} />
  </>
);

const HANDSET_SCALE = 1.25;

const Call = () => (
  <>
    <Detail tone="stroke-white/80">
      <path d="M29 14.5a4.5 4.5 0 0 1 4.5 4.5M29 10a9 9 0 0 1 9 9" />
    </Detail>
    <Flow d="M29 5.5A13.5 13.5 0 0 1 42.5 19" />
    <g transform={`translate(5 8) scale(${HANDSET_SCALE})`}>
      <Lifted strokeWidth={STROKE.bold / HANDSET_SCALE}>
        <path d="M1.5 4.5a3 3 0 0 1 3-3h1.37c.86 0 1.61.59 1.82 1.42l1.1 4.42a1.88 1.88 0 0 1-.69 1.96l-1.3.97c-.13.1-.16.25-.12.35a11.29 11.29 0 0 0 6.7 6.7c.1.04.25.01.35-.13l.97-1.29a1.88 1.88 0 0 1 1.96-.7l4.42 1.11c.83.2 1.42.96 1.42 1.82v1.37a3 3 0 0 1-3 3h-2.25C8.55 22.5 1.5 15.45 1.5 6.75Z" />
      </Lifted>
      <Detail tone="stroke-white/20" strokeWidth={STROKE.hair / HANDSET_SCALE}>
        <path d="M3.2 6.5c0 7.4 5.9 13.6 13.3 14.2M4.3 3.2h1.5M19.6 18.5v1.4" />
      </Detail>
    </g>
  </>
);

export const ECOSYSTEM_ARTWORK = {
  clipboard: Clipboard,
  camera: Camera,
  remote: Remote,
  folder: Folder,
  bell: Bell,
  "second-screen": SecondScreen,
  hotspot: Hotspot,
  call: Call,
} as const;

export type EcosystemIconName = keyof typeof ECOSYSTEM_ARTWORK;
