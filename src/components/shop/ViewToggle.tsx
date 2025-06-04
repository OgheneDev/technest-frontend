import { LayoutGrid, List } from 'lucide-react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'

interface ViewToggleProps {
  layout: 'grid' | 'list'
  onLayoutChange: (layout: 'grid' | 'list') => void
}

export const ViewToggle = ({ layout, onLayoutChange }: ViewToggleProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 bg-white p-1 rounded-lg shadow-sm"
    >
      <Button
        variant={layout === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLayoutChange('grid')}
        className="flex items-center gap-2"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Grid</span>
      </Button>
      <Button
        variant={layout === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLayoutChange('list')}
        className="flex items-center gap-2"
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">List</span>
      </Button>
    </motion.div>
  )
}
