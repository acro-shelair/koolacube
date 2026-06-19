"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";

// A tiny, dependency-free Popover that mirrors the slice of the Radix API the
// content-block editors use: <Popover open onOpenChange>, <PopoverTrigger asChild>,
// <PopoverContent className align>.

type Ctx = {
  open: boolean;
  setOpen: (o: boolean) => void;
};
const PopoverCtx = createContext<Ctx | null>(null);

export function Popover({
  open: controlledOpen,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  children: ReactNode;
}) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const open = controlledOpen ?? uncontrolled;
  const setOpen = (o: boolean) => {
    setUncontrolled(o);
    onOpenChange?.(o);
  };
  return (
    <PopoverCtx.Provider value={{ open, setOpen }}>
      <div className="relative inline-block w-full">{children}</div>
    </PopoverCtx.Provider>
  );
}

export function PopoverTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
}) {
  const ctx = useContext(PopoverCtx)!;
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    ctx.setOpen(!ctx.open);
  };
  if (asChild && isValidElement(children)) {
    return cloneElement(children, { onClick: toggle });
  }
  return (
    <button type="button" onClick={toggle}>
      {children}
    </button>
  );
}

export function PopoverContent({
  children,
  className = "",
  align = "start",
}: {
  children: ReactNode;
  className?: string;
  align?: "start" | "end";
}) {
  const ctx = useContext(PopoverCtx)!;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctx.open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) ctx.setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [ctx, ctx.open]);

  if (!ctx.open) return null;
  return (
    <div
      ref={ref}
      className={`absolute top-full z-50 mt-1 rounded-md border border-border bg-card shadow-xl ${
        align === "end" ? "right-0" : "left-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
