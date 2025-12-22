import { CreditCard, Wallet, FileText, CheckCircle } from "lucide-react";

export interface CheckoutHistory {
  _id: string;
  user: string;
  cart: {
    _id: string;
    user: string;
    products: Array<any>; // You can define a more specific type for products
    totalPrice: number;
    createdAt: string;
  };
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  status?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartData {
  items?: CartItem[];
  totalPrice?: number;
  products: CartItem[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Step {
  id: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const paymentMethods: PaymentMethod[] = [
  { id: "debit-card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "bank-transfer", name: "Bank Transfer", icon: Wallet },
];

export const steps: Step[] = [
  { id: 1, label: "Details", icon: FileText },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Confirm", icon: CheckCircle },
];

export const getStatusColor = (status?: string | null) => {
  const s = typeof status === "string" ? status.toLowerCase() : "";
  switch (s) {
    case "success":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    case "pending":
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    case "failed":
      return "bg-red-500/10 text-red-400 border-red-500/30";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
  }
};
