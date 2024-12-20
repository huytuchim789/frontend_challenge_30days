"use client";

import { useDocumentStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { FileText, Plus, FileCode } from "lucide-react";
import welcomeData from "@/data/welcome.json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Document } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function DocumentMenu() {
  const activeDocument = useDocumentStore((state) => state.activeDocument);
  const createDocument = useDocumentStore((state) => state.createDocument);
  const setActiveDocument = useDocumentStore(
    (state) => state.setActiveDocument
  );
  const [title, setTitle] = useState("untitled.md");
  const createFromTemplate = () => {
    const newDoc: Document = {
      id: crypto.randomUUID(),
      title: "welcome.md",
      content: welcomeData.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    createDocument(newDoc.title, newDoc.content);
    setActiveDocument(newDoc);
  };

  const createNewDocument = () => {
    const newDoc: Document = {
      id: crypto.randomUUID(),
      title: title,
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    createDocument(newDoc.title, newDoc.content);
    setActiveDocument(newDoc);
  };

 
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-white">
            <FileText className="mr-2 h-4 w-4" />
            Menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <div className="p-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document name"
              className="h-8"
            />
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={createNewDocument}>
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </DropdownMenuItem>
          <DropdownMenuItem onClick={createFromTemplate}>
            <FileCode className="mr-2 h-4 w-4" />
            New from Template
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {activeDocument && (
        <span className="text-sm text-zinc-400">{activeDocument.title}</span>
      )}
    </div>
  );
}
