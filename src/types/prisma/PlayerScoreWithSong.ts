import { Prisma } from '@prisma/client'

export type PlayerScoreWithSong = Prisma.PlayerScoreGetPayload<{
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
