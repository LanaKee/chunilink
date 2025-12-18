import { Menu } from '@/features/profile/components/Menubar'
import RatingSongs from '@/features/profile/components/RatingSongs'
import UserCard from '@/features/profile/components/UserCard'

export default function ProfilePage() {
	return (
		<div className="dark:bg-background/70 min-w-screen relative min-h-screen bg-white/30 py-10 backdrop-blur-2xl">
			<div className="mx-6">
				<div className="mx-auto max-w-4xl">
					<UserCard
						slug="chunilink"
						userName="CHUNILINK"
						level={1}
						rank={51}
						avatarUrl="https://chunithm-net-eng.com/mobile/img/9cf73ca9d18732f5.png"
						rating={17.32}
						friendCode="9000000000000"
						playCount={1024}
						lastPlayDate={new Date('2025-05-04:20:34')}
						honners={[
							{ type: 'RAINBOW', label: 'LEGEND OF VERSE' },
							{ type: 'PLATINA', label: 'Beyond The Rainbow †VERSE†' },
							{ type: 'GOLD', label: 'Sapphire - 100days of VERSE' },
							{ type: 'SILVER', label: 'CHUNITHMer VERSE' },
							{ type: 'NORMAL', label: 'NEW COMER' }
						]}
					/>
					<Menu />

					{/* 레이팅 곡 목록 추가 */}
					<RatingSongs songs={[]} />
				</div>
			</div>
		</div>
	)
}
