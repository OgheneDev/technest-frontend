"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyPayment } from "@/api/checkout/requests";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        // Get reference from URL params
        const reference =
          searchParams.get("reference") || searchParams.get("trxref");

        if (!reference) {
          setStatus("error");
          setMessage("No payment reference found");
          return;
        }

        // Verify payment
        const result = await verifyPayment(reference);

        if (result) {
          setStatus("success");
          setMessage("Payment verified successfully!");

          // Redirect to checkout page after 3 seconds
          setTimeout(() => {
            router.push("/checkout?payment=success");
          }, 3000);
        }
      } catch (error: any) {
        console.error("Payment verification error:", error);
        setStatus("error");
        setMessage(error.message || "Payment verification failed");
      }
    };

    verify();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-8 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-emerald-400 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Verifying Payment
            </h2>
            <p className="text-zinc-400">
              Please wait while we verify your payment...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Payment Successful!
            </h2>
            <p className="text-zinc-400 mb-6">{message}</p>
            <p className="text-sm text-zinc-500 mb-4">
              Redirecting to checkout...
            </p>
            <Button
              onClick={() => router.push("/checkout")}
              className="bg-emerald-500 hover:bg-emerald-400 text-black"
            >
              Go to Checkout
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <XCircle className="h-10 w-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Payment Failed
            </h2>
            <p className="text-zinc-400 mb-6">{message}</p>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push("/checkout")}
                className="bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                Back to Checkout
              </Button>
              <Button
                onClick={() => router.push("/shop")}
                className="bg-emerald-500 hover:bg-emerald-400 text-black"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
