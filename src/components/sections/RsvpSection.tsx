'use client'

import { useState, useCallback } from 'react'
import type { WeddingConfig } from '@/types'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import { submitRsvp, type RsvpFormData } from '@/lib/submitRsvp'
import { parseWeddingDate, formatDotDate, formatKoreanTime } from '@/lib/weddingDate'

const initialForm: RsvpFormData = {
	name: '',
	phone: '',
	attendance: 'yes',
}

export default function RsvpSection({ config }: { config: WeddingConfig }) {
	const [form, setForm] = useState<RsvpFormData>(initialForm)
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
	const [popupOpen, setPopupOpen] = useState(false)

	const dt = parseWeddingDate(config.datetime)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!form.name || !form.phone) return

		setStatus('loading')
		const result = await submitRsvp(form, config.googleScriptUrl)
		setStatus(result.success ? 'success' : 'error')
		if (result.success) {
			setForm(initialForm)
		}
	}

	const closePopup = useCallback(() => {
		setPopupOpen(false)
		if (status === 'error') setStatus('idle')
	}, [status])

	if (status === 'success' && !popupOpen) {
		return (
			<section id="rsvp" className="w-full max-w-[430px] mx-auto px-6 py-12">
				<div className="bg-warm-white rounded-2xl p-8 text-center border border-beige/50">
					<span className="text-3xl mb-4 block">💌</span>
					<p className="font-serif text-lg text-brown-dark mb-2">감사합니다</p>
					<p className="text-sm text-brown">참석 여부가 전달되었습니다.</p>
				</div>
			</section>
		)
	}

	return (
		<section id="rsvp" className="w-full max-w-[430px] mx-auto px-6 py-12">
			<AnimateOnScroll>
				<h2 className="font-serif text-xl text-brown-dark text-center mb-2">참석 여부</h2>
				<p className="text-xs text-warm-gray text-center mb-6">
					모든 분들을 소중히 모실 수 있도록 전해주세요
				</p>
			</AnimateOnScroll>

			{/* 장소 & 일시 */}
			<AnimateOnScroll delay={50}>
				<div className="bg-warm-white rounded-2xl p-5 border border-beige/50 mb-6">
					<p className="text-sm text-brown-dark font-medium mb-1">일시</p>
					<p className="text-sm text-brown mb-3">
						{formatDotDate(dt)} {formatKoreanTime(dt)}
					</p>
					<p className="text-sm text-brown-dark font-medium mb-1">장소</p>
					<p className="text-sm text-brown">
						{config.venue.name} {config.venue.hall}
					</p>
					<p className="text-xs text-warm-gray mt-1">{config.venue.address}</p>
				</div>
			</AnimateOnScroll>

			<AnimateOnScroll delay={100}>
				<button
					type="button"
					onClick={() => setPopupOpen(true)}
					className="w-full py-3.5 bg-sage-500 text-white text-sm rounded-xl hover:bg-sage-600 transition-colors"
				>
					참석의사 체크하기
				</button>
			</AnimateOnScroll>

			{/* 팝업: 제출 폼 */}
			{popupOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
					onClick={(e) => e.target === e.currentTarget && closePopup()}
				>
					<div
						className="bg-warm-white rounded-2xl border border-beige/50 w-full max-w-[380px] max-h-[90vh] overflow-y-auto shadow-xl"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="sticky top-0 bg-warm-white border-b border-beige/50 px-4 py-3 flex items-center justify-between rounded-t-2xl z-10">
							<h3 className="font-serif text-lg text-brown-dark">참석 여부 전달</h3>
							<button
								type="button"
								onClick={closePopup}
								className="w-8 h-8 flex items-center justify-center text-warm-gray hover:text-brown rounded-full"
								aria-label="닫기"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>

						<div className="p-4">
							{status === 'success' ? (
								<div className="py-8 text-center">
									<span className="text-3xl mb-4 block">💌</span>
									<p className="font-serif text-lg text-brown-dark mb-2">감사합니다</p>
									<p className="text-sm text-brown mb-6">참석 여부가 전달되었습니다.</p>
									<button
										type="button"
										onClick={closePopup}
										className="py-2.5 px-6 bg-sage-500 text-white text-sm rounded-xl hover:bg-sage-600"
									>
										닫기
									</button>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-4">
									<div>
										<label className="text-xs text-brown-dark font-medium mb-1 block">이름 *</label>
										<input
											type="text"
											required
											value={form.name}
											onChange={(e) => setForm({ ...form, name: e.target.value })}
											className="w-full bg-cream border border-beige rounded-xl px-4 py-3 text-sm text-brown-dark outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400"
											placeholder="성함을 입력해주세요"
										/>
									</div>

									<div>
										<label className="text-xs text-brown-dark font-medium mb-1 block">연락처 *</label>
										<input
											type="tel"
											required
											value={form.phone}
											onChange={(e) => setForm({ ...form, phone: e.target.value })}
											className="w-full bg-cream border border-beige rounded-xl px-4 py-3 text-sm text-brown-dark outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400"
											placeholder="동명이인 체크를 위한 핸드폰 번호 뒤 4자리"
										/>
									</div>

									<div>
										<label className="text-xs text-brown-dark font-medium mb-2 block">참석 여부 *</label>
										<div className="flex gap-3">
											{(['yes', 'no'] as const).map((val) => (
												<button
													key={val}
													type="button"
													onClick={() => setForm({ ...form, attendance: val })}
													className={`flex-1 py-3 rounded-xl text-sm transition-colors ${
														form.attendance === val
															? 'bg-sage-400 text-white'
															: 'bg-cream border border-beige text-brown'
													}`}
												>
													{val === 'yes' ? '참석할게요' : '참석이 어려워요'}
												</button>
											))}
										</div>
									</div>

									<button
										type="submit"
										disabled={status === 'loading'}
										className="w-full py-3.5 bg-sage-500 text-white text-sm rounded-xl hover:bg-sage-600 transition-colors disabled:opacity-50"
									>
										{status === 'loading' ? '전송 중...' : '전송하기'}
									</button>

									{status === 'error' && (
										<p className="text-xs text-red-500 text-center">
											전송에 실패했습니다. 다시 시도해주세요.
										</p>
									)}
								</form>
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
