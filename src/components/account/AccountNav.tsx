import { User, Shield, Trash2 } from 'lucide-react'

interface AccountNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function AccountNav({ activeTab, onTabChange }: AccountNavProps) {
  const tabs = [
    { id: 'details', label: 'Account Details', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'delete', label: 'Delete Account', icon: Trash2 },
  ]

  return (
    <nav className="flex border-b border-gray-200 bg-gray-50">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 px-4 py-4 text-sm cursor-pointer font-medium text-center
              hover:bg-gray-100 transition-colors relative
              ${activeTab === tab.id 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500'
              }
            `}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon className="h-4 w-4" />
              {tab.label}
            </div>
          </button>
        )
      })}
    </nav>
  )
}
