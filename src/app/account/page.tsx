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
  // Add the properties that your user data object should have
  _id: string
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  // Add other fields as needed
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <AccountNav activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="p-6">
              {activeTab === 'details' && (
                <AccountDetails userData={userData} setUserData={setUserData} />
              )}
              {activeTab === 'security' && (
                <SecuritySettings />
              )}
              {activeTab === 'delete' && (
                <DeleteAccount />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
