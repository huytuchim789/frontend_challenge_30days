"use client";

import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Quote,
  List,
  ListOrdered,
  Table,
  Minus,
  Image,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Smile
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useTheme } from "next-themes";

interface ToolbarProps {
  onAction: (action: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onEmojiSelect: (emoji: EmojiData) => void;
  canUndo: boolean;
  canRedo: boolean;
  className?: string;
}

interface EmojiData {
  native: string;
}

type Tool = {
  icon: typeof Bold;
  action: string;
  tooltip: string;
  separator?: never;
} | {
  separator: true;
  icon?: never;
  action?: never;
  tooltip?: never;
};

export function Toolbar({ 
  onAction, 
  onUndo, 
  onRedo, 
  onEmojiSelect, 
  canUndo, 
  canRedo, 
  className 
}: ToolbarProps) {
  const { theme } = useTheme();
  const tools: Tool[] = [
    { icon: Bold, action: "bold", tooltip: "Bold (Ctrl+B)" },
    { icon: Italic, action: "italic", tooltip: "Italic (Ctrl+I)" },
    { icon: Strikethrough, action: "strikethrough", tooltip: "Strikethrough" },
    { icon: Heading1, action: "h1", tooltip: "Heading 1 (Ctrl+1)" },
    { icon: Heading2, action: "h2", tooltip: "Heading 2 (Ctrl+2)" },
    { icon: Heading3, action: "h3", tooltip: "Heading 3 (Ctrl+3)" },
    { icon: Code, action: "code", tooltip: "Code (Ctrl+`)" },
    { icon: Quote, action: "quote", tooltip: "Quote" },
    { icon: List, action: "ul", tooltip: "Bullet List (Ctrl+-)" },
    { icon: ListOrdered, action: "ol", tooltip: "Numbered List (Ctrl+.)" },
    { icon: Table, action: "table", tooltip: "Table" },
    { icon: Minus, action: "hr", tooltip: "Horizontal Rule" },
    { icon: Image, action: "image", tooltip: "Image" },
    { icon: Link, action: "link", tooltip: "Link (Ctrl+K)" },
    { icon: AlignLeft, action: "left", tooltip: "Align Left" },
    { icon: AlignCenter, action: "center", tooltip: "Align Center" },
    { icon: AlignRight, action: "right", tooltip: "Align Right" },
  ];

  return (
    <div className={cn("flex items-center gap-1 border-b border-zinc-200 p-2 dark:border-zinc-800 shrink-0", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onUndo}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onRedo}
        disabled={!canRedo}
        title="Redo (Ctrl+Shift+Z)"
      >
        <Redo className="h-4 w-4" />
      </Button>
      <div className="mx-1 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
      {tools.map((tool, index) => 
        tool.separator ? (
          <div key={index} className="mx-1 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
        ) : (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onAction(tool.action)}
            title={tool.tooltip}
          >
            {tool.icon && <tool.icon className="h-4 w-4" />}
          </Button>
        )
      )}
      <div className="mx-1 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Smile className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Picker
            data={data}
            onEmojiSelect={onEmojiSelect}
            theme={theme === "dark" ? "dark" : "light"}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
} 