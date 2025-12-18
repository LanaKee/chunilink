import { getServerAuthSession } from '@/shared/lib/auth'
import { prisma } from '@/shared/lib/prismaSingleton'
import { getPlayerBySlug } from '@/features/profile/server/player'
import { notFound } from 'next/navigation'

export async function getPlayerData(id: string) {
	const session = await getServerAuthSession()

	if (id === '@me' || id === '%40me') {
		if (!session?.user?.id) return notFound()

		const player = await prisma.player.findFirst({
			where: { userId: session.user.id },
			select: { slug: true }
		})

		if (!player) return notFound()
		return getPlayerData(player.slug)
	}

	return getPlayerBySlug(id)
}
