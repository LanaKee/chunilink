import SessionProvider from '@/app/SessionProvider'
import Footer from '@/shared/components/layout/Footer'
import Nabar from '@/shared/components/layout/Nabar'
import XVerseBackground from '@/shared/components/layout/XVerseBackground'
import { getServerAuthSession } from '@/shared/lib/auth'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: '츄니링크',
	keywords: ['chunithm', '프로필', '게임', '리듬게임']
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerAuthSession()

	return (
		<html lang="ko_KR">
			<body
				className={`${geistSans.variable} ${geistMono.variable} dark:bg-background flex min-h-screen flex-col bg-white antialiased`}
			>
				<SessionProvider session={session}>
					<Nabar session={session} />
					<XVerseBackground>
						<div className="z-1 grow overflow-auto">{children}</div>
					</XVerseBackground>
					<Footer />
				</SessionProvider>
			</body>
		</html>
	)
}
