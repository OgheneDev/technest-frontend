"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCheckoutHistory } from "@/api/checkout/requests";
import { CheckoutHistory } from "@/types/checkout";
import {
  Package,
  ShoppingBag,
  Calendar,
  ArrowRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/utils/formatPrice";
import { getStatusColor, getStatusText } from "@/types/checkout";
import Link from "next/link";
import Loader from "@/components/ui/Loader";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<CheckoutHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCheckoutHistory();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      search === "" ||
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.paymentReference?.toLowerCase().includes(search.toLowerCase()) ||
      order.shippingAddress?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || order.status === filter;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20 pointer-events-none" />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">My Orders</h1>
              <p className="text-zinc-400">
                View and manage your order history
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => router.push("/shop")}
                className="bg-emerald-500 hover:bg-emerald-400 text-black"
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
                    className={`capitalize ${
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

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-800 flex items-center justify-center">
              <Package className="h-10 w-10 text-zinc-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No orders found
            </h3>
            <p className="text-zinc-400 mb-6">
              {search || filter !== "all"
                ? "Try changing your search or filter criteria"
                : "You haven't placed any orders yet"}
            </p>
            <Button
              onClick={() => {
                setSearch("");
                setFilter("all");
                router.push("/shop");
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-black"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                      <span className="text-sm text-zinc-500 font-mono">
                        Order #{order._id.slice(-8)}
                      </span>
                      {order.paymentReference && (
                        <span className="text-sm text-zinc-500 font-mono">
                          Ref: {order.paymentReference.slice(-8)}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <p className="text-sm text-zinc-400 line-clamp-2">
                        {order.shippingAddress ||
                          "No shipping address provided"}
                      </p>
                      <div className="text-sm text-zinc-500">
                        <span className="capitalize">
                          {order.paymentMethod?.replace("-", " ") ||
                            "Unknown payment method"}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          {order.cart?.products?.length || 0} item
                          {(order.cart?.products?.length || 0) !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-emerald-400">
                        ₦{formatPrice(order.totalPrice || 0)}
                      </div>
                      <div className="text-sm text-zinc-500">Total</div>
                    </div>

                    <Link href={`/checkout/${order._id}`}>
                      <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
