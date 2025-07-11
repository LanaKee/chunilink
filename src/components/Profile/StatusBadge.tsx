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
			return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900'
		case 'ABSOLUTE':
			return 'bg-vivid-rainbow text-gray-700'
		case 'CATASTROPHY':
			return 'bg-rainbow text-gray-700'
		case 'FAIL':
			return 'bg-gradient-to-r from-red-700 to-red-500 dark:from-red-800 dark:to-red-600 text-white'
		default:
			return 'bg-gradient-to-r from-green-500 to-emerald-400 dark:from-green-600 dark:to-emerald-500' // 기본
	}
}

const getComboTypeStyle = (comboType: string) => {
	switch (comboType) {
		case 'ALL_JUSTICE':
			return 'bg-vivid-rainbow text-gray-700'
		case 'ALL_JUSTICE_CRITICAL':
			return 'bg-rainbow text-gray-700'
		case 'FULL_COMBO':
			return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900'
		default:
			return 'bg-gradient-to-r from-blue-500 to-indigo-400 dark:from-blue-600 dark:to-indigo-500'
	}
}

const getChainTypeStyle = (chainType: string) => {
	switch (chainType) {
		case 'FULL_CHAIN':
			return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900'
		case 'FULL_CHAIN_PLUS':
			return 'bg-vivid-rainbow text-gray-700'
		default:
			return 'bg-gradient-to-r from-purple-500 to-pink-400 dark:from-purple-600 dark:to-pink-500'
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
			className={`${styleClass} ${className} group relative flex items-center gap-1 overflow-hidden rounded px-2 py-1 text-xs font-bold shadow-sm transition-all duration-300 hover:shadow-md`}
		>
			<span className="relative z-10 flex items-center gap-1">
				{icon}
				{label.replace('ALL_JUSTICE_CRITICAL', 'AJC').replace('_PLUS', ' +').replaceAll('_', ' ')}
			</span>
			<div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
		</div>
	)
}
