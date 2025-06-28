import { Prisma, RatingType } from '@prisma/client'
import {
	Award,
	Check,
	CheckCircle2,
	Link,
	Medal,
	Shield,
	Sparkles,
	Star,
	Trophy,
	X,
	Zap
} from 'lucide-react'
import Image from 'next/image'
import React, { JSX } from 'react'

// Prisma 모델에 맞게 타입 정의
type PlayerScoreWithSong = Prisma.PlayerScoreGetPayload<{
	include: {
		song: {
			select: {
				id: true
				title: true
				artist: true
				imageUrl: true
				difficulties: {
					select: {
						difficulty: true
						level: true
					}
				}
			}
		}
	}
}>

// 난이도 타입 정의
type Difficulty = 'BASIC' | 'ADVANCED' | 'EXPERT' | 'MASTER' | 'ULTIMA' | 'WORLD_END'

// RatingSongs 컴포넌트의 props 타입 정의
type RatingSongsProps = {
	songs: PlayerScoreWithSong[]
}

const difficultyMap: Record<Difficulty, { abbr: string; color: string }> = {
	BASIC: {
		abbr: 'BASIC',
		color: 'bg-chunithm-basic'
	},
	ADVANCED: {
		abbr: 'ADVANCED',
		color: 'bg-chunithm-advanced'
	},
	EXPERT: {
		abbr: 'EXPERT',
		color: 'bg-chunithm-expert'
	},
	MASTER: {
		abbr: 'MASTER',
		color: 'bg-chunithm-master'
	},
	ULTIMA: {
		abbr: 'ULTIMA',
		color: 'bg-gradient-to-r from-black via-red-500 via-50% to-black'
	},
	WORLD_END: {
		abbr: "WORLD'S END",
		color: 'bg-blue-500'
	}
}

const getRatingTextColor = (value: number) => {
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

const getClearTypeStyle = (clearType: string) => {
	switch (clearType) {
		case 'HARD':
		case 'BRAVE':
			return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900'
		case 'ABSOLUTE':
			return 'bg-vivid-rainbow text-gray-700'
		case 'CATASTROPHY':
			return 'bg-rainbow text-gray-700'
		case 'FAIL':
			return 'bg-gradient-to-r from-red-700 to-red-500 dark:from-red-800 dark:to-red-600 text-white'
		default:
			return 'bg-gradient-to-r from-green-500 to-emerald-400 dark:from-green-600 dark:to-emerald-500' // 기본
	}
}

const getComboTypeStyle = (comboType: string) => {
	switch (comboType) {
		case 'ALL_JUSTICE':
			return 'bg-vivid-rainbow text-gray-700'
		case 'ALL_JUSTICE_CRITICAL':
			return 'bg-rainbow text-gray-700'
		case 'FULL_COMBO':
			return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900'
		default:
			return 'bg-gradient-to-r from-blue-500 to-indigo-400 dark:from-blue-600 dark:to-indigo-500'
	}
}

const getChainTypeStyle = (chainType: string) => {
	switch (chainType) {
		case 'FULL_CHAIN':
			return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900'
		case 'FULL_CHAIN_PLUS':
			return 'bg-vivid-rainbow text-gray-700'
		default:
			return 'bg-gradient-to-r from-purple-500 to-pink-400 dark:from-purple-600 dark:to-pink-500'
	}
}

// 스태이터스 배지 컴포넌트
type StatusBadgeType = 'clear' | 'combo' | 'chain'
type StatusBadgeProps = {
	type: StatusBadgeType
	label: string
	className?: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ type, label, className }) => {
	// 타입별 스타일 선택 로직
	let styleClass = ''

	if (type === 'clear') {
		styleClass = getClearTypeStyle(label)
	} else if (type === 'combo') {
		styleClass = getComboTypeStyle(label)
	} else if (type === 'chain') {
		styleClass = getChainTypeStyle(label)
	}

	// 라벨에 따라 다른 아이콘 선택
	const getClearIcon = (clearType: string) => {
		switch (clearType) {
			case 'HARD':
			case 'BRAVE':
				return <Medal className="h-3 w-3" />
			case 'ABSOLUTE':
				return <Trophy className="h-3 w-3" />
			case 'CATASTROPHY':
				return <Shield className="h-3 w-3" />
			case 'FAIL':
				return <X className="h-3 w-3" />
			default:
				return <Check className="h-3 w-3" />
		}
	}

	const getComboIcon = (comboType: string) => {
		switch (comboType) {
			case 'ALL_JUSTICE':
				return <Award className="h-3 w-3" />
			case 'ALL_JUSTICE_CRITICAL':
				return <Sparkles className="h-3 w-3" />
			case 'FULL_COMBO':
				return <Star className="h-3 w-3" />
			default:
				return <CheckCircle2 className="h-3 w-3" />
		}
	}

	const getChainIcon = (chainType: string) => {
		switch (chainType) {
			case 'FULL_CHAIN':
				return <Link className="h-3 w-3" />
			case 'FULL_CHAIN_PLUS':
				return <Zap className="h-3 w-3" />
			default:
				return <Link className="h-3 w-3" />
		}
	}

	let icon: JSX.Element

	if (type === 'clear') {
		icon = getClearIcon(label)
	} else if (type === 'combo') {
		icon = getComboIcon(label)
	} else {
		icon = getChainIcon(label)
	}

	return (
		<div
			className={`${styleClass} ${className} group/badge relative flex items-center gap-1 overflow-hidden rounded-xl border border-white/20 px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:shadow-xl`}
		>
			{/* 글래스 하이라이트 효과 */}
			<div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/badge:opacity-100"></div>
			<span className="relative z-10 flex items-center gap-1.5 transition-transform duration-300 group-hover/badge:scale-105">
				{icon}
				{label.replace('ALL_JUSTICE_CRITICAL', 'AJC').replace('_PLUS', ' +').replaceAll('_', ' ')}
			</span>
		</div>
	)
}

