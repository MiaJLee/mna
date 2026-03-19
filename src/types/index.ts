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
	type: 'metro' | 'bus' | 'car' | 'parking'
	title: string
	details: string[]
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
	/** true면 date 대신 연애기간 N일(시작일 기준) 표시 */
	useRelationshipDays?: boolean
}

export type Locale = 'ko' | 'en'

export interface Labels {
	// 공통
	locale: Locale
	copyButton: string
	copyDone: string
	close: string

	// 인트로
	saveTheDate: string

	// 인사말
	greetingTitle: string

	// 예식안내
	weddingInfoTitle: string
	copyAddress: string

	// 소개
	aboutUsTitle: string
	aboutUsSubtitle: string

	// 타임라인
	timelineTitle: string
	timelineSubtitle: string
	relationshipDaysLabel: (days: number) => string

	// 캘린더
	countdownLabels: { days: string; hours: string; min: string; sec: string }
	googleCalendar: string
	appleCalendar: string

	// 갤러리
	galleryTitle: string

	// 오시는 길
	transportTitle: string

	// 축의금
	accountTitle: string
	accountSubtitle: string
	accountCopy: string
	accountSend: string

	// 참석여부
	rsvpTitle: string
	rsvpSubtitle: string
	rsvpThankYou: string
	rsvpConfirmed: string
	rsvpNameLabel: string
	rsvpNamePlaceholder: string
	rsvpPhoneLabel: string
	rsvpPhonePlaceholder: string
	rsvpAttendanceLabel: string
	rsvpAttend: string
	rsvpDecline: string
	rsvpSubmitting: string
	rsvpSubmit: string
	rsvpError: string

	// 공유
	shareTitle: string
	shareKakao: string
	shareUrl: string
	shareNative: string
	shareCopied: string
	shareMarrying: string
	shareInvite: string

	// ScrollIndicator
	nav: {
		greeting: string
		weddingInfo: string
		aboutUs: string
		timeline: string
		calendar: string
		gallery: string
		transport: string
		account: string
		rsvp: string
		share: string
	}
}

export interface WeddingConfig {
	groom: Person
	bride: Person

	datetime: string
	venue: WeddingVenue
	/** 연애 시작일 (datetime과 동일 ISO 형식), 해당일 = 1일로 계산 */
	relationshipStartDate?: string
	navigationLinks: NavigationLink[]

	greeting: string
	flowerDeclineMessage: string

	timeline: TimelineEvent[]
	gallery: GalleryImage[]
	transport: TransportInfo[]
	accountGroups: AccountGroup[]

	kakaoJsKey: string

	googleScriptUrl: string

	labels: Labels

	/** 섹션 표시 여부 */
	showAccount?: boolean
	showFlowerDecline?: boolean

	/** 영문용 Google Maps embed URL (설정 시 카카오맵 대신 표시) */
	googleMapsEmbedUrl?: string

	ogImage: string
	siteUrl: string
	coupleNameShort: string
}
