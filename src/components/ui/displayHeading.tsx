import { cn } from '@/lib/utils'

type DisplayHeadingProps = {
    children: React.ReactNode
    className?: string
    as?: 'h1' | 'h2' | 'h3'
}

export const DisplayHeading = ({ children, className, as: Tag = 'h1' }: DisplayHeadingProps) => (
    <Tag
        className={cn(
            'font-serif font-light tracking-[-0.02em] text-cream leading-tight m-0',
            className
        )}
    >
        {children}
    </Tag>
)

export const Accent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={cn('italic text-beige', className)}>{children}</span>
)
