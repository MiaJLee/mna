'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import type { GalleryImage } from '@/types'
import { withBasePath } from '@/config/basePath'

interface LightboxProps {
	images: GalleryImage[]
	currentIndex: number
	onClose: () => void
}

export default function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		startIndex: currentIndex,
		loop: true,
		dragFree: false,
	})

	const [index, setIndex] = useState(currentIndex)
	const [showIndicator, setShowIndicator] = useState(true)
	const indicatorTimer = useRef<ReturnType<typeof setTimeout>>(null)

	const flashIndicator = useCallback(() => {
		setShowIndicator(true)
		if (indicatorTimer.current) clearTimeout(indicatorTimer.current)
		indicatorTimer.current = setTimeout(() => setShowIndicator(false), 1000)
	}, [])

	// 초기 2초 후 숨김
	useEffect(() => {
		indicatorTimer.current = setTimeout(() => setShowIndicator(false), 1000)
		return () => {
			if (indicatorTimer.current) clearTimeout(indicatorTimer.current)
		}
	}, [])

	useEffect(() => {
		if (!emblaApi) return
		const onSelect = () => {
			setIndex(emblaApi.selectedScrollSnap())
			flashIndicator()
		}
		emblaApi.on('select', onSelect)
		return () => {
			emblaApi.off('select', onSelect)
		}
	}, [emblaApi])

	const goNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
	const goPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') goNext()
			else if (e.key === 'ArrowLeft') goPrev()
			else if (e.key === 'Escape') onClose()
		}

		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [goNext, goPrev, onClose])

	return (
		<div
			className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose()
			}}
			onContextMenu={(e) => e.preventDefault()}
		>
			{/* 닫기 */}
			<button
				type="button"
				onClick={onClose}
				className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white"
				aria-label="Close"
			>
				<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			{/* 이전 */}
			<button
				type="button"
				onClick={goPrev}
				className="absolute left-2 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
				aria-label="Previous"
			>
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			{/* Embla 캐러셀 */}
			<div ref={emblaRef} className="w-full h-full overflow-hidden">
				<div className="flex h-full">
					{images.map((img, i) => (
						<div key={i} className="flex-[0_0_100%] min-w-0 flex items-center justify-center p-4">
							<div className="relative w-full h-full">
								<ImageWithFallback
									src={withBasePath(img.src)}
									alt={img.alt}
									fill
									className="object-contain select-none pointer-events-none"
									sizes="100vw"
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* 다음 */}
			<button
				type="button"
				onClick={goNext}
				className="absolute right-2 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
				aria-label="Next"
			>
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>

			{/* 페이지 인디케이터 */}
			<div
				className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm transition-opacity duration-500 ${showIndicator ? 'opacity-100' : 'opacity-0'}`}
			>
				{index + 1} / {images.length}
			</div>
		</div>
	)
}
