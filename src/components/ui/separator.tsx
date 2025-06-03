"use client"

interface SeparatorProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Separator({ 
  className = '', 
  orientation = 'horizontal' 
}: SeparatorProps) {
  const baseStyles = 'shrink-0 bg-gray-200';
  const orientationStyles = orientation === 'horizontal' 
    ? 'h-[1px] w-full' 
    : 'h-full w-[1px]';

  return (
    <div 
      role="separator"
      className={`${baseStyles} ${orientationStyles} ${className}`}
    />
  );
}
