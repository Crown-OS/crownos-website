export const INSTALLED_PLUGINS = {
  label: "The Plugins card of CrownOS Settings listing every installed plugin",
  stage: { width: 520, headingHeight: 15, headingGap: 8, rowHeight: 63 },
  disabled: ["media-deck", "screen-studio"],
} as const satisfies {
  label: string;
  stage: {
    width: number;
    headingHeight: number;
    headingGap: number;
    rowHeight: number;
  };
  disabled: readonly string[];
};
