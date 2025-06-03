import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg" | "icon"
  asChild?: boolean
  children: React.ReactNode
}

export function Button({
  variant = "default",
  size = "default",
  className = "",
  children,
  asChild,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-gray-800 text-white hover:bg-gray-900",
    outline: "border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white",
    ghost: "hover:bg-gray-800 text-gray-300",
  }

  const sizes = {
    sm: "h-9 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-11 px-8 text-lg",
    icon: "h-10 w-10",
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(childElement, {
      ...props,
      className: `${childElement.props.className || ''} ${classes}`.trim(),
    })
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
