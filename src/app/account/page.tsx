"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AccountNav from "@/components/account/AccountNav";
import AccountDetails from "@/components/account/AccountDetails";
import SecuritySettings from "@/components/account/SecuritySettings";
import DeleteAccount from "@/components/account/DeleteAccount";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("details");
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant?: "danger" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    // Refresh user data when component mounts
    if (!authUser) {
      checkAuth();
    }
  }, [authUser, checkAuth]);

  // Show loading state until we have user data
  if (isCheckingAuth || !authUser) {
    return <Loader />;
  }

  const closeModal = () => {
    setConfirmationModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden relative">
      {/* Hero gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="inline-flex items-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[12px] tracking-wide mb-4"
            >
              <User className="h-3 w-3 mr-2" />
              ACCOUNT SETTINGS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-3"
            >
              Manage Your <span className="text-emerald-400">Account</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-zinc-400 max-w-2xl mx-auto"
            >
              Update your personal information, security settings, and manage
              your account
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <AccountNav
                activeTab={activeTab}
                onTabChange={setActiveTab}
                setConfirmationModal={setConfirmationModal}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-xl p-6"
              >
                <AnimatePresence mode="wait">
                  {activeTab === "details" && (
                    <AccountDetails userData={authUser} />
                  )}
                  {activeTab === "security" && <SecuritySettings />}
                  {activeTab === "delete" && (
                    <DeleteAccount
                      setConfirmationModal={setConfirmationModal}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={closeModal}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        confirmText={
          confirmationModal.variant === "danger"
            ? "Yes, delete account"
            : "Yes, log out"
        }
        cancelText="Cancel"
        variant={confirmationModal.variant}
      />
    </div>
  );
}
