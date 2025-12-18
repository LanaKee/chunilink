/* eslint-disable @typescript-eslint/no-explicit-any */
import { difficultyMap } from '@/shared/constants/diffiulty'
import { getPlayRankColor, getRatingTextColor } from '@/shared/constants/rating'
import { Difficulty } from '@/shared/types/chunithm'
import { PlayerScoreWithSong } from '@/shared/types/prisma/PlayerScoreWithSong'
import Image from 'next/image'
import { StatusBadge } from './StatusBadge'

export const SongCard = ({ song, index }: { song: PlayerScoreWithSong; index: number }) => {
	const diffInfo = song.song.difficulties.find(
		(diff: { difficulty: any }) => diff.difficulty === song.difficulty
	)
	const difficultyColor = difficultyMap[diffInfo?.difficulty as Difficulty]

	const displayPlayRank = song.playRank?.replace('_PLUS', '+') || ''

	return (
		<div className="flex transform flex-col overflow-hidden rounded-lg border border-white/40 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-black/5 dark:shadow-white/5">
			{/* 커버 이미지 */}
			<div className="relative w-full pt-[100%]">
				<Image
					src={`https://chunithm-net-eng.com/mobile/img/${song.song.imageUrl}`}
					alt={song.song.title}
					fill
					className="object-cover"
				/>
				<div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-sm font-bold text-white">
					{index + 1}
				</div>
				<div
					className={`absolute bottom-2 right-2 ${difficultyColor.color} flex min-w-[32px] flex-row items-center space-x-1 rounded px-1.5 py-1 text-xs font-bold text-white`}
				>
					<span>{diffInfo?.difficulty}</span>
					<span>{String(diffInfo?.level)}</span>
				</div>

				<div
					className={`inner absolute right-2 top-2 rounded ${getPlayRankColor(song.playRank)} inner px-1.5 py-0.5 text-xs font-bold shadow-md`}
				>
					{displayPlayRank}
				</div>
			</div>

			{/* 곡 정보 */}
			<div className="p-2">
				<h3
					className="truncate text-sm font-bold text-gray-800 dark:text-white"
					title={song.song.title}
				>
					{song.song.title}
				</h3>
				<p
					className="truncate text-xs text-gray-600 dark:text-gray-400"
					title={song.song.artist || ''}
				>
					{song.song.artist}
				</p>
			</div>

			{/* 점수 및 레이팅 - 고정된 위치 */}
			<div className="flex items-end justify-between p-2 pt-0">
				<div className="flex flex-col items-start">
					<div className="font-mono text-xs text-gray-700 dark:text-gray-300">
						{song.score.toLocaleString()}
					</div>
				</div>
				<div
					className={`font-mono text-sm font-bold ${getRatingTextColor(song.rating ? (typeof song.rating === 'object' && 'toNumber' in song.rating ? song.rating.toNumber() : Number(song.rating)) : 0)}`}
				>
					{parseFloat(String(song.rating)).toFixed(2)}
				</div>
			</div>
			<hr className="mx-2 my-1 border-t border-gray-200 dark:border-gray-700" />

			{/* 향상된 상태 배지 섹션 - 높이 고정 */}
			<div className="mb-1 h-24 flex-1 p-2 pt-1">
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
	)
}
