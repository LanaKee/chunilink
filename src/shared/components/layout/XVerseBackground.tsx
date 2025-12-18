export default function XVerseBackground({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen">
			<div id="xverse" className="xverse-bg fixed inset-0 select-none overflow-visible">
				<div
					className="absolute inset-0 -z-20 bg-cover bg-center"
					style={{ backgroundImage: "url('/images/chunithm-x-verse/background.jpg')" }}
				/>

				<div className="tri-tl" />
				<div className="tri-br" />

				<div className="frame-tr" />
				<div className="frame-bl" />

				<div className="frame-particle-top-right" />
				<div className="frame-particle-bottom-left" />

				<div className="arrow-top-right">
					<div className="arrow-img-down" />
				</div>
				<div className="arrow-bottom-left">
					<div className="arrow-img-up" />
				</div>

				<div className="verse left" />
				<div className="verse ctleft" />
				<div className="verse ctright" />
				<div className="verse right" />

				<div className="corner-wrap-tr">
					<div className="corner-img-tr" />
				</div>
				<div className="corner-wrap-bl">
					<div className="corner-img-bl" />
				</div>

				<div className="globe-cross" />
			</div>

			<div>{children}</div>
		</div>
	)
}
