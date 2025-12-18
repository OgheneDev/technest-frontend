"use client";

import { User, Shield, Trash2, LogOut, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { logout } from "@/api/auth/requests";

interface AccountNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AccountNav({
  activeTab,
  onTabChange,
}: AccountNavProps) {
  const router = useRouter();

  const tabs = [
    { id: "details", label: "Account Details", icon: User, color: "emerald" },
    { id: "security", label: "Security", icon: Shield, color: "blue" },
    { id: "delete", label: "Delete Account", icon: Trash2, color: "red" },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      background: "#0a0a0a",
      color: "#fff",
      showCancelButton: true,
      confirmButtonText: "Logout",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#404040",
    });

    if (result.isConfirmed) {
      logout();
      try {
        router.push("/");
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <div className="space-y-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 cursor-pointer ${
              isActive
                ? `bg-emerald-500/10 border border-emerald-500/30 text-emerald-400`
                : "bg-zinc-900/40 hover:bg-zinc-800/60 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-emerald-400" : "text-zinc-400"
                }`}
              />
              <span className="text-sm">{tab.label}</span>
            </div>
            <ChevronRight
              className={`h-4 w-4 ${
                isActive ? "text-emerald-400" : "text-zinc-500"
              }`}
            />
          </button>
        );
      })}

      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 cursor-pointer bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300"
      >
        <div className="flex items-center gap-3">
          <LogOut className="h-5 w-5" />
          <span className="text-sm">Logout</span>
        </div>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
