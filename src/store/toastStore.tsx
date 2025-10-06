import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { Toast } from '@/components/ui/toast'

let container: HTMLDivElement | null = null
let root: Root | null = null
let hideTimer: number | undefined

const ensureRoot = () => {
	// server-safe
	if (typeof document === 'undefined') return
	if (!container) {
		container = document.createElement('div')
		document.body.appendChild(container)
		root = createRoot(container)
	}
}

// Render visible toast
export function showToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success', duration = 3000) {
	if (typeof window === 'undefined') return
	ensureRoot()
	if (!root) return

	// clear previous timer
	if (hideTimer) {
		window.clearTimeout(hideTimer)
		hideTimer = undefined
	}

	const onClose = () => {
		hideToast()
	}

	root.render(<Toast show={true} message={message} type={type} onClose={onClose} duration={duration} />)

	// ensure it unmounts after duration + small buffer
	hideTimer = window.setTimeout(() => {
		hideToast()
	}, duration + 100)
}

export function hideToast() {
	if (typeof window === 'undefined') return
	if (!root || !container) return

	// unmount the toast visually
	root.render(<></>)

	// remove container after animation buffer
	window.setTimeout(() => {
		try {
			if (container && container.parentNode) container.parentNode.removeChild(container)
		} catch (e) {
			// ignore
		}
		container = null
		root = null
	}, 300)
}

export default showToast
