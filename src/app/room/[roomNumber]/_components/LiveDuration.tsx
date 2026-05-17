'use client'

import { useEffect, useState } from 'react'

type LiveDurationProps = {
    startedAt: Date
}

export const LiveDuration = ({ startedAt }: LiveDurationProps) => {
    const [duration, setDuration] = useState('00:00:00')

    useEffect(() => {
        const update = () => {
            const total = Math.floor((Date.now() - startedAt.getTime()) / 1000)
            const h = Math.floor(total / 3600)
            const m = Math.floor((total % 3600) / 60)
            const s = total % 60
            setDuration(
                `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
            )
        }
        update()
        const id = setInterval(update, 1000)
        return () => clearInterval(id)
    }, [startedAt])

    return <>{duration}</>
}
