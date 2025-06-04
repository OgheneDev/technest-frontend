"use client"

import React, { useState, useRef, useEffect } from "react"

interface SliderProps {
  min: number
  max: number
  value: [number, number]
  step?: number
  onChange?: (value: [number, number]) => void
  className?: string
}

export function Slider({
  min,
  max,
  value,
  step = 1,
  onChange,
  className = "",
}: SliderProps) {
  const [isDragging, setIsDragging] = useState<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100
  }

  const handleMove = (clientX: number) => {
    if (!trackRef.current || isDragging === null) return

    const { left, width } = trackRef.current.getBoundingClientRect()
    const percentage = Math.min(Math.max((clientX - left) / width, 0), 1)
    const newValue = Math.round((percentage * (max - min) + min) / step) * step

    const newValues = [...value] as [number, number]
    newValues[isDragging] = Math.min(Math.max(newValue, min), max)

    // Ensure thumbs don't cross each other
    if (isDragging === 0 && newValues[0] > value[1]) {
      newValues[0] = value[1]
    } else if (isDragging === 1 && newValues[1] < value[0]) {
      newValues[1] = value[0]
    }

    onChange?.(newValues)
  }

  // Handle both mouse and touch events
  useEffect(() => {
    if (isDragging === null) return

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault() // Prevent scrolling while dragging
      handleMove(e.touches[0].clientX)
    }
    const handleEnd = () => setIsDragging(null)

    // Mouse events
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleEnd)

    // Touch events
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleEnd)
    document.addEventListener("touchcancel", handleEnd)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleEnd)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleEnd)
      document.removeEventListener("touchcancel", handleEnd)
    }
  }, [isDragging, value])

  return (
    <div className={`relative h-11 w-full touch-none ${className}`}>
      <div
        ref={trackRef}
        className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200"
      >
        <div
          className="absolute h-full bg-indigo-600 rounded-full"
          style={{
            left: `${getPercentage(value[0])}%`,
            right: `${100 - getPercentage(value[1])}%`,
          }}
        />
      </div>

      {[0, 1].map((index) => (
        <div
          key={index}
          className="absolute top-1/2 h-6 w-6 cursor-pointer rounded-full border border-indigo-600 bg-white -translate-x-1/2 -translate-y-1/2 transition-shadow hover:shadow-lg focus:outline-none touch-none"
          style={{ left: `${getPercentage(value[index])}%` }}
          onMouseDown={() => setIsDragging(index)}
          onTouchStart={() => setIsDragging(index)}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value[index]}
          tabIndex={0}
        />
      ))}
    </div>
  )
}
