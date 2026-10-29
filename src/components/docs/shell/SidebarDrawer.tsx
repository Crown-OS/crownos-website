"use client";

import { type MouseEvent, type ReactNode, useRef } from "react";

type SidebarDrawerProps = {
  menuIcon: ReactNode;
  closeIcon: ReactNode;
  children: ReactNode;
};

export function SidebarDrawer({
  menuIcon,
  closeIcon,
  children,
}: SidebarDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  const closeOnNavigate = (event: MouseEvent<HTMLDialogElement>) => {
    const target = event.target as Element;
    if (target === event.currentTarget || target.closest("a")) close();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => dialogRef.current?.showModal()}
        className="grid size-9 place-items-center rounded-control text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground lg:hidden"
      >
        {menuIcon}
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Documentation navigation"
        data-lenis-prevent
        onClick={closeOnNavigate}
        onKeyDown={(event) => event.key === "Escape" && close()}
        className="m-0 h-dvh max-h-none w-[min(20rem,85vw)] max-w-none -translate-x-full overflow-y-auto border-border border-r bg-background p-0 text-foreground transition-[translate,display,overlay] transition-discrete duration-500 ease-out-expo backdrop:bg-black/70 open:translate-x-0 starting:open:-translate-x-full"
      >
        <div className="flex justify-end p-3">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={close}
            className="grid size-9 place-items-center rounded-control text-muted hover:text-foreground"
          >
            {closeIcon}
          </button>
        </div>
        <div className="px-5 pb-10">{children}</div>
      </dialog>
    </>
  );
}
