'use client'

import { Menu, X } from 'lucide-react'
import { Session } from 'next-auth'
import NextLink from 'next/link'
import { useState } from 'react'
import AuthButtons from './AuthButtons'
import ThemeToggle from './ThemeToggle'

// 세션을 프로퍼티로 받도록 컴포넌트 구조 변경
export default function NavbarContent({ session }: { session: Session | null }) {
	const [isOpen, setIsOpen] = useState(false)
	const isLoggedIn = !!session?.user

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<header className="backdrop-saturate-90 bg-linear-to-b relative top-0 z-20 w-full border border-white/30 from-white/50 to-white/20 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-xl dark:border-white/10 dark:from-white/10 dark:to-white/5">
			<nav className="mx-auto flex max-w-7xl items-center justify-between">
				<NextLink href="/" className="flex items-center gap-2">
					<div className="from-chuni-mint-700 to-chuni-violet-500 bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent">
						CHUNILINK
					</div>
				</NextLink>

				{/* 데스크톱 메뉴 */}
				<div className="hidden items-center gap-6 md:flex">
					<NextLink
						href="/upload"
						className="text-gray-700 transition hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
					>
						기록 연동
					</NextLink>
					<NextLink
						href="/profile/@me"
						className="text-gray-700 transition hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
					>
						프로필
					</NextLink>
					<AuthButtons isLoggedIn={isLoggedIn} />
					<ThemeToggle />
				</div>

				{/* 모바일 햄버거 메뉴 버튼 */}
				<button
					onClick={toggleMenu}
					className="rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden"
				>
					{isOpen ? (
						<X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
					) : (
						<Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
					)}
				</button>
			</nav>

			{/* 모바일 메뉴 (드롭다운) */}
			{isOpen && (
				<div className="backdrop-saturate-90 mt-4 rounded-xl border border-white/30 bg-gradient-to-b from-white/60 to-white/30 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:border-white/10 dark:from-white/15 dark:to-white/5">
					<div className="flex flex-col space-y-4">
						<NextLink
							href="/upload"
							className="rounded px-2 py-2 text-gray-700 transition hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
							onClick={() => setIsOpen(false)}
						>
							기록 연동
						</NextLink>
						<NextLink
							href="/profile/@me"
							className="rounded px-2 py-2 text-gray-700 transition hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
							onClick={() => setIsOpen(false)}
						>
							프로필
						</NextLink>
						<div className="flex items-center justify-between">
							<AuthButtons isLoggedIn={isLoggedIn} />
							<ThemeToggle />
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
