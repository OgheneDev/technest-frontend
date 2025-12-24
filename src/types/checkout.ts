import { CreditCard, Wallet, FileText, CheckCircle } from "lucide-react";

export interface CheckoutHistory {
  _id: string;
  user: string;
  cart: {
    _id: string;
    user: string;
    products: CartItem[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
  };
  items: CartItem[];
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  paymentReference?: string;
  paymentDetails?: {
    gateway?: string;
    transactionId?: string;
    paidAt?: string;
    channel?: string;
    currency?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  _id: string;
  product?: {
    _id: string;
    name: string;
    price: number;
    images?: string[];
  };
  name?: string;
  price?: number;
  quantity: number;
  image?: string;
}

export interface CartData {
  _id: string;
  user: string;
  products: CartItem[];
  totalPrice: number;
  items?: CartItem[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Step {
  id: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Updated to match backend enum values
export const paymentMethods: PaymentMethod[] = [
  {
    id: "paystack",
    name: "Paystack (Card/Transfer)",
    description: "Secure online payment via Paystack",
    icon: CreditCard,
  },
  {
    id: "debit-card",
    name: "Debit Card",
    description: "Direct debit card payment",
    icon: CreditCard,
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    description: "Manual bank transfer",
    icon: Wallet,
  },
];

export const steps: Step[] = [
  { id: 1, label: "Details", icon: FileText },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Confirm", icon: CheckCircle },
];

export const getStatusColor = (status?: string | null) => {
  if (!status) return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";

  const s = status.toLowerCase();
  switch (s) {
    case "completed":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    case "pending":
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    case "processing":
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    case "failed":
      return "bg-red-500/10 text-red-400 border-red-500/30";
    case "cancelled":
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
  }
};

export const getStatusText = (status?: string | null) => {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export interface CheckoutDetails extends CheckoutHistory {
  cart: {
    _id: string;
    user: string;
    products: Array<{
      product: {
        _id: string;
        name: string;
        price: number;
        images?: string[];
        description?: string;
      };
      quantity: number;
      _id: string;
    }>;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
  };
}
