'use client'

import { useEffect, useState } from 'react'

export const formatRoomCode = (num: number) => {
    const s = String(num).padStart(6, '0')
    return `${s.slice(0, 3)} ${s.slice(3)}`
}

export const LiveDuration = ({ createdAt }: { createdAt: Date }) => {
    const [duration, setDuration] = useState<string>('—')

    useEffect(() => {
        const updateDuration = () => {
            const totalSeconds = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000)
            const h = Math.floor(totalSeconds / 3600)
            const m = Math.floor((totalSeconds % 3600) / 60)
            const s = totalSeconds % 60
            setDuration(
                `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
            )
        }
        updateDuration()
        const interval = setInterval(updateDuration, 1000)
        return () => clearInterval(interval)
    }, [createdAt])

    return <span className="font-mono text-[12px] text-muted-hi">{duration}</span>
}
