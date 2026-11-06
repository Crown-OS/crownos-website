import { type CSSProperties, Fragment } from "react";
import { INSTALLED_PLUGINS } from "@/data/installed-plugins";
import { loadPlugins } from "@/util/catalog";
import { PluginRow } from "./PluginRow";

const { label, stage, disabled } = INSTALLED_PLUGINS;
const DISABLED = new Set<string>(disabled);

const stageHeight = (rows: number) =>
  stage.headingHeight +
  stage.headingGap +
  rows * stage.rowHeight +
  Math.max(rows - 1, 0);

export async function InstalledPlugins() {
  const plugins = await loadPlugins();
  const height = stageHeight(plugins.length);
  return (
    <div
      role="img"
      aria-label={label}
      className="plugin-stage"
      style={
        {
          aspectRatio: `${stage.width} / ${height}`,
          "--stage-width": `${stage.width}px`,
        } as CSSProperties
      }
    >
      <section
        aria-hidden="true"
        className="crownui plugin-stage-content flex flex-col"
        style={{ width: stage.width, gap: stage.headingGap }}
      >
        <h4
          className="px-1 font-semibold text-(--cu-muted) text-[12px] uppercase"
          style={{ lineHeight: `${stage.headingHeight}px` }}
        >
          Plugins
        </h4>
        <div className="crownui-card flex flex-col">
          {plugins.map(({ meta }, index) => (
            <Fragment key={meta.slug}>
              {index > 0 && <hr className="h-px border-0 bg-(--cu-border)" />}
              <PluginRow
                name={meta.name}
                version={meta.version}
                author={meta.author}
                enabled={!DISABLED.has(meta.slug)}
                height={stage.rowHeight}
              />
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
