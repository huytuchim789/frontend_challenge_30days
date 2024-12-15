"use client";

import React from "react";
import { SplitView } from "./split-view";
import Header from "./header";
import Preview from "./preview";
import MarkdownEditor from "./markdown-editor";
import { useDocumentStore } from "@/lib/store";

export default function Editor() {
  const activeDocument = useDocumentStore((state) => state.activeDocument);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1">
        <SplitView
          left={<MarkdownEditor content={activeDocument?.content} />}
          right={<Preview content={activeDocument?.content} />}
        />
      </div>
    </div>
  );
}
