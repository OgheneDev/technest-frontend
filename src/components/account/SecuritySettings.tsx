"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

export default function SecuritySettings() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { updatePassword } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "New passwords do not match",
        icon: "error",
        confirmButtonColor: "#10b981",
      });
      setIsLoading(false);
      return;
    }

    try {
      await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      Swal.fire({
        title: "Success!",
        text: "Password updated successfully",
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error instanceof Error ? error.message : "Failed to update password",
        icon: "error",
        confirmButtonColor: "#10b981",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Security Settings</h2>
        <p className="text-sm text-zinc-400 mt-1">Update your password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Lock className="h-4 w-4 text-zinc-500" />
              Current Password
            </label>
            <div className="relative">
              <Input
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                placeholder="Enter current password"
                className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-zinc-300"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
              >
                {showPasswords.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Lock className="h-4 w-4 text-zinc-500" />
              New Password
            </label>
            <div className="relative">
              <Input
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                placeholder="Enter new password"
                className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-zinc-300"
                onClick={() =>
                  setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                }
              >
                {showPasswords.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Lock className="h-4 w-4 text-zinc-500" />
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Confirm new password"
                className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-zinc-300"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-500 hover:bg-emerald-400 text-sm text-black font-medium cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Updating Password...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Update Password
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
