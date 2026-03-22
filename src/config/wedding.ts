import type { WeddingConfig } from '@/types'
import { labelsKo } from './labels.ko'

export const weddingConfig: WeddingConfig = {
	labels: labelsKo,
	// ── 신랑 신부 정보 ──────────────────────────────
	groom: {
		role: '신랑',
		name: '박종혁',
		lastName: '박',
		firstName: '종혁',
		fatherName: '박상배',
		motherName: '장미영',
		relation: '의 장남',
		childhoodPhoto: '/images/groom-baby.jpeg',
		birthInfo: '1996년 2월 서울 출생',
		description: '감성파 과학소년 🧪',
	},
	bride: {
		role: '신부',
		name: '이지형',
		lastName: '이',
		firstName: '지형',
		fatherName: '이근재',
		motherName: '이미승',
		relation: '의 장녀',
		childhoodPhoto: '/images/bride-baby.jpg',
		birthInfo: '1995년 8월 부산 출생',
		description: '호기심 많은 장난꾸러기 🎈',
	},

	// ── 예식 정보 ──────────────────────────────────
	datetime: '2026-10-31T11:00:00',
	relationshipStartDate: '2023-02-22T00:00:00',
	venue: {
		name: '성균관컨벤션웨딩홀',
		hall: '3층 스토리홀',
		address: '서울시 종로구 성균관로 31',
		tel: '02-744-0677',
	},
	navigationLinks: [
		{
			name: '카카오맵',
			url: 'https://map.kakao.com/link/to/성균관컨벤션웨딩홀,37.5854,126.9967',
		},
		{
			name: '네이버지도',
			url: 'https://map.naver.com/v5/search/성균관컨벤션웨딩홀',
		},
	],

	// ── 인사말 ──────────────────────────────────────
	greeting: `서로가 마주보며 다져온 사랑을
이제 함께 한 곳을 바라보며
걸어가고자 합니다.

저희 두 사람이 사랑의 이름으로
지켜나갈 수 있게
축복해 주시면 감사하겠습니다.`,

	// ── 화환 사양 ──────────────────────────────────
	flowerDeclineMessage:
		'축하의 마음만 감사히 받겠습니다.\n화환 대신 따뜻한 마음을 전해주시면\n더없이 행복하겠습니다.',

	// ── 타임라인 ────────────────────────────────────
	timeline: [
		{
			date: '23년 2월, 보정동',
			title: '☕ 운명 같은 첫 인연',
			description: '서로 애정하던 카페에서\n첫눈에 반한 우리',
			image: '/images/timeline/first-meet.jpg',
		},
		{
			date: '',
			title: '💕 행복했던 3년 반',
			description: '항상 대화와 웃음이 머물던\n여러 계절들의 우리',
			image: '/images/timeline/dating.jpg',
			useRelationshipDays: true,
		},
		{
			date: '첫 데이트 장소에서',
			title: '💍 프로포즈',
			description: '준비는 오래, 대답은 짧게.\n"YES!"',
			image: '/images/timeline/propose.jpg',
		},
		{
			date: '26년 10월 31일, 서울',
			title: '👰🤵 웨딩데이',
			description: '이제는 둘이 아닌\n하나로 걸어 시작하는 날',
			image: '/images/timeline/wedding.jpg',
		},
	],

	// ── 갤러리 ──────────────────────────────────────
	gallery: [
		{ src: '/images/gallery/gallery_01.jpg', alt: '웨딩 사진 1' },
		{ src: '/images/gallery/gallery_02.jpg', alt: '웨딩 사진 2' },
		{ src: '/images/gallery/gallery_03.jpg', alt: '웨딩 사진 3' },
		{ src: '/images/gallery/gallery_04.jpg', alt: '웨딩 사진 4' },
		{ src: '/images/gallery/gallery_05.jpg', alt: '웨딩 사진 5' },
		{ src: '/images/gallery/gallery_06.jpg', alt: '웨딩 사진 6' },
		{ src: '/images/gallery/gallery_07.jpg', alt: '웨딩 사진 7' },
		{ src: '/images/gallery/gallery_08.jpg', alt: '웨딩 사진 8' },
		{ src: '/images/gallery/gallery_09.jpg', alt: '웨딩 사진 9' },
		{ src: '/images/gallery/gallery_10.jpg', alt: '웨딩 사진 10' },
		{ src: '/images/gallery/gallery_11.jpg', alt: '웨딩 사진 11' },
		{ src: '/images/gallery/gallery_12.jpg', alt: '웨딩 사진 12' },
	],

	// ── 교통 안내 ──────────────────────────────────
	transport: [
		{
			type: 'metro',
			title: '지하철',
			details: [
				'4호선 혜화역 하차 ④번출구',
				'④번 출구 베스킨라빈스 앞 셔틀버스 수시운행',
				'마을버스 7번 (혜화역 ①번출구 · 성대정문 앞 하차)',
				'도보 이용시 10분거리',
			],
		},
		{
			type: 'bus',
			title: '버스',
			details: [
				'명륜3가, 성대입구 하차',
				'간선버스: 102, 104, 106, 107, 108, 109, 140, 143, 149, 150, 151, 160, 171, 172, 272, 301, 601',
				'지선버스: 2112 / 공항버스: 6011 / 마을버스: 7',
			],
		},
		{
			type: 'car',
			title: '네비게이션',
			details: ['"성균관대학교" 또는 "성균관" 입력'],
		},
		{
			type: 'parking',
			title: '주차 안내',
			details: [
				'성균관대학교 정문 안 제1주차장 또는 성균관대 주차장',
				'주차요원의 안내를 받으세요',
				'주차 차량은 비상등을 켜주세요',
			],
		},
	],

	// ── 계좌 정보 ──────────────────────────────────
	accountGroups: [
		{
			side: 'groom',
			label: '신랑측',
			accounts: [
				{
					role: '신랑',
					bank: '국민은행',
					accountNumber: '123-456-789012',
					holder: '박종혁',
					kakaoPayUrl: 'https://link.kakaopay.com/__/8ZccKtD',
				},
				{
					role: '신랑 아버지',
					bank: '신한은행',
					accountNumber: '110-123-456789',
					holder: '박상배',
				},
				{
					role: '신랑 어머니',
					bank: '우리은행',
					accountNumber: '1002-123-456789',
					holder: '장미영',
				},
			],
		},
		{
			side: 'bride',
			label: '신부측',
			accounts: [
				{
					role: '신부',
					bank: '카카오뱅크',
					accountNumber: '3333-12-3456789',
					holder: '이지형',
					kakaoPayUrl: 'https://link.kakaopay.com/__/tui-OtJ',
				},
				{
					role: '신부 아버지',
					bank: '하나은행',
					accountNumber: '123-456789-12345',
					holder: '이근재',
				},
				{
					role: '신부 어머니',
					bank: '농협',
					accountNumber: '302-1234-5678-91',
					holder: '이미승',
				},
			],
		},
	],

	// ── 카카오 API ──────────────────────────────────
	kakaoJsKey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? '',

	// ── RSVP (Google Forms) ──────────────────
	googleScriptUrl:
		'https://docs.google.com/forms/d/e/1FAIpQLSdBkOa9oxfooMzLHIOll-bRI5mIzFYHYiDob8WYTIQhg7ICLg/formResponse',

	// ── 공유 설정 ──────────────────────────────────
	ogImage: '/images/main-og.jpg',
	siteUrl: 'https://miajlee.github.io/mna',
	coupleNameShort: '지형 ♥ 종혁',
}
