import { useId } from "react";

const TILE =
  "M512 52C572.6 52 653.8 52.3 693.7 52.9C733.5 53.5 734.8 54.4 751.3 55.6C767.7 56.7 780.1 58.2 792.5 60C804.8 61.8 815.2 63.9 825.3 66.3C835.3 68.8 844.1 71.5 852.5 74.5C860.9 77.6 868.5 81 875.6 84.7C882.8 88.5 889.3 92.5 895.4 97C901.6 101.5 907.2 106.3 912.5 111.5C917.7 116.8 922.5 122.4 927 128.6C931.5 134.7 935.5 141.2 939.3 148.4C943 155.5 946.4 163.1 949.5 171.5C952.5 179.9 955.2 188.7 957.7 198.7C960.1 208.8 962.2 219.2 964 231.5C965.8 243.9 967.3 256.3 968.4 272.7C969.6 289.2 970.5 290.5 971.1 330.3C971.7 370.2 972 451.4 972 512C972 572.6 971.7 653.8 971.1 693.7C970.5 733.5 969.6 734.8 968.4 751.3C967.3 767.7 965.8 780.1 964 792.5C962.2 804.8 960.1 815.2 957.7 825.3C955.2 835.3 952.5 844.1 949.5 852.5C946.4 860.9 943 868.5 939.3 875.6C935.5 882.8 931.5 889.3 927 895.4C922.5 901.6 917.7 907.2 912.5 912.5C907.2 917.7 901.6 922.5 895.4 927C889.3 931.5 882.8 935.5 875.6 939.3C868.5 943 860.9 946.4 852.5 949.5C844.1 952.5 835.3 955.2 825.3 957.7C815.2 960.1 804.8 962.2 792.5 964C780.1 965.8 767.7 967.3 751.3 968.4C734.8 969.6 733.5 970.5 693.7 971.1C653.8 971.7 572.6 972 512 972C451.4 972 370.2 971.7 330.3 971.1C290.5 970.5 289.2 969.6 272.7 968.4C256.3 967.3 243.9 965.8 231.5 964C219.2 962.2 208.8 960.1 198.7 957.7C188.7 955.2 179.9 952.5 171.5 949.5C163.1 946.4 155.5 943 148.4 939.3C141.2 935.5 134.7 931.5 128.6 927C122.4 922.5 116.8 917.7 111.5 912.5C106.3 907.2 101.5 901.6 97 895.4C92.5 889.3 88.5 882.8 84.7 875.6C81 868.5 77.6 860.9 74.5 852.5C71.5 844.1 68.8 835.3 66.3 825.3C63.9 815.2 61.8 804.8 60 792.5C58.2 780.1 56.7 767.7 55.6 751.3C54.4 734.8 53.5 733.5 52.9 693.7C52.3 653.8 52 572.6 52 512C52 451.4 52.3 370.2 52.9 330.3C53.5 290.5 54.4 289.2 55.6 272.7C56.7 256.3 58.2 243.9 60 231.5C61.8 219.2 63.9 208.8 66.3 198.7C68.8 188.7 71.5 179.9 74.5 171.5C77.6 163.1 81 155.5 84.7 148.4C88.5 141.2 92.5 134.7 97 128.6C101.5 122.4 106.3 116.8 111.5 111.5C116.8 106.3 122.4 101.5 128.6 97C134.7 92.5 141.2 88.5 148.4 84.7C155.5 81 163.1 77.6 171.5 74.5C179.9 71.5 188.7 68.8 198.7 66.3C208.8 63.9 219.2 61.8 231.5 60C243.9 58.2 256.3 56.7 272.7 55.6C289.2 54.4 290.5 53.5 330.3 52.9C370.2 52.3 451.4 52 512 52Z";
const POCKET = "M0 394H416C496 394 528 522 616 522H1024V1024H0Z";

const accentMix = (white: number) =>
  `color-mix(in srgb, var(--cu-accent-start), #fff ${white}%)`;
const accentDepth = (end: number) =>
  `color-mix(in srgb, var(--cu-accent-start), var(--cu-accent-end) ${end}%)`;

const BACK_STOPS = [
  [0, accentMix(8)],
  [1, accentDepth(45)],
] as const;
const POCKET_STOPS = [
  [0, accentMix(30)],
  [0.4, "var(--cu-accent-start)"],
  [1, accentDepth(80)],
] as const;
const FROST_STOPS = [
  [0, 0.4],
  [0.48, 0.21],
  [1, 0],
] as const;

export function FilesAppIcon({ size }: { size: number }) {
  const id = useId();
  const ref = (name: string) => `url(#${id}${name})`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <clipPath id={`${id}tile`}>
          <path d={TILE} />
        </clipPath>
        <clipPath id={`${id}pocket`}>
          <path d={POCKET} />
        </clipPath>
        <linearGradient
          id={`${id}back`}
          x1="0"
          y1="52"
          x2="0"
          y2="522"
          gradientUnits="userSpaceOnUse"
        >
          {BACK_STOPS.map(([offset, color]) => (
            <stop key={offset} offset={offset} style={{ stopColor: color }} />
          ))}
        </linearGradient>
        <linearGradient
          id={`${id}front`}
          x1="0"
          y1="394"
          x2="0"
          y2="972"
          gradientUnits="userSpaceOnUse"
        >
          {POCKET_STOPS.map(([offset, color]) => (
            <stop key={offset} offset={offset} style={{ stopColor: color }} />
          ))}
        </linearGradient>
        <linearGradient
          id={`${id}frost`}
          x1="0"
          y1="394"
          x2="0"
          y2="820"
          gradientUnits="userSpaceOnUse"
        >
          {FROST_STOPS.map(([offset, opacity]) => (
            <stop
              key={offset}
              offset={offset}
              stopColor="#fff"
              stopOpacity={opacity}
            />
          ))}
        </linearGradient>
        <filter id={`${id}blur`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <g clipPath={ref("tile")}>
        <rect width="1024" height="1024" fill={ref("back")} />
        <rect
          x="222"
          y="190"
          width="580"
          height="400"
          rx="52"
          fill="#fff"
          fillOpacity="0.45"
        />
        <rect x="182" y="246" width="660" height="460" rx="64" fill="#fff" />
        <path d={POCKET} fill={ref("front")} />
        <g clipPath={ref("pocket")}>
          <rect
            x="182"
            y="300"
            width="660"
            height="560"
            fill={ref("frost")}
            filter={ref("blur")}
          />
        </g>
      </g>
    </svg>
  );
}
