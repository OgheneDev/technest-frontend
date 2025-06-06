import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:bg-white/5 disabled:text-white/30"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant="outline"
          size="icon"
          onClick={() => onPageChange(page)}
          className={`${
            currentPage === page
              ? 'bg-cyan-500 text-white border-cyan-500'
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }`}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:bg-white/5 disabled:text-white/30"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
