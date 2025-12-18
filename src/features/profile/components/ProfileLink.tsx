'use client'
import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'

interface ProfileLinkProps {
	slug: string
}

export const ProfileLink: React.FC<ProfileLinkProps> = ({ slug }) => {
	const [copied, setCopied] = useState(false)

	const profileUrl = `https://chuni.yoru.icu/profile/${slug}`

	const copyToClipboard = () => {
		navigator.clipboard.writeText(profileUrl).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
	}

	return (
		<div className="mt-2 flex items-center">
			<div className="group flex items-center gap-2 rounded-md border border-white/35 bg-white/25 px-3 py-1.5 shadow-sm backdrop-blur-lg transition-colors hover:bg-white/35 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
				<span className="max-w-[200px] truncate text-sm font-medium text-gray-700 md:max-w-xs dark:text-gray-200">
					{profileUrl}
				</span>
				<button
					onClick={copyToClipboard}
					className="text-gray-500 transition-colors hover:text-chuni-violet-500 focus:outline-none dark:text-gray-300 dark:hover:text-chuni-lavender-400"
					aria-label="프로필 링크 복사"
				>
					{copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
				</button>
			</div>
		</div>
	)
}

export default ProfileLink
