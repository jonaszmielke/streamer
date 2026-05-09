import { cn } from '@/lib/utils'

type WordmarkProps = {
    size?: number
    className?: string
}

export const Wordmark = ({ size = 18, className }: WordmarkProps) => (
    <span
        className={cn('font-serif font-light italic tracking-[-0.01em] text-cream', className)}
        style={{ fontSize: size }}
    >
        Streamer
    </span>
)
