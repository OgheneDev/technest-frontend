'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, FormEvent } from 'react'
import Swal from 'sweetalert2'
import { Facebook, Twitter, Instagram, Send } from 'lucide-react'

// Add logo import
import logo from '@/assets/images/logo.png'; // Adjust path as needed

interface NavLink {
  text: string;
  path: string;
}

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState<string>('');

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement subscribe logic here
    Swal.fire({
      title: "Success!",
      text: `Subscribed with email: ${subscribeEmail}`,
      icon: "success"
    });
    setSubscribeEmail('');
  };

  return (
    <footer className='bg-gradient-to-r from-gray-900 to-gray-800'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Image src={logo} alt="Logo" width={180} height={60} className="brightness-200 contrast-200" />
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">Address: 1234 Street, Suite 500, New York, NY</p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">Email:</span>
                  <a href="mailto:info@technest.com" className="hover:text-white transition-colors">
                    info@technest.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">Phone:</span>
                  <a href="tel:0907158312" className="hover:text-white transition-colors">
                    090 715 831 27
                  </a>
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-3 text-gray-300">
              {['About Us', 'Shop', 'Contact Us', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-3 text-gray-300">
              {[
                { text: 'Help & FAQs', path: '/contact-us' },
                { text: 'Login / Register', path: '/account' },
                { text: 'Track your Order', path: '/order-tracking' }
              ].map((item: NavLink) => (
                <li key={item.text}>
                  <Link 
                    href={item.path}
                    className="hover:text-white transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input 
                  type="email"
                  placeholder="Email Address.."
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Send size={16} className="text-white" />
                </button>
              </div>
              <p className="text-sm text-gray-400">
                By subscribing to our newsletter you agree to our{' '}
                <Link href="" className="text-blue-400 hover:text-blue-300">Terms of Policy</Link>
                {' '}and{' '}
                <Link href="" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
