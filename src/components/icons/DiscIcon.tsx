import type { SVGProps } from "react";

export function DiscIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M12 .25a11.75 11.75 0 1 0 0 23.5 11.75 11.75 0 1 0 0-23.5ZM12 7.9a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 1 0 0-8.2Zm0 1.6a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5Zm0 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3ZM14.36 7.65 17.3 2.25l4.45 4.45-5.4 2.94Zm-4.72 8.7L6.7 21.75 2.25 17.3l5.4-2.94Z"
      />
    </svg>
  );
}
