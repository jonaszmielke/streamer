import { cn } from '@/lib/utils'
import { IconArrow } from '@/components/ui/icons'

type ArrowButtonProps = {
    children: React.ReactNode
    variant?: 'filled' | 'outline'
    onClick?: () => void
    disabled?: boolean
    type?: 'button' | 'submit'
    className?: string
}

export const ArrowButton = ({
    children,
    variant = 'filled',
    onClick,
    disabled,
    type = 'button',
    className,
}: ArrowButtonProps) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
            'flex items-center justify-between w-full px-5 py-4 rounded-sm text-[13px] font-medium tracking-[0.02em] font-sans transition-colors cursor-pointer',
            'disabled:pointer-events-none disabled:opacity-50',
            variant === 'filled'
                ? 'bg-beige text-background border border-beige'
                : 'bg-transparent text-cream border border-border-hi',
            className
        )}
    >
        <span>{children}</span>
        <IconArrow size={14} />
    </button>
)
