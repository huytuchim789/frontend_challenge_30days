"use client";

import { useDocumentStore } from "@/lib/store";
import { Header } from "./header";
import { MarkdownEditor } from "./markdown-editor";
import { Preview } from "./preview";
import { SplitView } from "./split-view";

export function Editor() {
  const activeDocument = useDocumentStore((state) => state.activeDocument);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1">
        <SplitView
          left={
            <MarkdownEditor
              content={activeDocument?.content || ""}
            />
          }
          right={
            <Preview
              content={activeDocument?.content || ""}
            />
          }
        />
      </div>
    </div>
  );
} 