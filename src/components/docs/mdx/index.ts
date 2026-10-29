import type { MDXComponents } from "mdx/types";
import { Accordion, AccordionGroup, Expandable } from "./Accordion";
import { ApiExamples, RequestExample, ResponseExample } from "./ApiExamples";
import { Badge, Kbd } from "./Badge";
import { Check, Danger, Info, Note, Tip, Warning } from "./Callout";
import { Card, CardGroup } from "./Card";
import { CodeFigure } from "./CodeBlock";
import { CodeGroup } from "./CodeGroup";
import { ParamField, ResponseField } from "./Field";
import { Frame } from "./Frame";
import { proseComponents } from "./Prose";
import { Step, Steps } from "./Steps";
import { Tab, Tabs } from "./Tabs";
import { Update } from "./Update";

export const docsMdxComponents: MDXComponents = {
  ...proseComponents,
  figure: CodeFigure,
  Accordion,
  AccordionGroup,
  ApiExamples,
  Badge,
  Card,
  CardGroup,
  Check,
  CodeGroup,
  Danger,
  Expandable,
  Frame,
  Info,
  Kbd,
  Note,
  ParamField,
  RequestExample,
  ResponseExample,
  ResponseField,
  Step,
  Steps,
  Tab,
  Tabs,
  Tip,
  Update,
  Warning,
};
