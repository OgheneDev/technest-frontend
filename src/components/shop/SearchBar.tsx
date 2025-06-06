import { useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from '../ui/input'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch(value)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full sm:w-96"
    >
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchValue}
          onChange={handleSearch}
          className="w-full px-4 py-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div> 
    </motion.div>
  )
}
