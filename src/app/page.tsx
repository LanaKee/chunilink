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
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
			<div className="container mx-auto px-4 py-16">
				<div className="mx-auto max-w-4xl">
					<div className="mb-12 text-center">
						<h1 className="relative mb-6 text-2xl font-bold text-gray-700 md:text-5xl dark:text-white">
							안녕하세요{' '}
							<span className="from-chuni-mint-700 to-chuni-violet-500 bg-gradient-to-r bg-clip-text font-bold text-transparent">
								CHUNILINK
							</span>
							입니다.
						</h1>
						<div className="mx-auto h-1 w-24 rounded-full bg-blue-600 dark:bg-blue-400"></div>
					</div>

					<div className="dark:bg-background/80 w-full rounded-2xl border-t border-gray-200 bg-white/40 px-8 py-10 backdrop-blur-lg transition-all duration-300 dark:border-white/15">
						<div className="space-y-6 leading-relaxed text-gray-700 dark:text-gray-300">
							<div className="flex items-start space-x-3">
								<div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
								<p className="text-lg">
									ChuniLink는 현재{' '}
									<span className="font-semibold text-amber-600 dark:text-amber-400">
										베타 버전
									</span>
									으로 운영되고 있어 예고없는 데이터 삭제 및 기능 변경이 있을 수 있습니다.
								</p>
							</div>

							<div className="flex items-start space-x-3">
								<div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
								<p className="text-lg">
									이 프로젝트 개발에 영감을 주신 <span className="font-semibold">shiftpsh</span>님의{' '}
									<a
										href="https://mai.sft.sh"
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
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
