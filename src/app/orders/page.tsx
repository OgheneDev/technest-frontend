"use client";

import { useEffect, useState } from "react";
import { getCheckoutHistory } from "@/api/checkout/requests";
import { CheckoutHistory } from "@/types/checkout";
import Loader from "@/components/ui/Loader";
import OrdersHeader from "@/components/orders/OrdersHeader";
import EmptyOrdersState from "@/components/orders/EmptyOrdersState";
import OrdersCard from "@/components/orders/OrdersCard";

export default function OrdersPage() {
  const [orders, setOrders] = useState<CheckoutHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchCheckoutHistory = async () => {
      try {
        setLoading(true);
        const response = await getCheckoutHistory();
        setOrders(response.data || []);
      } catch (err: any) {
        console.error("Error fetching checkout history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutHistory();
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
        <OrdersHeader
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <EmptyOrdersState
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrdersCard order={order} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
