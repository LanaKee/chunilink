export const getRatingTextColor = (value: number) => {
	if (value < 4) return 'bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400' // 그린
	if (value < 7) return 'bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400' // 오렌지
	if (value < 10) return 'bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400' // 레드
	if (value < 12)
		return 'bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400' // 퍼플
	if (value < 13.25)
		return 'bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-500' // 브론즈
	if (value < 14.5)
		return 'bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-400' // 실버
	if (value < 15.25)
		return 'bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-300' // 골드
	if (value < 16)
		return 'bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-100' // 백금
	if (value < 17)
		return 'bg-clip-text text-transparent bg-linear-to-r/longer from-pink-400 to-purple-400'
	return 'bg-clip-text text-transparent bg-gradient-to-r from-zinc-700 to-zinc-500'
}

export const getPlayRankColor = (rank: string): string => {
	if (rank === 'SSS_PLUS') return 'bg-rainbow text-black' // 레인보우
	if (rank === 'SSS') return 'bg-vivid-rainbow text-black' // 플래티넘 레인보우
	if (rank.includes('SS'))
		return 'bg-gradient-to-r from-yellow-100 via-yellow-200 to-white text-yellow-900' // 백금 그라데이션
	if (rank.includes('S'))
		return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900' // 금 그라데이션
	if (rank.includes('A')) return 'bg-red-600 text-white' // 빨강
	if (rank.includes('B')) return 'bg-blue-600 text-white' // 파랑
	if (rank.includes('C')) return 'bg-yellow-800 text-yellow-100' // 어두운 노랑
	if (rank.includes('D')) return 'bg-black text-white' // 검정
	return 'bg-gray-500 text-white'
}
