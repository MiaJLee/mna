'use client'

import { useEffect, useState, useCallback } from 'react'
import type { WeddingConfig } from '@/types'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import Toast from '@/components/ui/Toast'
import { initKakao, shareKakao } from '@/lib/kakao'
import { parseWeddingDate, formatFull, formatShort } from '@/lib/weddingDate'

export default function ShareSection({ config }: { config: WeddingConfig }) {
	const [showToast, setShowToast] = useState(false)

	useEffect(() => {
		if (config.kakaoJsKey && config.kakaoJsKey !== 'PLACEHOLDER_KAKAO_JS_KEY') {
			initKakao(config.kakaoJsKey)
		}
	}, [config.kakaoJsKey])

	const handleKakaoShare = () => {
		shareKakao({
			title: config.labels.locale === 'en'
				? `Save the Date\n${config.bride.firstName} ♥ ${config.groom.firstName}`
				: `${config.bride.firstName} ♥ ${config.groom.firstName} ${config.labels.shareMarrying}`,
			description:
				formatShort(parseWeddingDate(config.datetime), config.labels.locale) +
				'\n' +
				config.venue.name +
				' ' +
				config.venue.hall,
			imageUrl: config.siteUrl + config.ogImage,
			webUrl: config.labels.locale === 'en' ? config.siteUrl + '?lang=en' : config.siteUrl,
			buttonLabel: config.labels.locale === 'en' ? 'View Invitation' : '모바일 청첩장 보기',
		})
	}

	const shareUrl = config.labels.locale === 'en' ? config.siteUrl + '?lang=en' : config.siteUrl

	const handleCopyUrl = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(shareUrl)
		} catch {
			const textarea = document.createElement('textarea')
			textarea.value = shareUrl
			textarea.style.position = 'fixed'
			textarea.style.opacity = '0'
			document.body.appendChild(textarea)
			textarea.select()
			document.execCommand('copy')
			document.body.removeChild(textarea)
		}
		setShowToast(true)
	}, [shareUrl])

	const handleNativeShare = async () => {
		const shareData = {
			title: `${config.groom.name} ♥ ${config.bride.name} ${config.labels.shareInvite}`,
			text:
				formatFull(parseWeddingDate(config.datetime), config.labels.locale) +
				' | ' +
				config.venue.name,
			url: shareUrl,
		}

		// 1) 네이티브 공유(Web Share API) 우선
		if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare?.(shareData)) {
			try {
				await navigator.share(shareData)
				return
			} catch (err: unknown) {
				// 사용자가 시트를 닫은 경우에는 fallback 하지 않음
				const name = err && typeof err === 'object' && 'name' in err ? String((err as { name: string }).name) : ''
				if (name === 'AbortError') return
				// 그 외 실패 → 아래 fallback
			}
		}

		// 2) 네이티브 공유 불가·실패 시: 카카오톡 인앱이면 카카오 공유
		if (typeof navigator !== 'undefined' && /KAKAOTALK/i.test(navigator.userAgent)) {
			handleKakaoShare()
			return
		}

		// 3) Fallback: URL 복사
		try {
			await navigator.clipboard.writeText(shareUrl)
		} catch {
			const textarea = document.createElement('textarea')
			textarea.value = shareUrl
			textarea.style.position = 'fixed'
			textarea.style.opacity = '0'
			document.body.appendChild(textarea)
			textarea.select()
			document.execCommand('copy')
			document.body.removeChild(textarea)
		}
		setShowToast(true)
	}

	return (
		<section id="share" className="w-full max-w-[430px] mx-auto px-6 py-12 pb-20">
			<AnimateOnScroll>
				<h2 className="font-serif text-xl text-brown-dark text-center mb-8">
					{config.labels.shareTitle}
				</h2>

				<div className="flex justify-center gap-4">
					<button onClick={handleKakaoShare} className="flex flex-col items-center gap-2">
						<div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
							<svg
								width="28"
								height="28"
								viewBox="0 0 28 28"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="text-yellow-700"
							>
								<path
									d="M14 4C8.477 4 4 7.582 4 12c0 2.87 1.89 5.39 4.726 6.836-.15.53-.54 1.92-.62 2.22-.1.37.136.365.286.265.118-.078 1.88-1.278 2.644-1.8.94.148 1.94.227 2.964.227 5.523 0 10-3.582 10-8S19.523 4 14 4z"
									fill="currentColor"
								/>
							</svg>
						</div>
						<span className="text-xs text-brown">{config.labels.shareKakao}</span>
					</button>

					<button onClick={handleCopyUrl} className="flex flex-col items-center gap-2">
						<div className="w-14 h-14 bg-sage-100 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
							<svg
								width="26"
								height="26"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="text-sage-600"
							>
								<path
									d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.102 1.101"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<span className="text-xs text-brown">{config.labels.shareUrl}</span>
					</button>

					<button onClick={handleNativeShare} className="flex flex-col items-center gap-2">
						<div className="w-14 h-14 bg-ivory rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-beige/50">
							<svg
								width="26"
								height="26"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="text-brown"
							>
								<path
									d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<polyline
									points="16 6 12 2 8 6"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<line
									x1="12"
									y1="2"
									x2="12"
									y2="15"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
								/>
							</svg>
						</div>
						<span className="text-xs text-brown">{config.labels.shareNative}</span>
					</button>
				</div>

				<div className="mt-16 text-center">
					<p className="text-xs text-warm-gray">{config.coupleNameShort}</p>
				</div>
			</AnimateOnScroll>

			<Toast
				message={config.labels.shareCopied}
				isVisible={showToast}
				onClose={() => setShowToast(false)}
			/>
		</section>
	)
}
