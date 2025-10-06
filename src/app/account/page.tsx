'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AccountNav from '@/components/account/AccountNav'
import AccountDetails from '@/components/account/AccountDetails'
import SecuritySettings from '@/components/account/SecuritySettings'
import DeleteAccount from '@/components/account/DeleteAccount'
import { getMe } from '@/api/auth/requests'
import { Loader2 } from 'lucide-react'

// Define UserData type or import it if it exists elsewhere
type UserData = {
  _id: string
  firstName: string 
  lastName: string
  phoneNumber: string
  email: string
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('details')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMe()
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Show loading state until we have user data
  if (isLoading || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden py-8 md:pt-12">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-lg">
            <AccountNav activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="p-6">
              {activeTab === 'details' && (
                <AccountDetails userData={userData} setUserData={setUserData} />
              )}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'delete' && <DeleteAccount />}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{` 
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
        }
      `}</style>
    </div>
  )
}
