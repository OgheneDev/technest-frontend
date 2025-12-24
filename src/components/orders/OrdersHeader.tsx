import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface OrdersHeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  search,
  setSearch,
  filter,
  setFilter,
}) => {
  const router = useRouter();
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">My Orders</h1>
          <p className="text-zinc-400">View and manage your order history</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.push("/shop")}
            className="bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold text-black"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search orders by ID, reference, or address..."
              className="pl-10 bg-zinc-900 border-zinc-800 text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          {["all", "pending", "completed", "failed", "cancelled"].map(
            (status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                onClick={() => setFilter(status)}
                className={`capitalize text-sm ${
                  filter === status
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                    : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {status === "all" ? "All" : status}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersHeader;
