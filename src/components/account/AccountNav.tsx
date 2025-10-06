import { User, Shield, Trash2, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { logout } from '@/api/auth/requests'

interface AccountNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function AccountNav({ activeTab, onTabChange }: AccountNavProps) {
  const router = useRouter()

  const tabs = [
    { id: 'details', label: 'Account Details', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'delete', label: 'Delete Account', icon: Trash2 },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ]

  const handleTabClick = async (tabId: string) => {
    if (tabId === 'logout') {
      const result = await Swal.fire({
        title: 'Logout',
        text: 'Are you sure you want to logout?',
        icon: 'question',
        background: "#1f2937",
        color: "#fff",
        showCancelButton: true,
        confirmButtonText: 'Logout',
        confirmButtonColor: '#EF4444',
      })
      if (result.isConfirmed) {
        // call existing logout helper which clears tokens and redirects
        logout()
        // fallback redirect in case logout doesn't navigate
        try {
          router.push('/')
        } catch (e) {
          /* ignore */
        }
      }
      return
    }

    onTabChange(tabId)
  }

  return (
    <nav className="flex border-b border-white/10 bg-transparent bg-gradient-to-b from-white/3 to-transparent">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex-1 px-2 sm:px-4 py-3 text-xs sm:text-sm cursor-pointer font-medium text-center transition-colors relative
              ${isActive
                ? 'text-cyan-300 border-b-2 border-cyan-400 bg-white/5'
                : tab.id === 'logout'
                ? 'text-white/70 hover:text-white/90 hover:bg-white/3' // keep same hover for logout
                : 'text-white/70 hover:text-white/90 hover:bg-white/3'}`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </div>
          </button>
        )
      })}
    </nav>
  )
}
