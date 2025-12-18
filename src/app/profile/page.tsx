import { Menu } from '@/features/profile/components/Menubar'
import RatingSongs from '@/features/profile/components/RatingSongs'
import UserCard from '@/features/profile/components/UserCard'

export default function ProfilePage() {
	return (
		<div className="min-w-screen relative min-h-screen bg-white/10 py-10 backdrop-blur-md dark:bg-background/60">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-gradient-to-br from-chuni-mint-400/30 via-chuni-sky-400/20 to-transparent blur-3xl" />
				<div className="absolute right-[-8rem] top-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-chuni-violet-400/25 via-chuni-lavender-400/20 to-transparent blur-3xl" />
				<div className="absolute bottom-[-6rem] left-1/3 h-64 w-64 rounded-full bg-gradient-to-br from-chuni-green-400/20 via-chuni-mint-300/15 to-transparent blur-3xl" />
			</div>
			<div className="relative mx-6">
				<div className="glass-surface mx-auto max-w-4xl space-y-8 rounded-3xl p-6 md:p-8">
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
