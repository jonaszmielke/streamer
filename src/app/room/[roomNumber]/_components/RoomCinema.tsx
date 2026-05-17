import { IconDot, IconEye, IconFull, IconVolume } from '@/components/ui/icons'
import { LabelTag } from '@/components/ui/labelTag'
import { Wordmark } from '@/components/ui/wordmark'
import { FauxFilm } from './FauxFilm'
import { LiveDuration } from './LiveDuration'

type RoomCinemaProps = {
    formattedCode: string
    title: string
    viewers: number
    startedAt: Date
}

export const RoomCinema = ({ formattedCode, title, viewers, startedAt }: RoomCinemaProps) => (
    <div className="relative w-full h-dvh bg-black overflow-hidden text-cream font-sans antialiased">
        <FauxFilm />

        <header
            className="absolute top-0 inset-x-0 flex justify-between items-center px-7 py-5"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)' }}
        >
            <div className="flex items-center gap-4">
                <Wordmark size={14} />
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-hi">
                    / Room{' '}
                    <span className="font-mono text-cream">{formattedCode}</span>
                </span>
            </div>
            <div className="flex items-center gap-3.5">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-beige border border-border-hi px-2.5 py-1.5 rounded-full">
                    <IconDot size={6} color="var(--color-beige)" />
                    <span className="text-cream">
                        <LiveDuration startedAt={startedAt} />
                    </span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-hi">
                    <IconEye size={12} /> {viewers} watching
                </span>
            </div>
        </header>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <LabelTag className="mb-3">— Now showing</LabelTag>
            <h1
                className="font-serif font-light italic tracking-[-0.02em] text-cream text-center px-6"
                style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}
            >
                {title}
            </h1>
        </div>

        <footer
            className="absolute bottom-0 inset-x-0 px-7 py-5"
            style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
        >
            {/* Progress bar */}
            <div className="h-0.5 bg-border mb-4 relative">
                <div className="absolute inset-0 bg-beige" />
            </div>
            <div className="flex items-center gap-4 text-cream">
                <div className="flex items-center gap-2 flex-1">
                    <IconVolume size={16} />
                    <div className="w-[120px] h-0.5 bg-border relative">
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
