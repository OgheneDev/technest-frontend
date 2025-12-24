"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2, Trash2 } from "lucide-react";
import { useToastStore } from "@/store/useToastStore";

interface DeleteAccountProps {
  setConfirmationModal: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      title: string;
      message: string;
      onConfirm: () => void;
      variant?: "danger" | "warning" | "info";
    }>
  >;
}

export default function DeleteAccount({
  setConfirmationModal,
}: DeleteAccountProps) {
  const [password, setPassword] = useState("");
  const { deleteAccount, isDeleting } = useAuthStore();
  const { showToast } = useToastStore();

  const handleDeleteClick = () => {
    if (!password) {
      showToast("Please enter your password to confirm", "error");
      return;
    }

    setConfirmationModal({
      isOpen: true,
      title: "Are you sure?",
      message:
        "This action cannot be undone! All your data will be permanently deleted.",
      onConfirm: confirmDeleteAccount,
      variant: "danger",
    });
  };

  const confirmDeleteAccount = async () => {
    try {
      await deleteAccount({ password });
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to delete account",
        "error"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-red-400" />
          Delete Account
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          This action is permanent and cannot be undone. All your data will be
          permanently deleted.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Confirm your password
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-red-500"
            placeholder="Enter your password to confirm"
          />
        </div>

        <div className="pt-2">
          <Button
            onClick={handleDeleteClick}
            disabled={!password || isDeleting}
            className="w-full bg-red-600 text-sm hover:bg-red-700 cursor-pointer font-semibold text-white transition-colors"
          >
            {isDeleting ? (
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
          <p className="text-xs text-zinc-500 mt-2 text-center">
            You'll be logged out and all your data will be erased
          </p>
        </div>
      </div>
    </div>
  );
}
