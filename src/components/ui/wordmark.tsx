import Link from 'next/link'
import { cn } from '@/lib/utils'

type WordmarkProps = {
    size?: number
    className?: string
    href?: string
}

export const Wordmark = ({ size = 18, className, href }: WordmarkProps) => {
    const text = (
        <span
            className={cn('font-serif font-light italic tracking-[-0.01em] text-cream', className)}
            style={{ fontSize: size }}
        >
            Streamer
        </span>
    )

    if (href) return <Link href={href}>{text}</Link>
    return text
}
