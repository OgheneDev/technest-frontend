"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, User, Phone, Mail, Camera } from "lucide-react";
import Swal from "sweetalert2";
import Image from "next/image";

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
}

export default function AccountDetails({ userData }: AccountDetailsProps) {
  const { updateDetails } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    phoneNumber: userData?.phoneNumber || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    userData?.avatar || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync formData and avatarPreview with userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phoneNumber: userData.phoneNumber || "",
      });
      setAvatarPreview(userData.avatar || null);
    }
  }, [userData]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          title: "Error",
          text: "Please upload an image file",
          icon: "error",
          confirmButtonColor: "#10b981",
          background: "#0a0a0a",
          color: "#fff",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        Swal.fire({
          title: "Error",
          text: "Image size should be less than 5MB",
          icon: "error",
          confirmButtonColor: "#10b981",
          background: "#0a0a0a",
          color: "#fff",
        });
        return;
      }

      // Show preview
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      let hasChanges = false;

      // Only include changed fields
      if (formData.firstName && formData.firstName !== userData.firstName) {
        formDataToSend.append("firstName", formData.firstName);
        hasChanges = true;
      }
      if (formData.lastName && formData.lastName !== userData.lastName) {
        formDataToSend.append("lastName", formData.lastName);
        hasChanges = true;
      }
      if (
        formData.phoneNumber &&
        formData.phoneNumber !== userData.phoneNumber
      ) {
        formDataToSend.append("phoneNumber", formData.phoneNumber);
        hasChanges = true;
      }
      if (fileInputRef.current?.files?.[0]) {
        formDataToSend.append("avatar", fileInputRef.current.files[0]);
        hasChanges = true;
      }

      if (!hasChanges) {
        Swal.fire({
          title: "Info",
          text: "No changes to update",
          icon: "info",
          confirmButtonColor: "#10b981",
          background: "#0a0a0a",
          color: "#fff",
        });
        setIsLoading(false);
        return;
      }

      // Update details using the store
      await updateDetails(formDataToSend);

      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully",
        icon: "success",
        confirmButtonColor: "#10b981",
        background: "#0a0a0a",
        color: "#fff",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error instanceof Error ? error.message : "Failed to update profile",
        icon: "error",
        confirmButtonColor: "#10b981",
        background: "#0a0a0a",
        color: "#fff",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Account Details</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Update your personal information
          </p>
        </div>

        {/* Avatar Upload */}
        <div className="relative group">
          <div
            onClick={handleAvatarClick}
            className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer bg-zinc-800 border border-zinc-700 group-hover:border-emerald-500/50 transition-colors"
          >
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <User className="h-8 w-8 text-zinc-500" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-5 w-5 text-white" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <User className="h-4 w-4 text-zinc-500" />
              First Name
            </label>
            <Input
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              placeholder="First Name"
              disabled={isLoading}
              className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <User className="h-4 w-4 text-zinc-500" />
              Last Name
            </label>
            <Input
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
              }
              placeholder="Last Name"
              disabled={isLoading}
              className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Mail className="h-4 w-4 text-zinc-500" />
              Email
            </label>
            <Input
              value={userData?.email || ""}
              disabled
              className="bg-zinc-900/30 text-zinc-500 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Phone className="h-4 w-4 text-zinc-500" />
              Phone Number
            </label>
            <Input
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              placeholder="Phone Number"
              disabled={isLoading}
              className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 disabled:opacity-50"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-500 hover:bg-emerald-400 font-semibold text-black text-sm cursor-pointer"
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
  );
}
