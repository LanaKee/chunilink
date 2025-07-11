import { getRatingTextColor } from '@/constants/rating'
import { PlayerScoreWithSong } from '@/types/prisma/PlayerScoreWithSong'
import { RatingType } from '@prisma/client'
import React from 'react'
import { SongCard } from './SongCard'

type RatingSongsProps = {
	songs: PlayerScoreWithSong[]
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
			? 'bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50'
			: 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50'

	const borderColor =
		type === 'new'
			? 'border-indigo-200 dark:border-indigo-800'
			: 'border-amber-200 dark:border-amber-800'

	return (
		<div
			className={`inline-flex items-center gap-2 rounded-full border ${borderColor} ${bgColor} px-3 py-1.5 shadow-sm`}
		>
			<span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
			<span className={`text-base font-bold ${getRatingTextColor(rating)}`}>
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
