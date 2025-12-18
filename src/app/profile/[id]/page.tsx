import RatingSongs from '@/features/profile/components/RatingSongs'
import UserCard from '@/features/profile/components/UserCard'
import { getPlayerMetadata } from '@/features/profile/server/player'
import { getPlayerData } from '@/features/profile/server/playerService'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const slug = (await props.params).id
	if (slug === '%40me') {
		return {
			title: '내 프로필 | CHUNILINK',
			description: '내 프로필 페이지입니다.'
		}
	} else {
		const player = await getPlayerMetadata(slug)

		if (!player) {
			return {
				title: '사용자를 찾을 수 없습니다 | CHUNILINK'
			}
		}

		return {
			title: `${player.name || 'Unknown'} (${player.rating}) | CHUNILINK`,
			description: `${player.name || 'Unknown'}님의 츄니즘 프로필입니다.`
		}
	}
}

export default async function ProfilePage(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params
	const player = await getPlayerData(id)

	if (!player) return notFound()

	const lastPlayDate = player.lastPlayed || player.lastUpdated || new Date()

	const favoriteCharacter = player.PlayerCharacter.find((pc) => pc.isFavorite)
	const avatarPath = favoriteCharacter?.character.imageUrl
	const avatarUrl = avatarPath
		? `https://chunithm-net-eng.com/mobile/img/${avatarPath}`
		: '/default-avatar.png'

	const allowedHonorTypes = ['GOLD', 'SILVER', 'PLATINA', 'RAINBOW', 'NORMAL'] as const
	type AllowedHonorType = (typeof allowedHonorTypes)[number]

	const honners = player.PlayerHonor.map((honor) => ({
		type: honor.honor.class as string,
		label: honor.honor.name
	})).filter((honor) => allowedHonorTypes.includes(honor.type as AllowedHonorType)) as {
		type: AllowedHonorType
		label: string
	}[]

	if (honners.length === 0) {
		honners.push({ type: 'NORMAL', label: 'NEW COMER' })
	}

	return (
		<div className="min-w-screen relative min-h-screen py-10">
			<div className="mx-6 mt-4">
				<div className="mx-auto max-w-4xl rounded-3xl p-6 md:p-8">
					<UserCard
						slug={player.slug}
						userName={player.name}
						rank={favoriteCharacter?.rank || 1}
						level={player.level}
						avatarUrl={avatarUrl}
						rating={Number(player.rating)}
						friendCode={player.friendCode}
						playCount={player.playCount}
						lastPlayDate={lastPlayDate}
						honners={honners}
					/>
					{/* <Menu /> */}

					{/* 레이팅 곡 목록 추가 */}
					<RatingSongs songs={player.PlayerScore} />
				</div>
			</div>
		</div>
	)
}
