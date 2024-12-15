"use client";

import { useDocumentStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import welcomeData from "@/data/welcome.json";

export function DocumentMenu() {
  const activeDocument = useDocumentStore((state) => state.activeDocument);
  const createDocument = useDocumentStore((state) => state.createDocument);

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => createDocument(welcomeData.title, welcomeData.content)}
        className="text-white"
      >
        <FileText className="mr-2 h-4 w-4" />
        {activeDocument?.title || "New Document"}
      </Button>
    </div>
  );
} 