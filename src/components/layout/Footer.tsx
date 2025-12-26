"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { Facebook, Twitter, Instagram, Send } from "lucide-react";
import { useToastStore } from "@/store/useToastStore";

interface NavLink {
  text: string;
  path: string;
}

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState<string>("");
  const { showToast } = useToastStore();

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast(`Subscribed with email: ${subscribeEmail}`, "success");
    setSubscribeEmail("");
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <h4 className="text-white text-xl font-semibold">
              Tech<span className="text-emerald-500">N</span>est
            </h4>
            <div className="space-y-4 text-zinc-400 text-sm">
              <p>
                1234 Street, Suite 500
                <br />
                New York, NY
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:info@technest.com"
                  className="block hover:text-emerald-400 transition-colors"
                >
                  info@technest.com
                </a>
                <a
                  href="tel:0907158312"
                  className="block hover:text-emerald-400 transition-colors"
                >
                  090 715 831 27
                </a>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 transition-all"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 transition-all"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 transition-all"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {["About Us", "Shop", "Contact Us", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-zinc-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { text: "Help & FAQs", path: "/contact-us" },
                { text: "Login / Register", path: "/account" },
                { text: "Track your Order", path: "/orders" },
              ].map((item: NavLink) => (
                <li key={item.text}>
                  <Link
                    href={item.path}
                    className="text-zinc-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
                />
                <button
                  type="submit"
                  className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-emerald-500 hover:bg-emerald-400 p-2 rounded-md transition-colors"
                >
                  <Send size={14} className="text-black" />
                </button>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                By subscribing you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© 2024 TechNest. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/terms"
                className="hover:text-zinc-300 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="hover:text-zinc-300 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="hover:text-zinc-300 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
