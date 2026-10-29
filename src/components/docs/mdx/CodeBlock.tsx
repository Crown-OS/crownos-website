import {
  Children,
  type ComponentProps,
  isValidElement,
  type ReactNode,
} from "react";
import { textOf } from "@/util/react-text";
import { DocIcon } from "../DocIcon";
import { CopyCodeButton } from "./CopyCodeButton";

const TITLE_ATTRIBUTE = "data-rehype-pretty-code-title";
const LANGUAGE_ATTRIBUTE = "data-language";

type CodeElementProps = { children?: ReactNode; [attribute: string]: unknown };

const elementProps = (node: ReactNode) =>
  isValidElement<CodeElementProps>(node) ? node.props : undefined;

export function codeLabel(block: ReactNode) {
  const parts = Children.toArray(elementProps(block)?.children).map(
    elementProps,
  );
  const caption = parts.find((props) => props && TITLE_ATTRIBUTE in props);
  if (caption) return textOf(caption.children);
  const language = parts.find((props) => props?.[LANGUAGE_ATTRIBUTE])?.[
    LANGUAGE_ATTRIBUTE
  ];
  return typeof language === "string" ? language : "Code";
}

export function CodeFigure({ children, ...props }: ComponentProps<"figure">) {
  if (!("data-rehype-pretty-code-figure" in props)) {
    return <figure {...props}>{children}</figure>;
  }
  return (
    <figure className="docs-code" {...props}>
      {children}
      <CopyCodeButton
        copyIcon={<DocIcon name="copy" className="size-4" />}
        copiedIcon={<DocIcon name="check" className="size-4" />}
      />
    </figure>
  );
}
