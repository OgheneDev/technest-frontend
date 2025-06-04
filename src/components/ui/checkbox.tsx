"use client"

import React from "react"

interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  className?: string
}

export function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = "",
}: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={`
            h-4 w-4 border rounded-sm transition-all duration-200
            ${checked ? "bg-indigo-600 border-indigo-600" : "bg-white border-gray-300"}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-400 peer-focus-visible:ring-offset-2
            ${className}
          `}
        >
          {checked && (
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-white stroke-2 fill-none"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
      {label && <span className={`text-sm ${disabled ? "opacity-50" : ""}`}>{label}</span>}
    </label>
  )
}
