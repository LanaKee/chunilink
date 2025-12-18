import { CHUNITHM_INTERNATIONAL_VERSIONS } from '@/shared/constants/version'
import Avatar from '@/shared/components/ui/Avatar'
import FriendCode from '@/shared/components/ui/FriendCode'
import Honner from '@/shared/components/ui/Honner'
import RatingBox from '@/shared/components/ui/Rating'
import ProfileLink from './ProfileLink'

interface UserCardProps {
	slug: string
	userName: string
	rank: number
	level: number
	avatarUrl: string
	rating: number
	friendCode: string
	playCount: number
	lastPlayDate: Date
	honners: {
		type: 'GOLD' | 'SILVER' | 'PLATINA' | 'RAINBOW' | 'NORMAL'
		label: string
		src?: string
	}[]
}

const UserCard: React.FC<UserCardProps> = ({
	slug,
	userName,
	rank,
	avatarUrl,
	rating,
	friendCode,
	playCount,
	lastPlayDate,
	honners
}) => {
	// 국밥은 8천원으로 합시다
	const minWon = playCount * 1000
	const maxWon = playCount * 1500
	const minGukbap = Math.floor(minWon / 7300)
	const maxGukbap = Math.floor(maxWon / 7300)

	// 현재 버전과 주차 계산
	const getCurrentVersion = (date: Date) => {
		// 날짜에 해당하는 버전 찾기
		const currentVersion = [...CHUNITHM_INTERNATIONAL_VERSIONS]
			.sort((a, b) => new Date(b.release).getTime() - new Date(a.release).getTime())
			.find((version) => new Date(version.release).getTime() <= date.getTime())

		if (!currentVersion) return { version: '알 수 없음', week: 0 }

		// 버전 출시일부터 주차 계산
		const releaseDate = new Date(currentVersion.release)
		const timeDiff = date.getTime() - releaseDate.getTime()
		const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
		const weekNumber = Math.floor(daysDiff / 7) + 1 // 출시 첫 주를 1주차로 계산

		return {
			version: currentVersion.version,
			week: weekNumber
		}
	}

	const { version, week } = getCurrentVersion(lastPlayDate)
	const shortVersion = version.includes('CHUNITHM') ? version.split('CHUNITHM ')[1] : version

	return (
		<div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/30 bg-white/20 px-8 py-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.5)] backdrop-blur-2xl md:flex-row md:items-end dark:border-white/10 dark:bg-white/5">
			<div className="flex flex-1 flex-col items-center gap-3 md:items-start">
				<div className="flex w-full max-w-xs flex-col gap-1 text-center">
					{honners.map((h, i) => (
						<Honner key={i} type={h.type} src={h.src}>
							{h.label}
						</Honner>
					))}
				</div>
				<Avatar rank={rank} avatarUrl={avatarUrl} />
				<div className="flex-col items-center gap-2">
					<div className="flex items-center gap-3">
						<h1 className="text-2xl font-extrabold tracking-widest text-gray-900 md:text-3xl dark:text-white">
							{userName}
						</h1>
					</div>
					<ProfileLink slug={slug} />
				</div>
				<div className="mt-2 flex flex-wrap gap-4 text-sm">
					<div className="group relative flex items-center">
						<span className="font-bold text-gray-800 dark:text-gray-100">플레이 카운트</span>
						<span className="ml-1 font-mono font-medium text-indigo-700 decoration-indigo-300 decoration-dashed group-hover:underline dark:text-indigo-300">
							{playCount}
						</span>

						<div className="absolute left-0 top-full z-20 mt-2 hidden w-max max-w-xs group-hover:block">
							<div className="rounded-lg border border-white/10 bg-black/90 px-3 py-2 text-xs text-white shadow-xl">
								<div className="mb-1 font-semibold text-indigo-300">💰 환산 금액</div>
								<div className="mb-2 text-gray-200">
									약 {minWon.toLocaleString()}원 ~ {maxWon.toLocaleString()}원
								</div>
								<div className="mb-1 font-semibold text-amber-300">🍔 환산 싸이부기(세트)</div>
								<div className="leading-relaxed text-gray-200">
									약 {minGukbap}THBG ~{maxGukbap}THBG
								</div>
								<div className="absolute -top-1.5 left-4 h-3 w-3 rotate-45 transform border-l border-t border-white/10 bg-black/90"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
					<span className="font-mono font-medium text-gray-400 dark:text-gray-100">
						{lastPlayDate.toLocaleDateString('ko-KR', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit',
							timeZone: 'Asia/Seoul'
						})}
					</span>
					<span className="font-mono font-medium text-gray-400 dark:text-gray-100">
						· {shortVersion} {week}주차
					</span>
				</div>
			</div>
			<div className="flex flex-col items-center gap-2 md:items-end">
				<RatingBox rating={rating} />
				<FriendCode code={friendCode} />
			</div>
		</div>
	)
}

export default UserCard
