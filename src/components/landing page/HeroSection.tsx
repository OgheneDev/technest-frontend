"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const MotionDiv = motion('div');

const backgroundBubbles = [
	{ color: 'rgba(59, 130, 246, 0.15)', size: '300px', left: '10%', top: '20%' },
	{ color: 'rgba(124, 58, 237, 0.15)', size: '400px', left: '60%', top: '10%' },
	{ color: 'rgba(236, 72, 153, 0.15)', size: '350px', left: '30%', top: '50%' },
	{ color: 'rgba(34, 211, 238, 0.15)', size: '250px', left: '80%', top: '40%' },
	{ color: 'rgba(168, 85, 247, 0.15)', size: '450px', left: '5%', top: '70%' },
]

const HeroSection = () => {
	return (
		<section className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0">
				{backgroundBubbles.map((bubble, i) => (
					<MotionDiv
						key={i}
						className="absolute rounded-full mix-blend-multiply filter blur-xl"
						animate={{
							x: [0, 50, 0],
							y: [0, 30, 0],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.7,
						}}
						style={{
							background: bubble.color,
							width: bubble.size,
							height: bubble.size,
							left: bubble.left,
							top: bubble.top,
						}}
					/>
				))}
			</div>

			<div className="container relative z-10 px-6 md:px-12 py-18 md:py-24">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-8 text-center md:text-start"
					>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50"
						>
							<Sparkles className="w-4 h-4 text-blue-500 mr-2" />
							<span className="text-sm text-blue-600 font-medium">
								New Tech Arrivals
							</span>
						</motion.div>

						<motion.h1
							className="text-5xl md:text-7xl font-bold text-gray-900"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
						>
							Future Tech
							<span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
								At Your Fingertips
							</span>
						</motion.h1>

						<motion.p
							className="text-lg text-gray-600 max-w-lg"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
						>
							Explore our curated collection of cutting-edge gadgets and accessories
							designed to elevate your digital lifestyle.
						</motion.p>

						<motion.div
							className="flex flex-wrap gap-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
						>
							<Button
								size="lg"
								className="bg-gradient-to-r cursor-pointer w-full md:w-fit from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white group"
							>
								Shop Collection
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-2 hover:bg-gray-50 w-full md:w-fit cursor-pointer"
							>
								View Deals
							</Button>
						</motion.div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className="relative w-full aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-100/50 to-violet-100/50"
					>
						<motion.div
							animate={{
								y: [0, -8, 0],
							}}
							transition={{
								duration: 6,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							className="relative h-full w-full"
						>
							<Image
								src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1730981601/slide_s36khb.png"
								alt="Latest tech devices"
								fill
								className="object-contain p-8"
								priority
							/>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection