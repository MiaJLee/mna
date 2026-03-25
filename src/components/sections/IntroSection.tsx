'use client'

import { useEffect, useRef } from 'react'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import LanguageToggleButton from '@/components/ui/LanguageToggleButton'
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
			className="relative h-dvh w-full overflow-x-visible overflow-y-hidden lg:h-full lg:min-h-screen lg:overflow-y-visible"
		>
			<div className="absolute inset-0 z-0 overflow-hidden">
				<ImageWithFallback
					src={withBasePath('/images/gallery/web/gallery_01.webp')}
					alt="웨딩 사진"
					fill
					className="object-cover scale-120 brightness-110"
					sizes="(min-width: 1024px) 33vw, 100vw"
					priority
				/>
			</div>
			<div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/38 via-black/12 to-transparent pointer-events-none" />
			<div className="absolute inset-0 z-[1] pointer-events-none">
				<Sparkles />
			</div>

			<div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-20 px-6 text-white lg:justify-start lg:pt-24 overflow-visible">
				{/* 줄바꿈 없음 · 항상 한 줄 가운데 · 좁은 화면에서는 좌우로 넘침 */}
				<div className="w-full flex justify-center overflow-visible shrink-0">
					<p
						className="mb-10 text-rose-300 whitespace-nowrap text-center text-[3.5rem] leading-none"
						style={{ fontFamily: 'var(--font-valentine), cursive' }}
					>
						{config.labels.saveTheDate}
					</p>
				</div>
				<h1 className="font-serif text-xl mb-1 tracking-wide">
					<span className="opacity-70">{config.groom.firstName}</span>
					<span className="mx-3 text-lg opacity-70">&</span>
					<span className="opacity-70 ml-[-2px]">{config.bride.firstName}</span>
				</h1>
				<p className="text-s opacity-80 tracking-wider">
					{formatDotDate(dt)} {formatTime(dt, config.labels.locale)}
				</p>
				<p className="text-xs opacity-60 mt-1">
					{config.venue.name} {config.venue.hall}
				</p>
			</div>

			{/* 한/영: 인트로 하단 우측 */}
			<div className="absolute bottom-8 right-4 z-20 lg:bottom-10 lg:right-6">
				<LanguageToggleButton
					labels={config.labels}
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-transparent text-xs font-semibold text-white opacity-70 transition-opacity transition-colors hover:opacity-100 hover:bg-white/10"
				/>
			</div>

			{/* 모바일만 스크롤 화살표 — 하단 중앙 */}
			<div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce opacity-50 lg:hidden">
				<svg
					className="h-5 w-5 text-white"
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
