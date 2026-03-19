import Image from 'next/image'
import type { WeddingConfig, Person } from '@/types'
import { withBasePath } from '@/config/basePath'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

function ProfileCard({ person, delay }: { person: Person; delay: number }) {
	if (!person.childhoodPhoto) return null

	return (
		<AnimateOnScroll delay={delay}>
			<div className="bg-warm-white rounded-2xl p-6 border border-beige/50">
				<div className="flex justify-center mb-4">
					<div className="relative w-72 h-72 rounded-xl overflow-hidden">
						<Image
							src={withBasePath(person.childhoodPhoto)}
							alt={`${person.name} 어린 시절`}
							fill
							className="object-cover scale-110"
							sizes="224px"
						/>
					</div>
				</div>

				<div className="text-center space-y-2">
					<p className="text-base">
						<span className="text-sage-500 font-medium">{person.role}</span>
						<span className="text-brown-dark font-serif ml-2">{person.name}</span>
					</p>
					{person.birthInfo && (
						<p className="text-xs text-brown">
							{person.birthInfo}
							<br />
							{person.description}
						</p>
					)}
				</div>
			</div>
		</AnimateOnScroll>
	)
}

export default function AboutUsSection({ config }: { config: WeddingConfig }) {
	return (
		<section id="about-us" className="w-full max-w-[430px] mx-auto px-6 py-12">
			<AnimateOnScroll>
				<h2 className="font-serif text-xl text-brown-dark text-center mb-2">ABOUT US</h2>
				<p className="text-s text-warm-gray text-center mb-8">하나로 이어진 두개의 우주</p>
			</AnimateOnScroll>

			<div className="space-y-4">
				<ProfileCard person={config.groom} delay={100} />
				<ProfileCard person={config.bride} delay={200} />
			</div>
		</section>
	)
}
