'use client'

import { useEffect, useState, useCallback } from 'react'

export default function ScrollToTopButton({ scrollContainerId }: { scrollContainerId?: string }) {
	const [visible, setVisible] = useState(false)

	const getScrollSource = useCallback(() => {
		if (scrollContainerId) return document.getElementById(scrollContainerId)
		return null
	}, [scrollContainerId])

	useEffect(() => {
		const handleScroll = () => {
			const container = getScrollSource()
			const scrollTop = container ? container.scrollTop : window.scrollY
			setVisible(scrollTop > 400)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		const container = getScrollSource()
		container?.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleScroll)
			container?.removeEventListener('scroll', handleScroll)
		}
	}, [getScrollSource])

	const scrollToTop = () => {
		const container = getScrollSource()
		if (container) {
			container.scrollTo({ top: 0, behavior: 'smooth' })
		} else {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	return (
		<button
			onClick={scrollToTop}
			className={`fixed bottom-6 right-4 z-50 w-10 h-10 rounded-full bg-sage-400/80 backdrop-blur-sm text-white shadow-lg transition-all duration-300 flex items-center justify-center ${
				visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
			}`}
			aria-label="맨 위로 스크롤"
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
				<path d="M8 14V3" />
				<path d="M3 7L8 2L13 7" />
			</svg>
		</button>
	)
}
