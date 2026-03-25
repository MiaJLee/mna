'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Locale } from '@/types'

/** Game2DCanvas `drawHeart`와 동일한 8×6 그리드 (#FF69B4 / #FF1493 / #FF9ECE) */
const HEART_PIXELS = [
	[0, 1, 1, 0, 0, 1, 1, 0],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[0, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 1, 1, 1, 1, 0, 0],
	[0, 0, 0, 1, 1, 0, 0, 0],
] as const

const CELL = 3
const GRID_W = 8 * CELL
const GRID_H = 6 * CELL

function PixelGameHeart({ size, className }: { size: number; className?: string }) {
	return (
		<svg
			width={size}
			height={(size * GRID_H) / GRID_W}
			viewBox={`0 0 ${GRID_W} ${GRID_H}`}
			className={className}
			aria-hidden
		>
			{HEART_PIXELS.flatMap((row, r) =>
				row.map((v, c) =>
					v ? (
						<rect
							key={`${r}-${c}`}
							x={c * CELL}
							y={r * CELL}
							width={CELL}
							height={CELL}
							fill={r < 2 && c < 4 ? '#FF69B4' : '#FF1493'}
						/>
					) : null,
				),
			)}
			<rect x={CELL} y={CELL} width={2} height={2} fill="#FF9ECE" />
		</svg>
	)
}

type Spot = { top: number; left: number; size: number }

function randomSpots(): Spot[] {
	const n = 2 + Math.floor(Math.random() * 2)
	const spots: Spot[] = []
	for (let i = 0; i < n; i++) {
		spots.push({
			top: 10 + Math.random() * 78,
			left: 8 + Math.random() * 84,
			size: 22 + Math.floor(Math.random() * 10),
		})
	}
	return spots
}

/**
 * 인트로 아래 본문 영역(relative 래퍼) 안에만 두세요.
 * `?type=game` 진입, 기존 쿼리(lang 등) 유지.
 */
export default function HiddenGameHeartEasterEggs({ locale }: { locale: Locale }) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [spots, setSpots] = useState<Spot[]>([])

	useEffect(() => {
		setSpots(randomSpots())
	}, [])

	const goGame = useCallback(() => {
		const next = new URLSearchParams(searchParams.toString())
		next.set('type', 'game')
		const path = pathname || '/'
		router.push(`${path}?${next.toString()}`)
	}, [pathname, router, searchParams])

	const ariaLabel =
		locale === 'en' ? 'Open the pixel mini game' : '픽셀 미니 게임으로 이동'

	if (spots.length === 0) return null

	return (
		<>
			<style>{`
				@keyframes hidden-game-heart-bob {
					0%, 100% { transform: translate(-50%, -50%) translateY(0); }
					50% { transform: translate(-50%, -50%) translateY(-4px); }
				}
			`}</style>
			{spots.map((spot, i) => (
				<button
					key={i}
					type="button"
					onClick={goGame}
					className="pointer-events-auto absolute z-[18] opacity-[0.38] transition-opacity duration-300 hover:opacity-95 focus:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
					style={{
						top: `${spot.top}%`,
						left: `${spot.left}%`,
						animation: 'hidden-game-heart-bob 2.8s ease-in-out infinite',
						animationDelay: `${i * 0.4}s`,
					}}
					aria-label={ariaLabel}
				>
					<PixelGameHeart size={spot.size} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]" />
				</button>
			))}
		</>
	)
}
