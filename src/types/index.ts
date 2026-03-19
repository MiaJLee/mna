export interface Person {
	role: string
	name: string
	lastName: string
	firstName: string
	fatherName: string
	motherName: string
	relation: string
	childhoodPhoto?: string
	birthInfo?: string
	description?: string
}

export interface WeddingVenue {
	name: string
	hall: string
	address: string
	tel: string
}

export interface BankAccount {
	role: string
	bank: string
	accountNumber: string
	holder: string
	kakaoPayUrl?: string
}

export interface AccountGroup {
	side: 'groom' | 'bride'
	label: string
	accounts: BankAccount[]
}

export interface TransportInfo {
	type: 'subway' | 'bus' | 'car' | 'parking'
	title: string
	details: string[]
}

export interface InterviewQA {
	question: string
	answer: string
	answeredBy: 'groom' | 'bride' | 'both'
}

export interface GalleryImage {
	src: string
	alt: string
}

export interface NavigationLink {
	name: string
	url: string
}

export interface TimelineEvent {
	date: string
	title: string
	description: string
	image?: string
}

export interface WeddingConfig {
	groom: Person
	bride: Person

	datetime: string
	venue: WeddingVenue
	navigationLinks: NavigationLink[]

	greeting: string
	flowerDeclineMessage: string

	timeline: TimelineEvent[]
	gallery: GalleryImage[]
	interview: InterviewQA[]
	transport: TransportInfo[]
	accountGroups: AccountGroup[]

	kakaoJsKey: string

	googleScriptUrl: string

	ogImage: string
	siteUrl: string
	coupleNameShort: string
}
