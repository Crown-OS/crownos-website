import type { ReactNode } from "react";
import { settingsWindow } from "@/data/settings-window";
import { Select, Slider, Toggle } from "./controls";
import { Gallery } from "./Gallery";
import { LucideIcon } from "./icons";
import { SettingsText } from "./text";
import { CARD, FONT_SIZE, PANE, ROW, SETTINGS_COLOR } from "./theme";

const HEADER = { top: 44, chip: 34, chipRadius: 10, iconSize: 18, gap: 12 };
const HEADING = { inset: 4, baseline: 12, cardOffset: 23 };
const THEME_SECTION_TOP = 102;
const DESKTOP_SECTION_TOP = 330;
const SELECT_WIDTH = 252;
const SLIDER_LEFT = 545;
const CHIP_TINT_OPACITY = 0.14;
const { theme, wallpapers, selectedWallpaper } = settingsWindow;

function PageHeader() {
  const chipX = CARD.x;
  const iconOffset = (HEADER.chip - HEADER.iconSize) / 2;
  return (
    <g>
      <rect
        x={chipX}
        y={HEADER.top}
        width={HEADER.chip}
        height={HEADER.chip}
        rx={HEADER.chipRadius}
        fill={SETTINGS_COLOR.accentEnd}
        fillOpacity={CHIP_TINT_OPACITY}
      />
      <LucideIcon
        name={settingsWindow.page.icon}
        x={chipX + iconOffset}
        y={HEADER.top + iconOffset}
        size={HEADER.iconSize}
        stroke={2}
        color={SETTINGS_COLOR.accentEnd}
      />
      <SettingsText
        x={chipX + HEADER.chip + HEADER.gap}
        y={69}
        size={FONT_SIZE.title}
        weight="bold"
        color={SETTINGS_COLOR.primary}
      >
        {settingsWindow.page.title}
      </SettingsText>
    </g>
  );
}

function Section({
  title,
  top,
  height,
  dividers,
  children,
}: {
  title: string;
  top: number;
  height: number;
  dividers: number[];
  children: ReactNode;
}) {
  const cardTop = top + HEADING.cardOffset;
  return (
    <g>
      <SettingsText
        x={CARD.x + HEADING.inset}
        y={top + HEADING.baseline}
        size={FONT_SIZE.caption}
        weight="semibold"
        color={SETTINGS_COLOR.muted}
      >
        {title.toUpperCase()}
      </SettingsText>
      <rect
        x={CARD.x + 0.5}
        y={cardTop + 0.5}
        width={CARD.width - 1}
        height={height - 1}
        rx={CARD.radius - 0.5}
        fill={SETTINGS_COLOR.raised}
        stroke={SETTINGS_COLOR.border}
      />
      {dividers.map((y) => (
        <rect
          key={y}
          x={CARD.x + 1}
          y={y}
          width={CARD.width - 2}
          height={1}
          fill={SETTINGS_COLOR.border}
        />
      ))}
      {children}
    </g>
  );
}

function RowTitle({
  baseline,
  title,
  description,
}: {
  baseline: number;
  title: string;
  description?: string;
}) {
  return (
    <g>
      <SettingsText x={ROW.textX} y={baseline}>
        {title}
      </SettingsText>
      {description && (
        <SettingsText
          x={ROW.textX}
          y={baseline + 18}
          size={FONT_SIZE.caption}
          color={SETTINGS_COLOR.muted}
        >
          {description}
        </SettingsText>
      )}
    </g>
  );
}

function ThemeCard() {
  return (
    <Section
      title="Theme"
      top={THEME_SECTION_TOP}
      height={181}
      dividers={[178, 241]}
    >
      <RowTitle baseline={158} title="Dark mode" />
      <Toggle right={ROW.controlRight} centerY={152} on={theme.darkMode} />
      <RowTitle baseline={216} title="Accent color" />
      <Select
        right={ROW.controlRight}
        y={193}
        width={SELECT_WIDTH}
        value={theme.accent}
      />
      <RowTitle
        baseline={270}
        title="Transparency"
        description="Translucency of panels and menus"
      />
      <Slider
        x={SLIDER_LEFT}
        top={256}
        right={ROW.controlRight}
        value={theme.transparency}
      />
    </Section>
  );
}

function DesktopCard() {
  return (
    <Section
      title="Desktop"
      top={DESKTOP_SECTION_TOP}
      height={PANE.height}
      dividers={[401]}
    >
      <RowTitle baseline={383} title="Wallpaper" />
      <SettingsText
        x={ROW.controlRight}
        y={384}
        size={FONT_SIZE.value}
        color={SETTINGS_COLOR.muted}
        anchor="end"
      >
        {wallpapers[selectedWallpaper].name}
      </SettingsText>
      <Gallery top={416} />
    </Section>
  );
}

export function AppearancePage() {
  return (
    <g>
      <PageHeader />
      <ThemeCard />
      <DesktopCard />
    </g>
  );
}
