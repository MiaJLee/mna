import type { Locale } from '@/types'
import { weddingConfig } from '@/config/wedding'
import { weddingConfigEn } from '@/config/wedding.en'
import { withBasePath } from '@/config/basePath'

export type GameCopy = {
	invitationHref: string
	brideName: string
	groomName: string
	titleLine: string
	subtitleLine: string
	selectCharacter: string
	instructionJump: string
	instructionHearts: string
	tapToStart: string
	backToInvitation: string
	gameOver: string
	newHighScore: string
	finalScore: string
	statHearts: string
	statBest: string
	playAgain: string
	changeCharacter: string
	hudScore: string
	hudHearts: string
}

const KO: Omit<GameCopy, 'invitationHref' | 'brideName' | 'groomName'> = {
	titleLine: '웨딩 러너',
	subtitleLine: '픽셀 에디션',
	selectCharacter: '캐릭터 선택',
	instructionJump: '스페이스 / 탭 — 점프',
	instructionHearts: '하트를 모아보세요!',
	tapToStart: '게임시작',
	backToInvitation: '청첩장으로 돌아가기',
	gameOver: 'GAME OVER',
	newHighScore: '★ 신기록! ★',
	finalScore: '최종 점수',
	statHearts: '하트',
	statBest: '최고',
	playAgain: '다시하기',
	changeCharacter: '캐릭터 변경',
	hudScore: '점수',
	hudHearts: '하트',
}

const EN: Omit<GameCopy, 'invitationHref' | 'brideName' | 'groomName'> = {
	titleLine: 'Wedding Runner',
	subtitleLine: 'PIXEL EDITION',
	selectCharacter: 'Select Character',
	instructionJump: 'SPACE / TAP — Jump',
	instructionHearts: 'Collect hearts!',
	tapToStart: 'Tap to Start',
	backToInvitation: 'Back to Invitation',
	gameOver: 'GAME OVER',
	newHighScore: '★ NEW HIGH SCORE! ★',
	finalScore: 'FINAL SCORE',
	statHearts: 'HEARTS',
	statBest: 'BEST',
	playAgain: 'Play Again',
	changeCharacter: 'Change Character',
	hudScore: 'SCORE',
	hudHearts: 'HEARTS',
}

export function buildGameCopy(locale: Locale): GameCopy {
	const isEn = locale === 'en'
	const sp = new URLSearchParams()
	if (isEn) sp.set('lang', 'en')
	const q = sp.toString()
	const invitationHref = `${withBasePath('/')}${q ? `?${q}` : ''}`

	if (isEn) {
		return {
			...EN,
			invitationHref,
			brideName: weddingConfigEn.bride.firstName,
			groomName: weddingConfigEn.groom.firstName,
		}
	}

	return {
		...KO,
		invitationHref,
		brideName: weddingConfig.bride.firstName,
		groomName: weddingConfig.groom.firstName,
	}
}
