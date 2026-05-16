import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'CHUNILINK',
	openGraph: {
		title: 'CHUNILINK',
		type: 'website'
	}
}

export default function Home() {
	return (
		<div className="glass-surface relative min-h-screen w-full overflow-hidden border-t px-8 py-10">
			<div className="container relative mx-auto px-4 py-16">
				<div className="mx-auto max-w-4xl">
					<div className="mb-12 text-center">
						<h1 className="relative mb-6 text-2xl font-bold text-gray-800 md:text-5xl dark:text-white">
							안녕하세요{' '}
							<span className="from-chuni-mint-700 to-chuni-violet-500 bg-linear-to-r bg-clip-text font-bold text-transparent">
								CHUNILINK
							</span>
							입니다.
						</h1>
						<div className="bg-linear-to-r from-chuni-mint-500 via-chuni-sky-500 to-chuni-violet-500 mx-auto h-1 w-24 rounded-full opacity-80"></div>
					</div>

					<div className="glass-surface relative w-full rounded-2xl px-8 py-10 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] transition-all duration-300">
						<div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/35 opacity-40 dark:border-white/10" />
						<div className="bg-linear-to-br pointer-events-none absolute inset-0 rounded-2xl from-white/30 via-white/10 to-transparent opacity-70 dark:from-white/10 dark:via-transparent" />
						<h1 className="relative mb-6 text-3xl font-bold text-gray-900 dark:text-white">
							<div className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-300">cross verse X</div>
							<span className="bg-linear-to-r from-chuni-violet-500 to-chuni-mint-600 via-pink-400 bg-clip-text text-transparent">
								X-VERSE X 대응 업데이트 완료
							</span>
						</h1>
						<div className="relative space-y-6 leading-relaxed text-gray-700 dark:text-gray-200">
							<div className="flex items-start space-x-3">
								<div className="bg-linear-to-r from-chuni-mint-500 to-chuni-green-500 mt-3 h-2 w-2 shrink-0 rounded-full"></div>
								<p className="text-lg">
									ChuniLink는 현재{' '}
									<span className="font-semibold text-amber-600 dark:text-amber-400">
										베타 버전
									</span>
									으로 운영되고 있어 예고없는 데이터 삭제 및 기능 변경이 있을 수 있습니다.
								</p>
							</div>

							<div className="flex items-start space-x-3">
								<div className="bg-linear-to-r from-chuni-lavender-400 to-chuni-violet-500 mt-3 h-2 w-2 shrink-0 rounded-full"></div>
								<p className="text-lg">
									이 프로젝트 개발에 영감을 주신 <span className="font-semibold">shiftpsh</span>님의{' '}
									<a
										href="https://mai.sft.sh"
										target="_blank"
										rel="noopener noreferrer"
										className="text-chuni-sky-600 hover:text-chuni-violet-500 dark:text-chuni-sky-400 dark:hover:text-chuni-lavender-400 underline underline-offset-2 transition-colors"
									>
										mai.sft.sh
									</a>{' '}
									프로젝트에 감사드립니다.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
