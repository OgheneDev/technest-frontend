"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "../ui/button";

interface ViewToggleProps {
  layout: "grid" | "list";
  onLayoutChange: (layout: "grid" | "list") => void;
}

export const ViewToggle = ({ layout, onLayoutChange }: ViewToggleProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onLayoutChange("grid")}
        className={`cursor-pointer transition-all ${
          layout === "grid"
            ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
            : "bg-zinc-900/60 border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600"
        }`}
        title="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onLayoutChange("list")}
        className={`cursor-pointer transition-all ${
          layout === "list"
            ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
            : "bg-zinc-900/60 border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600"
        }`}
        title="List view"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};
