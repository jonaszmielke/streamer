import { IconDot, IconEye, IconFull, IconVolume } from '@/components/ui/icons'
import { LabelTag } from '@/components/ui/labelTag'
import { Wordmark } from '@/components/ui/wordmark'
import { FauxFilm } from './FauxFilm'
import { LiveDuration } from './LiveDuration'

type RoomPortraitProps = {
    formattedCode: string
    title: string
    viewers: number
    startedAt: Date
}

export const RoomPortrait = ({ formattedCode, title, viewers, startedAt }: RoomPortraitProps) => (
    <div className="flex flex-col w-full h-dvh bg-background text-cream font-sans antialiased overflow-hidden">
        {/* App bar */}
        <header className="flex justify-between items-center px-5 py-4 border-b border-border shrink-0">
            <div className="flex items-center gap-2.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-hi">←</span>
                <Wordmark size={15} href="/" />
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-hi">
                <IconEye size={11} /> {viewers} watching
            </span>
        </header>

        {/* Room identity */}
        <div className="px-5 pt-5 pb-4 shrink-0">
            <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-baseline gap-2">
                    <LabelTag>— Room</LabelTag>
                    <span className="font-mono text-[13px] text-cream tracking-[0.02em]">
                        {formattedCode}
                    </span>
                </div>
                <span className="inline-flex items-center gap-2 text-beige border border-border-hi px-2.5 py-1.5 rounded-full font-mono text-[11px] tracking-[0.08em] uppercase">
                    <IconDot size={6} color="var(--color-beige)" />
                    <span className="text-cream">
                        <LiveDuration startedAt={startedAt} />
                    </span>
                </span>
            </div>
            <h1 className="font-serif font-light italic text-[36px] leading-[1.05] text-cream tracking-[-0.02em]">
                {title}
            </h1>
        </div>

        {/* Video frame */}
        <div className="mx-5 relative bg-black aspect-video border border-border overflow-hidden shrink-0">
            <FauxFilm />
            <button className="absolute top-2 right-2 bg-black/40 border border-border-hi text-cream p-1.5 rounded cursor-pointer flex items-center justify-center">
                <IconFull size={12} />
            </button>
        </div>

        <div className="flex-1" />

        {/* Controls */}
        <footer className="px-5 pt-5 pb-7 border-t border-border shrink-0">
            {/* Progress bar */}
            <div className="h-0.5 bg-border mb-4 relative">
                <div className="absolute inset-0 bg-beige" />
            </div>
            <div className="flex items-center gap-4 text-cream">
                <div className="flex items-center gap-2.5 flex-1">
                    <IconVolume size={16} />
                    <div className="flex-1 h-0.5 bg-border relative">
                        <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-cream" />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-cream rounded-full"
                            style={{ left: '60%' }}
                        />
                    </div>
                </div>
                <IconFull size={14} />
            </div>
        </footer>
    </div>
)
