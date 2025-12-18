"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AccountNav from "@/components/account/AccountNav";
import AccountDetails from "@/components/account/AccountDetails";
import SecuritySettings from "@/components/account/SecuritySettings";
import DeleteAccount from "@/components/account/DeleteAccount";
import { getMe } from "@/api/auth/requests";
import { Loader2, ArrowLeft, Settings, User } from "lucide-react";
import Link from "next/link";

// Define UserData type or import it if it exists elsewhere
type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  avatar?: string;
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("details");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMe();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Show loading state until we have user data
  if (isLoading || !userData) {
    return (
      <div className="min-h-screen bg-zinc-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-400" />
        </div>
      </div>
    );
  }

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
              <AccountNav activeTab={activeTab} onTabChange={setActiveTab} />
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
                    <AccountDetails
                      userData={userData}
                      setUserData={setUserData}
                    />
                  )}
                  {activeTab === "security" && <SecuritySettings />}
                  {activeTab === "delete" && <DeleteAccount />}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
