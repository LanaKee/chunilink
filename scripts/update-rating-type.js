const dotenv = require('dotenv')
const { PrismaClient, RatingType, Version } = require('@prisma/client')

dotenv.config()

const prisma = new PrismaClient()

async function main() {
	const [newResult, oldResult] = await prisma.$transaction([
		prisma.playerScore.updateMany({
			where: { song: { version: Version.X_VERSE_X } },
			data: { ratingType: RatingType.NEW }
		}),
		prisma.playerScore.updateMany({
			where: { song: { version: { not: Version.X_VERSE_X } } },
			data: { ratingType: RatingType.OLD }
		})
	])

	console.log(`ratingType 업데이트 완료: NEW ${newResult.count}건, OLD ${oldResult.count}건`)
}

main()
	.catch((error) => {
		console.error('ratingType 업데이트 실패:', error)
		process.exitCode = 1
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
