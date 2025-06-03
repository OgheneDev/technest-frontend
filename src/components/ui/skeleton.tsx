import { ReactNode } from "react"

interface SkeletonProps {
  className?: string
  children?: ReactNode
}

export function Skeleton({ className = "", children }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-md bg-gray-200/60 ${className}`}>
      {children}
    </div>
  )
}
