"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserWindow } from "./BrowserWindow";
import { SettingsWindow } from "./SettingsWindow";
import { TerminalWindow } from "./TerminalWindow";

export function AgentDesktop() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting),
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      data-running={isOnScreen || undefined}
      className="agent-stage relative aspect-[520/756] text-left md:aspect-[1200/440]"
    >
      <BrowserWindow />
      <TerminalWindow />
      <SettingsWindow />
    </div>
  );
}
