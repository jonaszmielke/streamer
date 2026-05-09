export const IconCopy = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
        <rect x="4.5" y="4.5" width="8" height="9" rx="1.5" />
        <path d="M3.5 11V3a1.5 1.5 0 0 1 1.5-1.5h6" />
    </svg>
)

export const IconPlay = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
        <path d="M5 3.5v9l8-4.5z" />
    </svg>
)

export const IconStop = ({ size = 12 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
        <rect x="4" y="4" width="8" height="8" rx="1" />
    </svg>
)

export const IconEye = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z" />
        <circle cx="8" cy="8" r="2" />
    </svg>
)

export const IconVolume = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M3 6h2.5L9 3v10L5.5 10H3z" fill="currentColor" stroke="none" />
        <path d="M11 6c.6.6.9 1.3.9 2s-.3 1.4-.9 2" />
    </svg>
)

export const IconFull = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />
    </svg>
)

export const IconPlus = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M8 3v10M3 8h10" />
    </svg>
)

export const IconArrow = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
)

export const IconDot = ({ size = 8, color = 'currentColor' }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" fill={color} />
    </svg>
)
