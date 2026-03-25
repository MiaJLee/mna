'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { GameCopy } from './gameCopy'

const GameCopyContext = createContext<GameCopy | null>(null)

export function GameCopyProvider({ value, children }: { value: GameCopy; children: ReactNode }) {
	return <GameCopyContext.Provider value={value}>{children}</GameCopyContext.Provider>
}

export function useGameCopy(): GameCopy {
	const ctx = useContext(GameCopyContext)
	if (!ctx) {
		throw new Error('useGameCopy must be used within GameCopyProvider')
	}
	return ctx
}