// 노래 카드 컴포넌트
const SongCard = ({ song, index }: { song: PlayerScoreWithSong; index: number }) => {
	const diffInfo = song.song.difficulties.find((diff) => diff.difficulty === song.difficulty)
	const difficultyColor = difficultyMap[diffInfo?.difficulty as Difficulty]

	// 플레이랭크 표시 및 색상 설정
	const displayPlayRank = song.playRank?.replace('_PLUS', '+') || ''
	const getPlayRankColor = (rank: string): string => {
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

	return (
		<div className="dark:via-white/2 group relative flex transform flex-col overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-[1px] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:border-white/40 hover:shadow-2xl hover:shadow-indigo-500/20 dark:border-white/10 dark:from-white/5 dark:hover:border-white/20 dark:hover:shadow-purple-500/20">
			{/* 글래스 리플렉션 효과 */}
			<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

			{/* 내부 글래스 컨테이너 */}
			<div className="from-white/8 via-white/3 to-white/1 relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br backdrop-blur-md dark:from-black/20 dark:via-black/10 dark:to-black/5">
				{/* 커버 이미지 */}
				<div className="relative w-full pt-[100%]">
					<Image
						src={`https://chunithm-net-eng.com/mobile/img/${song.song.imageUrl}`}
						alt={song.song.title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					{/* 이미지 오버레이 글래스 효과 */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"></div>

					<div className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-black/60">
						{index + 1}
					</div>
					<div
						className={`absolute bottom-2 right-2 ${difficultyColor.color} flex min-w-[32px] flex-row items-center space-x-1 rounded-lg px-2 py-1 text-xs font-bold text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-105`}
					>
						<span>{diffInfo?.difficulty}</span>
						<span>{String(diffInfo?.level)}</span>
					</div>

					<div
						className={`absolute right-2 top-2 rounded-lg ${getPlayRankColor(song.playRank)} px-2 py-1 text-xs font-bold shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105`}
					>
						{displayPlayRank}
					</div>
				</div>

				{/* 곡 정보 */}
				<div className="p-3">
					<h3
						className="truncate text-sm font-bold text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-white dark:group-hover:text-gray-100"
						title={song.song.title}
					>
						{song.song.title}
					</h3>
					<p
						className="truncate text-xs text-gray-600 transition-colors duration-300 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"
						title={song.song.artist || ''}
					>
						{song.song.artist}
					</p>
				</div>

				{/* 점수 및 레이팅 - 고정된 위치 */}
				<div className="flex items-end justify-between p-3 pt-0">
					<div className="flex flex-col items-start">
						<div className="font-mono text-xs text-gray-700 transition-colors duration-300 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-200">
							{song.score.toLocaleString()}
						</div>
					</div>
					<div
						className={`font-mono text-sm font-bold transition-transform duration-300 group-hover:scale-110 ${getRatingTextColor(song.rating ? (typeof song.rating === 'object' && 'toNumber' in song.rating ? song.rating.toNumber() : Number(song.rating)) : 0)}`}
					>
						{parseFloat(String(song.rating)).toFixed(2)}
					</div>
				</div>

				{/* 구분선 - 글래스 효과 */}
				<hr className="mx-3 my-1 border-t border-white/20 transition-colors duration-300 group-hover:border-white/30 dark:border-white/10 dark:group-hover:border-white/20" />

				{/* 향상된 상태 배지 섹션 - 높이 고정 */}
				<div className="mb-2 h-24 flex-1 p-3 pt-1">
					{song.clearType && song.clearType !== 'CLEAR' && (
						<StatusBadge type="clear" label={song.clearType} className="mt-2 flex-grow" />
					)}
					{song.comboType && (
						<StatusBadge type="combo" label={song.comboType} className="mt-2 flex-grow" />
					)}
					{song.cToCType && (
						<StatusBadge type="chain" label={song.cToCType} className="mt-2 flex-grow" />
					)}
				</div>
			</div>
		</div>
	)
}

// 평균 레이팅 표시 컴포넌트
const AverageRatingDisplay = ({
	rating,
	label,
	type
}: {
	rating: number
	label: string
	type: 'new' | 'old'
}) => {
	const bgColor =
		type === 'new'
			? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-indigo-500/10'
			: 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 dark:from-amber-500/10 dark:via-orange-500/10 dark:to-amber-500/10'

	const borderColor =
		type === 'new'
			? 'border-indigo-300/40 dark:border-indigo-400/20'
			: 'border-amber-300/40 dark:border-amber-400/20'

	return (
		<div
			className={`group/rating inline-flex items-center gap-2 rounded-full border ${borderColor} ${bgColor} px-4 py-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-opacity-60 hover:shadow-xl`}
		>
			{/* 글래스 하이라이트 */}
			<div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/rating:opacity-100"></div>

			<span className="relative z-10 text-sm font-medium text-gray-700 transition-colors duration-300 group-hover/rating:text-gray-800 dark:text-gray-300 dark:group-hover/rating:text-gray-200">
				{label}
			</span>
			<span
				className={`relative z-10 text-base font-bold transition-transform duration-300 group-hover/rating:scale-110 ${getRatingTextColor(rating)}`}
			>
				{rating.toFixed(2)}
			</span>
		</div>
	)
}

export const RatingSongs: React.FC<RatingSongsProps> = ({ songs }) => {
	const newSongs = songs.filter((song) => song.ratingType === RatingType.NEW).slice(0, 20)
	const oldSongs = songs.filter((song) => song.ratingType === RatingType.OLD).slice(0, 30)
	const newSongsRating = newSongs.reduce((acc, song) => acc + Number(song.rating), 0) / 20
	const oldSongsRating = oldSongs.reduce((acc, song) => acc + Number(song.rating), 0) / 30

	return (
		<div className="mt-8 space-y-8">
			{newSongs.length > 0 && (
				<div>
					<div className="mb-4 flex flex-wrap items-center gap-3">
						<h2 className="text-xl font-bold text-gray-800 dark:text-white">신곡 베스트</h2>
						<div className="rounded-full bg-indigo-100 px-2 py-0.5 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
							{newSongs.length}곡
						</div>
						<AverageRatingDisplay rating={newSongsRating} label="평균 레이팅" type="new" />
					</div>

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
						{newSongs.map((song, index) => (
							<SongCard key={`new-${song.id}`} song={song} index={index} />
						))}
					</div>
				</div>
			)}

			{/* 구곡 섹션 */}
			{oldSongs.length > 0 && (
				<div>
					<div className="mb-4 flex flex-wrap items-center gap-3">
						<h2 className="text-xl font-bold text-gray-800 dark:text-white">구곡 베스트</h2>
						<div className="rounded-full bg-amber-100 px-2 py-0.5 text-sm font-semibold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
							{oldSongs.length}곡
						</div>
						<AverageRatingDisplay rating={oldSongsRating} label="평균 레이팅" type="old" />
					</div>

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
						{oldSongs.map((song, index) => (
							<SongCard key={`old-${song.id}`} song={song} index={index} />
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default RatingSongs
