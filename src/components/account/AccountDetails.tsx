import { useState, useRef, useEffect } from 'react'
import { updateDetails } from '@/api/auth/requests'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2, User, Phone, Mail, Camera } from 'lucide-react'
import Swal from 'sweetalert2'
import Image from 'next/image'

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
}

interface AccountDetailsProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

export default function AccountDetails({ userData, setUserData }: AccountDetailsProps) {
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    phoneNumber: userData?.phoneNumber || ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(userData?.avatar || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync formData and avatarPreview with userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phoneNumber: userData.phoneNumber || ''
      })
      setAvatarPreview(userData.avatar || null)
    }
  }, [userData])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        Swal.fire('Error', 'Please upload an image file', 'error')
        return
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        Swal.fire('Error', 'Image size should be less than 5MB', 'error')
        return
      }

      // Show preview
      const reader = new FileReader()
      reader.onload = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      let hasChanges = false

      // Only include changed fields
      if (formData.firstName && formData.firstName !== userData.firstName) {
        formDataToSend.append('firstName', formData.firstName)
        hasChanges = true
      }
      if (formData.lastName && formData.lastName !== userData.lastName) {
        formDataToSend.append('lastName', formData.lastName)
        hasChanges = true
      }
      if (formData.phoneNumber && formData.phoneNumber !== userData.phoneNumber) {
        formDataToSend.append('phoneNumber', formData.phoneNumber)
        hasChanges = true
      }
      if (fileInputRef.current?.files?.[0]) {
        formDataToSend.append('avatar', fileInputRef.current.files[0])
        hasChanges = true
      }

      if (!hasChanges) {
        Swal.fire('Info', 'No changes to update', 'info')
        setIsLoading(false)
        return
      }

      const updatedUser = await updateDetails(formDataToSend)
      if (updatedUser) {
        setUserData(updatedUser)
        Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully',
          icon: 'success',
          confirmButtonColor: '#4F46E5',
          timer: 2000,
          showConfirmButton: false
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to update profile',
        icon: 'error',
        confirmButtonColor: '#4F46E5'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Account Details</h2>
          <p className="text-sm text-white/70 mt-1">Update your personal information</p>
        </div>

        {/* Avatar Upload */}
        <div className="relative group">
          <div 
            onClick={handleAvatarClick}
            className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer group bg-white/5 border border-white/8"
          >
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/6 flex items-center justify-center">
                <User className="h-8 w-8 text-white/60" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-6 w-6 text-white" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
              <User className="h-4 w-4 text-white/60" />
              First Name
            </label>
            <Input
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              placeholder="First Name"
              className="bg-white/5 placeholder:text-white/60 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
              <User className="h-4 w-4 text-white/60" />
              Last Name
            </label>
            <Input
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              placeholder="Last Name"
              className="bg-white/5 placeholder:text-white/60 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
              <Mail className="h-4 w-4 text-white/60" />
              Email
            </label>
            <Input
              value={userData?.email || ''}
              disabled
              className="bg-white/6 text-white/60"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
              <Phone className="h-4 w-4 text-white/60" />
              Phone Number
            </label>
            <Input
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              placeholder="Phone Number"
              className="bg-white/5 placeholder:text-white/60 text-white"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto text-sm cursor-pointer bg-cyan-500 text-white border-none hover:brightness-105"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <User className="w-4 h-4 mr-2" />
              Update Profile
            </>
          )}
        </Button>
      </form>
    </div>
  )
}