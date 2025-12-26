"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "support@technest.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+234 800 123 4567",
      description: "Mon-Sat, 9AM - 6PM WAT",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "Lagos, Nigeria",
      description: "Our headquarters",
    },
    {
      icon: Clock,
      title: "Support Hours",
      detail: "24/7 Online",
      description: "Always here to help",
    },
  ];

  const faqs = [
    {
      question: "How long does delivery take?",
      answer:
        "We deliver within 24-48 hours for orders within Lagos and 3-5 business days for other locations across Nigeria. Express delivery options are available at checkout.",
    },
    {
      question: "Are all products authentic?",
      answer:
        "Absolutely! Every product we sell is 100% authentic and comes with manufacturer warranties. We source directly from authorized distributors and brands.",
    },
    {
      question: "What's your return policy?",
      answer:
        "We offer a 7-day return policy for unopened products in original packaging. For defective items, we provide free replacements or full refunds within 30 days.",
    },
    {
      question: "Do you offer installation support?",
      answer:
        "Yes! Our tech specialists can guide you through setup and installation via phone, email, or video call. Premium installation services are also available for select products.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, card payments (Visa, Mastercard), mobile money, and cash on delivery for eligible orders. All transactions are secured with industry-standard encryption.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order ships, you'll receive a tracking number via email and SMS. You can track your package in real-time through our website or mobile app.",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-zinc-950" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <span className="inline-block px-4 py-1.5 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium tracking-wide">
              GET IN TOUCH
            </span>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              We're Here
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
                To Help
              </span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Have questions? Need support? Our team is ready to assist you with
              anything tech-related.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 border-y border-zinc-800/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">
                    {info.title}
                  </h3>
                  <p className="text-emerald-400 font-medium mb-1">
                    {info.detail}
                  </p>
                  <p className="text-sm text-zinc-400">{info.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Send Us a Message
                  </h2>
                  <p className="text-zinc-400">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>

                <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-zinc-400">
                        We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          placeholder="How can we help?"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                          placeholder="Tell us more about your inquiry..."
                          required
                        ></textarea>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 bg-emerald-500 font-semibold hover:bg-emerald-400 rounded-lg text-black cursor-pointer transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Quick Support
                </h2>
                <p className="text-zinc-400 mb-6">
                  Need immediate assistance? Try these options for faster
                  responses.
                </p>

                <div className="space-y-4">
                  <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          Live Chat
                        </h3>
                        <p className="text-sm text-zinc-400 mb-3">
                          Chat with our support team in real-time
                        </p>
                        <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
                          Start Chat →
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          WhatsApp
                        </h3>
                        <p className="text-sm text-zinc-400 mb-3">
                          Message us on WhatsApp for quick help
                        </p>
                        <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
                          Open WhatsApp →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-emerald-950/30 to-amber-950/30 border border-emerald-500/20 rounded-2xl">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Enterprise Inquiries
                </h3>
                <p className="text-zinc-400 mb-4">
                  Looking for bulk orders or business partnerships? Our
                  enterprise team can help you with custom solutions.
                </p>
                <button className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
                  Contact Enterprise Sales →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 md:py-32 bg-zinc-900/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Find quick answers to common questions about our products and
              services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-zinc-800/30 transition-colors"
                >
                  <span className="text-white font-semibold pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-zinc-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-emerald-950/20 to-amber-950/20" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Still have questions?
            </h2>
            <p className="text-xl text-zinc-400">
              Our support team is available 24/7 to help you with any inquiries
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-emerald-500 font-semibold hover:bg-emerald-400 rounded-lg text-black cursor-pointer transition-colors"
              >
                Call Support
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-zinc-700 font-semibold hover:border-zinc-600 rounded-lg cursor-pointer text-white transition-colors"
              >
                View Help Center
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
