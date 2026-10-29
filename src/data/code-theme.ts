const tone = (scope: string[], foreground: string, fontStyle = "") => ({
  scope,
  settings: { foreground, fontStyle },
});

export const codeTheme = {
  name: "crownos-mono",
  type: "dark",
  colors: {
    "editor.background": "#0a0a0a",
    "editor.foreground": "#c8c8c8",
  },
  tokenColors: [
    tone(["comment", "punctuation.definition.comment"], "#5f5f5f", "italic"),
    tone(["keyword", "storage", "storage.type", "storage.modifier"], "#ffffff"),
    tone(["string", "string.quoted", "markup.inline.raw"], "#8f8f8f"),
    tone(
      ["constant.numeric", "constant.language", "constant.character"],
      "#e6e6e6",
    ),
    tone(
      ["entity.name.function", "support.function", "meta.function-call"],
      "#f5f5f5",
    ),
    tone(
      ["entity.name.type", "support.type", "entity.name.class"],
      "#d9d9d9",
      "italic",
    ),
    tone(
      [
        "variable.other.property",
        "meta.object-literal.key",
        "support.type.property-name",
      ],
      "#b5b5b5",
    ),
    tone(["entity.name.tag", "entity.other.attribute-name"], "#d0d0d0"),
    tone(["punctuation", "keyword.operator", "meta.brace"], "#767676"),
    tone(["variable.parameter", "variable.language"], "#dcdcdc", "italic"),
  ],
};
