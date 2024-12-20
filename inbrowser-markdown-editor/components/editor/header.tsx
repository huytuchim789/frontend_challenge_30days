import React from "react";
import { Button } from "../ui/button";
import { useDocumentStore } from "@/lib/store";
import { Menu, Save } from "lucide-react";
import { DocumentMenu } from "./document-menu";
import { ThemeToggle } from "../theme-toggle";

export default function Header() {
  const activeDocument = useDocumentStore((state) => state.activeDocument);

  const handleSave = () => {
    if (activeDocument?.content) {
      const blob = new Blob([activeDocument.content], {
        type: "text/markdown",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = activeDocument.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <header className="sticky top-0 left-0 z-10 flex items-center justify-between bg-zinc-900 px-4 py-2">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="h-6 w-px bg-zinc-700" />
        <DocumentMenu />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          className="text-white"
        >
          <Save className="h-5 w-5" />
          Save Changes
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
