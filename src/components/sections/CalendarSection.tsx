'use client'

import { useMemo, useState, useEffect } from 'react'
import type { WeddingConfig } from '@/types'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import { parseWeddingDate, formatFull, formatCalendarHeader } from '@/lib/weddingDate'
import { getGoogleCalendarUrl } from '@/lib/generateIcs'

export default function CalendarSection({ config }: { config: WeddingConfig }) {
	const dt = useMemo(() => parseWeddingDate(config.datetime), [config.datetime])
	const year = dt.year
	const month = dt.month - 1 // 0-based for calendar grid calculation
	const weddingDay = dt.day

	const DAY_NAMES =
		config.labels.locale === 'en'
			? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
			: ['일', '월', '화', '수', '목', '금', '토']

	const daysInMonth = new Date(year, month + 1, 0).getDate()
	const firstDayOfWeek = new Date(year, month, 1).getDay()

	const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

	useEffect(() => {
		const target = dt.toMillis()
		const update = () => {
			const now = Date.now()
			const diff = Math.max(0, target - now)
			setCountdown({
				days: Math.floor(diff / (1000 * 60 * 60 * 24)),
				hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((diff / (1000 * 60)) % 60),
				seconds: Math.floor((diff / 1000) % 60),
			})
		}
		update()
		const timer = setInterval(update, 1000)
		return () => clearInterval(timer)
	}, [dt])

	const calendarDays = useMemo(() => {
		const days: (number | null)[] = []
		for (let i = 0; i < firstDayOfWeek; i++) days.push(null)
		for (let i = 1; i <= daysInMonth; i++) days.push(i)
		return days
	}, [firstDayOfWeek, daysInMonth])

	const googleCalUrl = useMemo(
		() => getGoogleCalendarUrl(config.datetime, config.venue.name, config.venue.address),
		[config.datetime, config.venue.name, config.venue.address],
	)

	return (
		<section id="calendar" className="w-full max-w-[430px] mx-auto px-6 py-12">
			<AnimateOnScroll>
				<h2 className="font-serif text-xl text-brown-dark text-center mb-8">
					{formatCalendarHeader(dt, config.labels.locale)}
				</h2>
			</AnimateOnScroll>

			<AnimateOnScroll delay={100}>
				<div className="bg-warm-white rounded-2xl p-6 border border-beige/50">
					<div className="grid grid-cols-7 gap-1 mb-3">
						{DAY_NAMES.map((name, i) => (
							<div
								key={name}
								className={`text-center text-xs font-medium py-1 ${
									i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-warm-gray'
								}`}
							>
								{name}
							</div>
						))}
					</div>

					<div className="grid grid-cols-7 gap-1">
						{calendarDays.map((day, idx) => {
							const isWeddingDay = day === weddingDay
							const dayOfWeek = idx % 7
							return (
								<div
									key={idx}
									className={`text-center py-2 text-sm rounded-full aspect-square flex items-center justify-center ${
										isWeddingDay
											? 'bg-sage-400 text-white font-bold'
											: day
												? dayOfWeek === 0
													? 'text-red-400'
													: dayOfWeek === 6
														? 'text-blue-400'
														: 'text-brown'
												: ''
									}`}
								>
									{day || ''}
								</div>
							)
						})}
					</div>

					<div className="mt-6 text-center">
						<p className="text-sm text-brown mb-3">{formatFull(dt, config.labels.locale)}</p>
						<div className="flex justify-center gap-3">
							{[
								{ value: countdown.days, label: config.labels.countdownLabels.days },
								{ value: countdown.hours, label: config.labels.countdownLabels.hours },
								{ value: countdown.minutes, label: config.labels.countdownLabels.min },
								{ value: countdown.seconds, label: config.labels.countdownLabels.sec },
							].map((item) => (
								<div key={item.label} className="flex flex-col items-center">
									<span className="text-2xl font-serif text-sage-600 tabular-nums w-12 text-center">
										{String(item.value).padStart(2, '0')}
									</span>
									<span className="text-[10px] text-warm-gray mt-1">{item.label}</span>
								</div>
							))}
						</div>
					</div>

					<a
						href={googleCalUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-5 block w-full py-3 bg-sage-100 text-sage-700 text-sm rounded-xl hover:bg-sage-200 transition-colors text-center"
					>
						{config.labels.googleCalendar}
					</a>
				</div>
			</AnimateOnScroll>
		</section>
	)
}
