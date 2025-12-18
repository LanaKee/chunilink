import { Difficulty } from '@/shared/types/chunithm'

export const difficultyMap: Record<Difficulty, { abbr: string; color: string }> = {
	BASIC: {
		abbr: 'BASIC',
		color: 'bg-chunithm-basic'
	},
	ADVANCED: {
		abbr: 'ADVANCED',
		color: 'bg-chunithm-advanced'
	},
	EXPERT: {
		abbr: 'EXPERT',
		color: 'bg-chunithm-expert'
	},
	MASTER: {
		abbr: 'MASTER',
		color: 'bg-chunithm-master'
	},
	ULTIMA: {
		abbr: 'ULTIMA',
		color: 'bg-gradient-to-r from-black via-red-500 via-50% to-black'
	},
	WORLD_END: {
		abbr: "WORLD'S END",
		color: 'bg-blue-500'
	}
}
