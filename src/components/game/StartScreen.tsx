'use client'

import { useGameState } from './hooks/useGameState'
import { weddingConfig } from '@/config/wedding'

export default function StartScreen() {
	const { startGame } = useGameState()

	return (
		<div
			className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm"
			onClick={startGame}
			onTouchEnd={(e) => {
				e.preventDefault()
				startGame()
			}}
		>
			<div className="text-center px-6">
				<p className="text-pink-200 text-sm tracking-[0.3em] mb-3">WEDDING RUNNER</p>
				<h1 className="text-white font-serif text-3xl md:text-4xl mb-2">
					{weddingConfig.groom.name} & {weddingConfig.bride.name}
				</h1>
				<p className="text-pink-100/80 text-xs mb-10">Wedding Run Game</p>

				<div className="bg-white/15 backdrop-blur-md rounded-2xl px-8 py-6 mb-8 max-w-[280px] mx-auto">
					<p className="text-white/90 text-sm mb-3 font-medium">How to Play</p>
					<div className="space-y-2 text-white/70 text-xs">
						<p>
							<span className="inline-block w-4 text-center mr-2">←→</span>
							좌우 이동 (스와이프)
						</p>
						<p>
							<span className="inline-block w-4 text-center mr-2">↑</span>
							점프 (탭 / 스페이스)
						</p>
						<p>
							<span className="inline-block w-4 text-center mr-2">♥</span>
							하트를 모아 점수 UP
						</p>
					</div>
				</div>

				<button
					className="bg-pink-400/80 hover:bg-pink-500/90 text-white px-10 py-3.5 rounded-full text-sm tracking-wider transition-all animate-pulse shadow-lg shadow-pink-500/20"
					onClick={(e) => {
						e.stopPropagation()
						startGame()
					}}
				>
					TAP TO START
				</button>

				<p className="text-white/30 text-[10px] mt-8">
					<a href="/" className="underline hover:text-white/50" onClick={(e) => e.stopPropagation()}>
						← Back to Invitation
					</a>
				</p>
			</div>
		</div>
	)
}
