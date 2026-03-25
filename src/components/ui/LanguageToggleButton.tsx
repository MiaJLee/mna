'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Labels } from '@/types'

/** 현재 URL에서 `lang` 쿼리만 토글 — 스타일은 `className`으로 지정 */
export default function LanguageToggleButton({
	labels,
	className = '',
}: {
	labels: Labels
	className?: string
}) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const isEn = labels.locale === 'en'

	const toggle = useCallback(() => {
		const next = new URLSearchParams(searchParams.toString())
		if (isEn) {
			next.delete('lang')
		} else {
			next.set('lang', 'en')
		}
		const q = next.toString()
		// usePathname()은 basePath 제외 — router.replace가 /mna를 다시 붙이므로 중복 방지
		const path = pathname || '/'
		router.replace(q ? `${path}?${q}` : path, { scroll: false })
	}, [isEn, pathname, router, searchParams])

	const label = isEn ? labels.languageSwitchToKo : labels.languageSwitchToEn
	const ariaLabel = isEn ? labels.languageSwitchToKoAria : labels.languageSwitchToEnAria

	return (
		<button
			type="button"
			onClick={toggle}
			className={`cursor-pointer ${className}`.trim()}
			aria-label={ariaLabel}
		>
			{label}
		</button>
	)
}
