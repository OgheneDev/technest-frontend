import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";
import { Button } from "../ui/button";

interface OrdersHeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const EmptyOrdersState: React.FC<OrdersHeaderProps> = ({
  search,
  filter,
  setSearch,
  setFilter,
}) => {
  const router = useRouter();
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-800 flex items-center justify-center">
        <Package className="h-10 w-10 text-zinc-600" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
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
  );
};

export default EmptyOrdersState;
