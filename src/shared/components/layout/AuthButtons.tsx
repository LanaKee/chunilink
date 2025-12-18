'use client'

import { signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

interface AuthButtonsProps {
	isLoggedIn: boolean
}

export default function AuthButtons({ isLoggedIn }: AuthButtonsProps) {
	const [isLoading, setIsLoading] = useState(false)

	const handleLogin = async () => {
		try {
			setIsLoading(true)
			await signIn('discord', { callbackUrl: '/' })
		} catch (error) {
			console.error('로그인 오류:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleLogout = async () => {
		try {
			setIsLoading(true)
			await signOut({ callbackUrl: '/' })
		} catch (error) {
			console.error('로그아웃 오류:', error)
		} finally {
			setIsLoading(false)
		}
	}

	if (isLoggedIn) {
		return (
			<button
				onClick={handleLogout}
				disabled={isLoading}
				className="w-full cursor-pointer rounded-lg bg-red-50 px-4 py-3 text-center text-red-600 transition hover:bg-red-100 hover:text-red-700 disabled:opacity-50 md:w-auto md:bg-transparent md:px-0 md:py-0 md:text-gray-700 md:hover:bg-transparent md:hover:text-indigo-600 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300 md:dark:bg-transparent md:dark:text-gray-200 md:dark:hover:bg-transparent md:dark:hover:text-indigo-400"
			>
				{isLoading ? '처리 중...' : '로그아웃'}
			</button>
		)
	}

	return (
		<button
			onClick={handleLogin}
			disabled={isLoading}
			className="dark:text-foreground w-full cursor-pointer rounded-lg bg-indigo-50 px-4 py-3 text-center text-indigo-600 transition hover:bg-indigo-100 hover:text-indigo-700 disabled:opacity-50 md:w-auto md:bg-transparent md:px-0 md:py-0 md:text-gray-700 md:hover:bg-transparent md:hover:text-indigo-600 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300 md:dark:bg-transparent md:dark:text-gray-200 md:dark:hover:bg-transparent md:dark:hover:text-indigo-400"
		>
			{isLoading ? '처리 중...' : '로그인'}
		</button>
	)
}
