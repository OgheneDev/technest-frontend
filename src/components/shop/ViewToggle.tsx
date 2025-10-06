import { LayoutGrid, List } from "lucide-react"
import { Button } from "../ui/button"

interface ViewToggleProps {
  layout: 'grid' | 'list'
  onLayoutChange: (layout: 'grid' | 'list') => void
}

export const ViewToggle = ({ layout, onLayoutChange }: ViewToggleProps) => {
  return (
    <div className="hidden md:flex gap-2 ">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onLayoutChange('grid')}
        className={`cursor-pointer ${
          layout === 'grid' 
            ? 'bg-cyan-500 text-white border-cyan-500' 
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onLayoutChange('list')}
        className={`cursor-pointer ${
          layout === 'list' 
            ? 'bg-cyan-500 text-white border-cyan-500' 
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
        }`}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}
