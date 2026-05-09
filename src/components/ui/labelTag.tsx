import { cn } from '@/lib/utils'

type LabelTagProps = {
    children: React.ReactNode
    className?: string
}

export const LabelTag = ({ children, className }: LabelTagProps) => (
    <span
        className={cn(
            'font-mono text-[10px] uppercase tracking-[0.18em] text-muted-dim',
            className
        )}
    >
        {children}
    </span>
)
