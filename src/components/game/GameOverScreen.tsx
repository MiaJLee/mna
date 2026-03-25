'use client'

import { useGameState } from './hooks/useGameState'
import { useGameCopy } from './GameCopyContext'

export default function GameOverScreen() {
	const { state, restart, goSelect } = useGameState()
	const copy = useGameCopy()
	const isNewHighScore = state.score >= state.highScore && state.score > 0

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'rgba(26, 26, 46, 0.92)',
				fontFamily: "'Courier New', Courier, monospace",
				zIndex: 10,
			}}
		>
			<div
				style={{
					textAlign: 'center',
					padding: '32px 24px',
					maxWidth: 300,
					width: '100%',
				}}
			>
				{/* Game Over title */}
				<div
					style={{
						color: '#FF69B4',
						fontSize: 28,
						fontWeight: 'bold',
						letterSpacing: '0.25em',
						marginBottom: 8,
						textShadow: '0 0 16px rgba(255,105,180,0.4)',
					}}
				>
					{copy.gameOver}
				</div>

				{isNewHighScore && (
					<div
						style={{
							color: '#FFD700',
							fontSize: 12,
							letterSpacing: '0.3em',
							marginBottom: 8,
							animation: 'newHighBounce 0.6s ease infinite alternate',
						}}
					>
						{copy.newHighScore}
					</div>
				)}

				{/* Divider */}
				<div
					style={{
						borderTop: '2px solid rgba(255,182,193,0.2)',
						margin: '16px 0',
					}}
				/>

				{/* Score */}
				<div style={{ marginBottom: 20 }}>
					<div
						style={{
							color: 'rgba(255,255,255,0.4)',
							fontSize: 10,
							letterSpacing: '0.3em',
							marginBottom: 4,
						}}
					>
						{copy.finalScore}
					</div>
					<div
						style={{
							color: '#FFFFFF',
							fontSize: 36,
							fontWeight: 'bold',
						}}
					>
						{state.score.toLocaleString()}
					</div>
				</div>

				{/* Stats */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						gap: 32,
						marginBottom: 24,
					}}
				>
					<div>
						<div
							style={{
								color: 'rgba(255,255,255,0.4)',
								fontSize: 9,
								letterSpacing: '0.2em',
							}}
						>
							{copy.statHearts}
						</div>
						<div style={{ color: '#FF69B4', fontSize: 16 }}>&#9829; {state.hearts}</div>
					</div>
					<div>
						<div
							style={{
								color: 'rgba(255,255,255,0.4)',
								fontSize: 9,
								letterSpacing: '0.2em',
							}}
						>
							{copy.statBest}
						</div>
						<div style={{ color: '#FFD700', fontSize: 16 }}>{state.highScore.toLocaleString()}</div>
					</div>
				</div>

				{/* Buttons */}
				<button
					onClick={restart}
					style={{
						display: 'block',
						width: '100%',
						background: '#FF69B4',
						border: 'none',
						color: '#FFFFFF',
						padding: '12px 0',
						fontSize: 13,
						fontFamily: "'Courier New', Courier, monospace",
						letterSpacing: '0.3em',
						cursor: 'pointer',
						marginBottom: 12,
						textTransform: 'uppercase',
					}}
				>
					{copy.playAgain}
				</button>

				<button
					onClick={goSelect}
					style={{
						display: 'block',
						width: '100%',
						background: 'transparent',
						border: '1px solid rgba(255,255,255,0.2)',
						color: 'rgba(255,255,255,0.5)',
						padding: '10px 0',
						fontSize: 11,
						fontFamily: "'Courier New', Courier, monospace",
						letterSpacing: '0.2em',
						cursor: 'pointer',
						marginBottom: 12,
					}}
				>
					{copy.changeCharacter}
				</button>

				<a
					href={copy.invitationHref}
					style={{
						display: 'block',
						width: '100%',
						border: '1px solid rgba(255,255,255,0.2)',
						color: 'rgba(255,255,255,0.5)',
						padding: '10px 0',
						fontSize: 11,
						textDecoration: 'none',
						letterSpacing: '0.2em',
						textAlign: 'center',
					}}
				>
					{copy.backToInvitation}
				</a>
			</div>

			<style>{`
        @keyframes newHighBounce {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
		</div>
	)
}
