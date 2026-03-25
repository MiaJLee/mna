import { Fragment } from 'react'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import type { WeddingConfig, Person, Labels } from '@/types'
import { withBasePath } from '@/config/basePath'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

/** 설정 문자열의 `\n`을 실제 줄바꿈(`<br />`)으로 렌더 */
function BrText({ text }: { text?: string }) {
	if (text == null || text === '') return null
	const lines = text.split('\n')
	return (
		<>
			{lines.map((line, i) => (
				<Fragment key={i}>
					{i > 0 && <br />}
					{line}
				</Fragment>
			))}
		</>
	)
}

function ProfileCard({
	person,
	labels,
	delay,
}: {
	person: Person
	labels: Labels
	delay: number
}) {
	if (!person.childhoodPhoto) return null

	const hasProfileDetails =
		person.mbti || person.childhoodDream || (person.favoriteThings && person.favoriteThings.length > 0)

	return (
		<AnimateOnScroll delay={delay}>
			<div className="bg-warm-white rounded-2xl p-6 border border-beige/50">
				<div className="flex flex-row gap-4 items-start">
					<div className="relative shrink-0 w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden">
						<ImageWithFallback
							src={withBasePath(person.childhoodPhoto)}
							alt={`${person.name} 어린 시절`}
							fill
							className="object-cover scale-110"
							sizes="(max-width: 640px) 144px, 160px"
						/>
					</div>
					<div className="min-w-0 flex-1 text-left space-y-2 pt-0.5">
						<p className="text-base">
							<span className="text-sage-500 font-medium">{person.role}</span>
							<span className="text-brown-dark font-serif ml-2">{person.name}</span>
						</p>
						{(person.birthInfo || person.description) && (
							<p className="text-xs text-brown leading-relaxed">
								<BrText text={person.birthInfo} />
								{person.birthInfo && person.description && <br />}
								<BrText text={person.description} />
							</p>
						)}
					</div>
				</div>

				{hasProfileDetails && (
					<dl className="mt-5 flex flex-row items-start divide-x divide-beige/50 text-left border-t border-beige/60 pt-4">
						{person.mbti && (
							<div className="min-w-0 flex-1 pr-2 sm:pr-3">
								<dt className="text-[10px] sm:text-xs uppercase tracking-wider text-sage-500 font-medium">
									{labels.profileMbti}
								</dt>
								<dd className="text-xs sm:text-s text-brown-dark mt-0.5 break-words leading-snug">
									<BrText text={person.mbti} />
								</dd>
							</div>
						)}
						{person.childhoodDream && (
							<div className="min-w-0 flex-1 px-2 sm:px-3">
								<dt className="text-[10px] sm:text-xs uppercase tracking-wider text-sage-500 font-medium">
									{labels.profileChildhoodDream}
								</dt>
								<dd className="text-xs sm:text-s text-brown-dark mt-0.5 break-words leading-snug">
									<BrText text={person.childhoodDream} />
								</dd>
							</div>
						)}
						{person.favoriteThings && person.favoriteThings.length > 0 && (
							<div className="min-w-0 flex-1 pl-2 sm:pl-3">
								<dt className="text-[10px] sm:text-xs uppercase tracking-wider text-sage-500 font-medium">
									{labels.profileFavoriteThings}
								</dt>
								<dd className="text-xs sm:text-s text-brown-dark mt-0.5 break-words leading-snug">
									{person.favoriteThings.join(' · ')}
								</dd>
							</div>
						)}
					</dl>
				)}
			</div>
		</AnimateOnScroll>
	)
}

export default function AboutUsSection({ config }: { config: WeddingConfig }) {
	return (
		<section id="about-us" className="w-full max-w-[430px] mx-auto px-6 py-12">
			<AnimateOnScroll>
				<h2 className="font-serif text-xl text-brown-dark text-center mb-2">{config.labels.aboutUsTitle}</h2>
				<p className="text-s text-warm-gray text-center mb-8">{config.labels.aboutUsSubtitle}</p>
			</AnimateOnScroll>

			<div className="space-y-4">
				<ProfileCard person={config.groom} labels={config.labels} delay={100} />
				<ProfileCard person={config.bride} labels={config.labels} delay={200} />
			</div>
		</section>
	)
}
