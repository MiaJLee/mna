import type { WeddingConfig } from '@/types'

export const weddingConfig: WeddingConfig = {
	// ── 신랑 신부 정보 ──────────────────────────────
	groom: {
		role: '신랑',
		name: '박종혁',
		lastName: '박',
		firstName: '종혁',
		fatherName: '박상배',
		motherName: '김미영',
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
	venue: {
		name: '성균관컨벤션웨딩홀',
		hall: '3층 스토리홀',
		address: '서울시 종로구 성균관로 31',
		tel: '02-744-0677',
	},
	navigationLinks: [
		{
			name: '카카오내비',
			url: 'https://map.kakao.com/link/to/성균관컨벤션웨딩홀,37.5752,126.9771',
		},
		{
			name: '네이버지도',
			url: 'https://map.naver.com/v5/search/더채플앳청담',
		},
		{
			name: '티맵',
			url: 'https://apis.openapi.sk.com/tmap/app/routes?appKey=PLACEHOLDER&goalx=127.0448&goaly=37.524&goalname=더채플앳청담',
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
			date: '22년 3월, 서울',
			title: '☕ 운명 같은 첫 인연',
			description: '서로 애정하던 카페에서\n첫눈에 반한 우리',
			image: '/images/timeline/first-meet.jpg',
		},
		{
			date: '연애 기간 1,280일',
			title: '💕 행복했던 3년 반',
			description: '항상 대화와 웃음이 머물던\n여러 계절들의 우리',
			image: '/images/timeline/dating.jpg',
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
		{ src: '/images/gallery/gallery-01.jpg', alt: '웨딩 사진 1' },
		{ src: '/images/gallery/gallery-02.jpg', alt: '웨딩 사진 2' },
		{ src: '/images/gallery/gallery-03.jpg', alt: '웨딩 사진 3' },
		{ src: '/images/gallery/gallery-04.jpg', alt: '웨딩 사진 4' },
		{ src: '/images/gallery/gallery-05.jpg', alt: '웨딩 사진 5' },
		{ src: '/images/gallery/gallery-06.jpg', alt: '웨딩 사진 6' },
		{ src: '/images/gallery/gallery-07.jpg', alt: '웨딩 사진 7' },
		{ src: '/images/gallery/gallery-08.jpg', alt: '웨딩 사진 8' },
		{ src: '/images/gallery/gallery-09.jpg', alt: '웨딩 사진 9' },
		{ src: '/images/gallery/gallery-10.jpg', alt: '웨딩 사진 10' },
		{ src: '/images/gallery/gallery-11.jpg', alt: '웨딩 사진 11' },
		{ src: '/images/gallery/gallery-12.jpg', alt: '웨딩 사진 12' },
	],

	// ── 인터뷰 ──────────────────────────────────────
	interview: [
		{
			question: '서로의 첫인상은 어땠나요?',
			answer:
				'처음 봤을 때 참 편안한 사람이라고 느꼈어요. 대화를 나누면 나눌수록 마음이 따뜻해지는 사람이었습니다.',
			answeredBy: 'both',
		},
		{
			question: '프로포즈는 어떻게 했나요?',
			answer: "특별한 날을 기다리기보다 평범한 일상 속에서 '함께 걷고 싶다'는 말을 전했습니다.",
			answeredBy: 'groom',
		},
		{
			question: '결혼을 결심한 순간은?',
			answer:
				'힘든 일이 있을 때 곁에 있어주는 모습을 보면서, 이 사람과 평생 함께하고 싶다고 느꼈습니다.',
			answeredBy: 'bride',
		},
		{
			question: '서로에게 하고 싶은 말은?',
			answer: '항상 고맙고, 앞으로도 지금처럼 서로를 아끼며 함께 걸어가요. 사랑해요.',
			answeredBy: 'both',
		},
		{
			question: '어떤 가정을 꾸리고 싶나요?',
			answer: '웃음이 끊이지 않는, 서로를 존중하고 응원하는 따뜻한 가정을 만들어가고 싶습니다.',
			answeredBy: 'both',
		},
	],

	// ── 교통 안내 ──────────────────────────────────
	transport: [
		{
			type: 'subway',
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
					kakaoPayUrl: 'https://qr.kakaopay.com/PLACEHOLDER',
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
					holder: '김미영',
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
					kakaoPayUrl: 'https://qr.kakaopay.com/PLACEHOLDER',
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
	kakaoJsKey: 'PLACEHOLDER_KAKAO_JS_KEY',

	// ── RSVP (Google Apps Script) ──────────────────
	googleScriptUrl: 'PLACEHOLDER_GOOGLE_SCRIPT_URL',

	// ── 공유 설정 ──────────────────────────────────
	ogImage: '/images/main-og.jpg',
	siteUrl: 'https://miajlee.github.io/mna',
	coupleNameShort: '지형 ♥ 종혁',
}
