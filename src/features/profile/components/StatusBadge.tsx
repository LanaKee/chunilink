import {
	Award,
	Check,
	CheckCircle2,
	Link,
	Medal,
	Shield,
	Sparkles,
	Star,
	Trophy,
	X,
	Zap
} from 'lucide-react'
import React, { JSX } from 'react'

type StatusBadgeType = 'clear' | 'combo' | 'chain'
type StatusBadgeProps = {
	type: StatusBadgeType
	label: string
	className?: string
}

const getClearTypeStyle = (clearType: string) => {
	switch (clearType) {
		case 'HARD':
		case 'BRAVE':
			return 'bg-gradient-to-r from-yellow-300/50 via-yellow-400/50 to-orange-400/50 border border-yellow-400/60 text-yellow-900 dark:text-yellow-100 backdrop-blur-sm'
		case 'ABSOLUTE':
			return 'bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-yellow-400/50 border border-purple-400/60 text-gray-800 dark:text-white backdrop-blur-sm'
		case 'CATASTROPHY':
			return 'bg-white/70 border border-white/50 text-gray-800 dark:text-white backdrop-blur-md'
		case 'FAIL':
			return 'bg-gradient-to-r from-red-500/50 to-red-600/50 border border-red-500/60 text-red-900 dark:text-red-100 backdrop-blur-sm'
		default:
			return 'bg-gradient-to-r from-green-500/50 to-emerald-400/50 border border-green-400/60 text-green-900 dark:text-green-100 backdrop-blur-sm' // 기본
	}
}

const getComboTypeStyle = (comboType: string) => {
	switch (comboType) {
		case 'ALL_JUSTICE':
			return 'bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-yellow-400/50 border border-purple-400/60 text-gray-800 dark:text-white backdrop-blur-sm'
		case 'ALL_JUSTICE_CRITICAL':
			return 'bg-gradient-to-r from-indigo-300/50 via-purple-300/50 to-pink-300/50 border border-white/50 text-gray-800 dark:text-white backdrop-blur-md'
		case 'FULL_COMBO':
			return 'bg-gradient-to-r from-yellow-300/50 via-yellow-400/50 to-orange-400/50 border border-yellow-400/60 text-yellow-900 dark:text-yellow-100 backdrop-blur-sm'
		default:
			return 'bg-gradient-to-r from-blue-500/50 to-indigo-400/50 border border-blue-400/60 text-blue-900 dark:text-blue-100 backdrop-blur-sm'
	}
}

const getChainTypeStyle = (chainType: string) => {
	switch (chainType) {
		case 'FULL_CHAIN':
			return 'bg-gradient-to-r from-yellow-300/50 via-yellow-400/50 to-orange-400/50 border border-yellow-400/60 text-yellow-900 dark:text-yellow-100 backdrop-blur-sm'
		case 'FULL_CHAIN_PLUS':
			return 'bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-yellow-400/50 border border-purple-400/60 text-gray-800 dark:text-white backdrop-blur-sm'
		default:
			return 'bg-gradient-to-r from-purple-500/50 to-pink-400/50 border border-purple-400/60 text-purple-900 dark:text-purple-100 backdrop-blur-sm'
	}
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, label, className }) => {
	let styleClass = ''

	if (type === 'clear') {
		styleClass = getClearTypeStyle(label)
	} else if (type === 'combo') {
		styleClass = getComboTypeStyle(label)
	} else if (type === 'chain') {
		styleClass = getChainTypeStyle(label)
	}

	// 라벨에 따라 다른 아이콘 선택
	const getClearIcon = (clearType: string) => {
		switch (clearType) {
			case 'HARD':
			case 'BRAVE':
				return <Medal className="h-3 w-3" />
			case 'ABSOLUTE':
				return <Trophy className="h-3 w-3" />
			case 'CATASTROPHY':
				return <Shield className="h-3 w-3" />
			case 'FAIL':
				return <X className="h-3 w-3" />
			default:
				return <Check className="h-3 w-3" />
		}
	}

	const getComboIcon = (comboType: string) => {
		switch (comboType) {
			case 'ALL_JUSTICE':
				return <Award className="h-3 w-3" />
			case 'ALL_JUSTICE_CRITICAL':
				return <Sparkles className="h-3 w-3" />
			case 'FULL_COMBO':
				return <Star className="h-3 w-3" />
			default:
				return <CheckCircle2 className="h-3 w-3" />
		}
	}

	const getChainIcon = (chainType: string) => {
		switch (chainType) {
			case 'FULL_CHAIN':
				return <Link className="h-3 w-3" />
			case 'FULL_CHAIN_PLUS':
				return <Zap className="h-3 w-3" />
			default:
				return <Link className="h-3 w-3" />
		}
	}

	let icon: JSX.Element

	if (type === 'clear') {
		icon = getClearIcon(label)
	} else if (type === 'combo') {
		icon = getComboIcon(label)
	} else {
		icon = getChainIcon(label)
	}

	return (
		<div
			className={`${styleClass} ${className} group relative flex items-center gap-1 overflow-hidden rounded-lg px-2 py-1 text-xs font-bold shadow-lg transition-all duration-300 hover:border-opacity-60 hover:shadow-xl`}
		>
			<span className="relative z-10 flex items-center gap-1 drop-shadow-sm">
				{icon}
				{label.replace('ALL_JUSTICE_CRITICAL', 'AJC').replace('_PLUS', ' +').replaceAll('_', ' ')}
			</span>
			<div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
		</div>
	)
}
