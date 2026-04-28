import type { ComponentType, SVGProps } from "react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type EcosystemFeature = {
  name: string;
  description: string;
  icon: IconComponent;
};

export type Principle = {
  title: string;
  description: string;
  icon: IconComponent;
};

export type Metric = {
  value: string;
  label: string;
};
