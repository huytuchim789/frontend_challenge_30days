"use client";

import { useDocumentStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useCallback, useRef, KeyboardEvent, useState } from "react";
import { Toolbar } from "./toolbar";

const PLACEHOLDER = [
  "# Start Writing...",
  "",
  "Keyboard shortcuts:",
  "- Ctrl/Cmd + B: Bold",
  "- Ctrl/Cmd + I: Italic",
  "- Ctrl/Cmd + K: Link",
  "- Ctrl/Cmd + 1,2,3: Headings",
  "- Ctrl/Cmd + -: Bullet List",
  "- Ctrl/Cmd + .: Numbered List",
  "- Ctrl/Cmd + `: Code Block",
  "",
  "Or use the toolbar above to format your text."
].join("\n");

interface MarkdownEditorProps {
  content: string;
  className?: string;
}

interface EmojiData {
  native: string;
}

export function MarkdownEditor({ content, className }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updateDocument = useDocumentStore((state) => state.updateDocument);
  const activeDocument = useDocumentStore((state) => state.activeDocument);

  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (activeDocument) {
        const newContent = e.target.value;
        updateDocument(activeDocument.id, { content: newContent });
        setUndoStack(prev => [...prev, content]);
        setRedoStack([]);
      }
    },
    [activeDocument, updateDocument, content]
  );



  const insertMarkdown = useCallback((prefix: string, suffix: string, placeholder: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = selected || placeholder;
    const newValue = text.substring(0, start) + prefix + replacement + suffix + text.substring(end);
    
    textarea.value = newValue;
    textarea.selectionStart = start + prefix.length;
    textarea.selectionEnd = start + prefix.length + replacement.length;
    handleChange({ target: textarea } as React.ChangeEvent<HTMLTextAreaElement>);
    textarea.focus();
  }, [handleChange]);

  const insertAtLineStart = useCallback((prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    const newValue = text.substring(0, lineStart) + prefix + text.substring(lineStart);
    
    textarea.value = newValue;
    textarea.selectionStart = textarea.selectionEnd = start + prefix.length;
    handleChange({ target: textarea } as React.ChangeEvent<HTMLTextAreaElement>);
  }, [handleChange]);

  const handleToolbarAction = useCallback((action: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const actionMap: Record<string, () => void> = {
      bold: () => insertMarkdown('**', '**', 'bold text'),
      italic: () => insertMarkdown('*', '*', 'italic text'),
      strikethrough: () => insertMarkdown('~~', '~~', 'strikethrough text'),
      h1: () => insertAtLineStart('# '),
      h2: () => insertAtLineStart('## '),
      h3: () => insertAtLineStart('### '),
      code: () => insertMarkdown('```\n', '\n```', 'code'),
      quote: () => insertAtLineStart('> '),
      ul: () => insertAtLineStart('- '),
      ol: () => insertAtLineStart('1. '),
      table: () => insertMarkdown('| Header | Title |\n| ----------- | ----------- |\n| Paragraph | Text |\n', '', ''),
      hr: () => insertMarkdown('---\n', '', ''),
      image: () => insertMarkdown('![alt text](', ')', 'image.jpg'),
      link: () => insertMarkdown('[', '](url)', 'link text'),
      left: () => {
        const start = textarea.selectionStart;
        const text = textarea.value;
        const lineStart = text.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = text.indexOf('\n', start);
        const currentLine = text.substring(lineStart, lineEnd === -1 ? text.length : lineEnd);
        
        if (currentLine.startsWith('<div class="text-')) {
          const newValue = text.substring(0, lineStart) + currentLine.replace(/<div class="text-.*?">(.*?)<\/div>/, '$1') + text.substring(lineEnd === -1 ? text.length : lineEnd);
          textarea.value = newValue;
        } else {
          const newValue = text.substring(0, lineStart) + '<div class="text-left">' + currentLine + '</div>' + text.substring(lineEnd === -1 ? text.length : lineEnd);
          textarea.value = newValue;
        }
        handleChange({ target: textarea } as React.ChangeEvent<HTMLTextAreaElement>);
      },
      center: () => {
        const start = textarea.selectionStart;
        const text = textarea.value;
        const lineStart = text.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = text.indexOf('\n', start);
        const currentLine = text.substring(lineStart, lineEnd === -1 ? text.length : lineEnd);
        
        if (currentLine.startsWith('<div class="text-')) {
          const newValue = text.substring(0, lineStart) + currentLine.replace(/<div class="text-.*?">(.*?)<\/div>/, '$1') + text.substring(lineEnd === -1 ? text.length : lineEnd);
          textarea.value = newValue;
        } else {
          const newValue = text.substring(0, lineStart) + '<div class="text-center">' + currentLine + '</div>' + text.substring(lineEnd === -1 ? text.length : lineEnd);
          textarea.value = newValue;
        }
        handleChange({ target: textarea } as React.ChangeEvent<HTMLTextAreaElement>);
      },
      right: () => {
        const start = textarea.selectionStart;
        const text = textarea.value;
        const lineStart = text.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = text.indexOf('\n', start);
        const currentLine = text.substring(lineStart, lineEnd === -1 ? text.length : lineEnd);
        
        if (currentLine.startsWith('<div class="text-')) {
          const newValue = text.substring(0, lineStart) + currentLine.replace(/<div class="text-.*?">(.*?)<\/div>/, '$1') + text.substring(lineEnd === -1 ? text.length : lineEnd);
          textarea.value = newValue;
        } else {
          const newValue = text.substring(0, lineStart) + '<div class="text-right">' + currentLine + '</div>' + text.substring(lineEnd === -1 ? text.length : lineEnd);
          textarea.value = newValue;
        }
        handleChange({ target: textarea } as React.ChangeEvent<HTMLTextAreaElement>);
      },
    };

    if (actionMap[action]) {
      actionMap[action]();
    }
  }, [insertMarkdown, insertAtLineStart, handleChange]);

  const handleUndo = useCallback(() => {
    if (undoStack.length > 0) {
      const previousContent = undoStack[undoStack.length - 1];
      const newUndoStack = undoStack.slice(0, -1);
      setUndoStack(newUndoStack);
      setRedoStack(prev => [...prev, content]);
      if (activeDocument) {
        updateDocument(activeDocument.id, { content: previousContent });
      }
    }
  }, [undoStack, content, activeDocument, updateDocument]);

  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextContent = redoStack[redoStack.length - 1];
      const newRedoStack = redoStack.slice(0, -1);
      setRedoStack(newRedoStack);
      setUndoStack(prev => [...prev, content]);
      if (activeDocument) {
        updateDocument(activeDocument.id, { content: nextContent });
      }
    }
  }, [redoStack, content, activeDocument, updateDocument]);

  const handleEmojiSelect = useCallback((emoji: EmojiData) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const newValue = text.substring(0, start) + emoji.native + text.substring(end);
    
    textarea.value = newValue;
    textarea.selectionStart = textarea.selectionEnd = start + emoji.native.length;
    handleChange({ target: textarea } as React.ChangeEvent<HTMLTextAreaElement>);
  }, [handleChange]);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      const textarea = e.currentTarget;
      const { selectionStart, selectionEnd, value } = textarea;

      // Handle Cmd+Z (Undo) and Cmd+Shift+Z (Redo)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
        return;
      }

      // Handle Cmd+A (Select All)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "a") {
        e.preventDefault();
        textarea.selectionStart = 0;
        textarea.selectionEnd = value.length;
        return;
      }

      // Handle Cmd+Delete (Delete to end of line)
      if (
        (e.metaKey || e.ctrlKey) &&
        (e.key === "Delete" || e.key === "Backspace")
      ) {
        e.preventDefault();
        const lineEnd = value.indexOf("\n", selectionStart);
        const newValue =
          value.substring(0, selectionStart) +
          value.substring(lineEnd === -1 ? value.length : lineEnd);
        textarea.value = newValue;
        handleChange({
          target: textarea,
        } as React.ChangeEvent<HTMLTextAreaElement>);
        return;
      }

      // Tab key - insert 2 spaces
      if (e.key === "Tab") {
        e.preventDefault();
        const newValue =
          value.substring(0, selectionStart) +
          "  " +
          value.substring(selectionEnd);
        textarea.value = newValue;
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
        handleChange({
          target: textarea,
        } as React.ChangeEvent<HTMLTextAreaElement>);
      }

      // Auto-close brackets and quotes
      const pairs: Record<string, string> = {
        "(": ")",
        "[": "]",
        "{": "}",
        '"': '"',
        "'": "'",
        "`": "`",
      };

      if (pairs[e.key] && selectionStart === selectionEnd) {
        e.preventDefault();
        const newValue =
          value.substring(0, selectionStart) +
          e.key +
          pairs[e.key] +
          value.substring(selectionEnd);
        textarea.value = newValue;
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
        handleChange({
          target: textarea,
        } as React.ChangeEvent<HTMLTextAreaElement>);
      }

      // Keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        const shortcuts: Record<string, () => void> = {
          b: () => insertMarkdown("**", "**", "bold text"),
          i: () => insertMarkdown("*", "*", "italic text"),
          k: () => insertMarkdown("[", "](url)", "link text"),
          "1": () => insertAtLineStart("# "),
          "2": () => insertAtLineStart("## "),
          "3": () => insertAtLineStart("### "),
          "-": () => insertAtLineStart("- "),
          ".": () => insertAtLineStart("1. "),
          "`": () => insertMarkdown("```\n", "\n```", "code"),
        };

        if (shortcuts[e.key.toLowerCase()]) {
          e.preventDefault();
          shortcuts[e.key.toLowerCase()]();
        }
      }
    },
    [handleChange, handleUndo, handleRedo]
  );
  return (
    <div className={cn("flex h-full flex-col overflow-hidden", className)}>
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
        <span className="text-sm font-medium text-zinc-400">MARKDOWN</span>
      </div>
      <Toolbar 
        onAction={handleToolbarAction}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onEmojiSelect={handleEmojiSelect}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
        className="shrink-0"
      />
      <div className="relative flex-1 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm outline-none"
          placeholder={PLACEHOLDER}
          spellCheck={false}
        />
      </div>
    </div>
  );
}

