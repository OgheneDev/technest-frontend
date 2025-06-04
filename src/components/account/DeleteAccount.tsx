import { useState } from 'react'
import { deleteAccount } from '@/api/auth/requests'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Loader2, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'

export default function DeleteAccount() {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#4F46E5',
        confirmButtonText: 'Yes, delete account'
      })

      if (result.isConfirmed) {
        setIsLoading(true)
        await deleteAccount({ password })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to delete account',
        icon: 'error',
        confirmButtonColor: '#4F46E5'
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-red-800 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </h2>
          <p className="text-sm text-red-600 mt-1">
            This action is permanent and cannot be undone. All your data will be permanently deleted.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm your password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              placeholder="Enter your password to confirm"
            />
          </div>

          <div className="pt-4">
            <Button
              onClick={handleDelete}
              disabled={!password || isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting Account...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              You'll be logged out and all your data will be erased
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
