"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SplitViewProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export function SplitView({ left, right, className }: SplitViewProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);
  const splitPaneRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !splitPaneRef.current) return;

      const paneWidth = splitPaneRef.current.clientWidth;
      const position = (e.clientX / paneWidth) * 100;
      console.log("paneWidth", paneWidth);
      console.log("position", e.clientX);

      // Limit the resize between 30% and 70%
      const limitedPosition = Math.min(Math.max(position, 30), 70);
      setSplitPosition(limitedPosition);
    },
    [isResizing]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  return (
    <div
      ref={splitPaneRef}
      className={cn("flex h-full overflow-hidden", className)}
    >
      <div
        className="h-screen min-h-0 overflow-y-auto"
        style={{ width: `${splitPosition}%` }}
      >
        {left}
      </div>
      <div
        className="relative cursor-col-resize select-none"
        onMouseDown={startResizing}
      >
        <div className="absolute inset-y-0 -left-1 w-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors" />
        {/* The line that is used to resize the split view */}
        <div className="absolute inset-y-0 left-[-1px] w-[2px] bg-zinc-200 dark:bg-zinc-800" />
        {/* The hovered that is used to resize the split view */}
      </div>
      <div
        style={{ width: `${100 - splitPosition}%` }}
        className="h-screen min-h-0 overflow-y-auto"
      >
        {right}
      </div>
    </div>
  );
}
