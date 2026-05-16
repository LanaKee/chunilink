const dotenv = require('dotenv')
const { PrismaClient } = require('@prisma/client')

dotenv.config()

const prisma = new PrismaClient()

const BATCH_SIZE = Number(process.env.RECALC_BATCH_SIZE || 500)
const DRY_RUN = process.env.DRY_RUN === '1'

function calculateRating(score, level) {
	const constant = Number(level)
	let rating = 0

	if (score >= 1009000) {
		rating = constant + 2.15
	} else if (score >= 1007500) {
		const baseRating = constant + 2.0
		const extraPoints = score - 1007500
		const extraRating = Math.floor(extraPoints / 100) * 0.01
		rating = baseRating + extraRating
	} else if (score >= 1005000) {
		const baseRating = constant + 1.5
		const extraPoints = score - 1005000
		const extraRating = Math.floor(extraPoints / 50) * 0.01
		rating = baseRating + extraRating
	} else if (score >= 1000000) {
		const baseRating = constant + 1.0
		const extraPoints = score - 1000000
		const extraRating = Math.floor(extraPoints / 100) * 0.01
		rating = baseRating + extraRating
	} else if (score >= 975000) {
		const baseRating = constant
		const extraPoints = score - 975000
		const extraRating = Math.floor(extraPoints / 250) * 0.01
		rating = baseRating + extraRating
	} else if (score >= 925000) {
		const baseRating = constant - 3.0
		const extraPoints = score - 925000
		const extraRating = Math.floor(extraPoints / 500) * 0.03
		rating = baseRating + extraRating
	} else if (score >= 900000) {
		const baseRating = constant - 5.0
		const extraPoints = score - 900000
		const extraRating = Math.floor(extraPoints / 125) * 0.01
		rating = baseRating + extraRating
	} else if (score >= 800000) {
		const baseValue = constant - 5.0
		const baseRating = baseValue * 0.5
		const extraPoints = score - 800000
		const extraRating = Math.floor(extraPoints / 20000) * (baseValue * 0.1)
		rating = baseRating + extraRating
	} else if (score >= 600000) {
		const baseValue = constant - 5.0
		const extraPoints = score - 600000
		rating = Math.floor(extraPoints / 60000) * (baseValue * 0.1)
	}

	return Math.max(0, rating)
}

function keyForDifficulty(songId, difficulty) {
	return `${songId}:${difficulty}`
}

async function main() {
	const difficulties = await prisma.songDifficulty.findMany({
		select: { songId: true, difficulty: true, level: true }
	})

	const levelMap = new Map()
	for (const difficulty of difficulties) {
		levelMap.set(
			keyForDifficulty(difficulty.songId, difficulty.difficulty),
			difficulty.level
		)
	}

	let cursor = undefined
	let processed = 0
	let updated = 0
	let missing = 0

	while (true) {
		const scores = await prisma.playerScore.findMany({
			take: BATCH_SIZE,
			...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
			orderBy: { id: 'asc' },
			select: { id: true, songId: true, difficulty: true, score: true, rating: true }
		})

		if (scores.length === 0) break

		const updates = []
		for (const score of scores) {
			const level = levelMap.get(keyForDifficulty(score.songId, score.difficulty))
			if (level == null) {
				missing += 1
				continue
			}

			const nextRating = calculateRating(score.score, level)
			const currentRating = score.rating == null ? null : Number(score.rating)
			processed += 1

			if (currentRating === null || Math.abs(currentRating - nextRating) > 0.0001) {
				updates.push(
					prisma.playerScore.update({
						where: { id: score.id },
						data: { rating: nextRating }
					})
				)
			}
		}

		if (!DRY_RUN && updates.length > 0) {
			await prisma.$transaction(updates)
			updated += updates.length
		}

		cursor = scores[scores.length - 1].id
	}

	console.log(
		`레이팅 재계산 완료: ${processed}건 확인, ${updated}건 업데이트, 레벨 미확인 ${missing}건` +
			(DRY_RUN ? ' (DRY_RUN=1)' : '')
	)
}

main()
	.catch((error) => {
		console.error('레이팅 재계산 실패:', error)
		process.exitCode = 1
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
