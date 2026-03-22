'use client'

import { useEffect, useRef } from 'react'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import type { WeddingConfig } from '@/types'
import { withBasePath } from '@/config/basePath'
import { parseWeddingDate, formatDotDate, formatTime } from '@/lib/weddingDate'
import Sparkles from '@/components/ui/Sparkles'

export default function IntroSection({ config }: { config: WeddingConfig }) {
	const dt = parseWeddingDate(config.datetime)
	const sectionRef = useRef<HTMLElement>(null)

	useEffect(() => {
		if (sectionRef.current && window.innerWidth < 1024) {
			sectionRef.current.style.height = `${window.innerHeight}px`
		}
	}, [])

	return (
		<section
			ref={sectionRef}
			id="intro"
			className="relative h-dvh w-full overflow-hidden lg:h-full lg:min-h-screen"
		>
			<ImageWithFallback
				src={withBasePath('/images/main.jpg')}
				alt="웨딩 사진"
				fill
				className="object-cover scale-120 brightness-110"
				sizes="(min-width: 1024px) 33vw, 100vw"
				priority
			/>
			<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
			<Sparkles />

			<div className="absolute inset-0 flex flex-col items-center justify-start pt-20 px-6 text-white lg:justify-start lg:pt-24">
				<p className="text-[4rem] mb-3 text-rose-300" style={{ fontFamily: "'Meow Script', cursive" }}>
					{config.labels.saveTheDate}
				</p>
				<h1 className="font-serif text-xl mb-3 tracking-wide">
					<span className="opacity-70">{config.groom.firstName}</span>
					<span className="mx-3 text-lg opacity-70">&</span>
					<span className="opacity-70">{config.bride.firstName}</span>
				</h1>
				<p className="text-m opacity-80 tracking-wider">
					{formatDotDate(dt)} {formatTime(dt, config.labels.locale)}
				</p>
				<p className="text-s opacity-60 mt-1">
					{config.venue.name} {config.venue.hall}
				</p>
			</div>

			{/* 모바일에서만 스크롤 화살표 - 하단 고정 */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 lg:hidden">
				<svg
					className="w-5 h-5 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={1.5}
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7" />
				</svg>
			</div>
		</section>
	)
}
