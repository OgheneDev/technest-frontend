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
    default: "bg-cyan-400 text-white cursor-pointer",
    outline: "border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white",
    ghost: "hover:bg-cyan-400 text-gray-300",
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
