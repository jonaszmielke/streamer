'use client'

import { useParams } from 'next/navigation'
import { useLayoutMode } from './_components/useLayoutMode'
import { RoomCinema } from './_components/RoomCinema'
import { RoomPortrait } from './_components/RoomPortrait'

const MOCK_ROOM = {
    title: 'The Saturday Reel',
    viewers: 23,
    startedAt: new Date(Date.now() - (1 * 3600 + 42 * 60 + 18) * 1000),
}

const formatRoomCode = (num: string) => {
    const s = num.padStart(6, '0')
    return `${s.slice(0, 3)} ${s.slice(3)}`
}

const RoomPage = () => {
    const { roomNumber } = useParams<{ roomNumber: string }>()
    const layout = useLayoutMode()
    const formattedCode = formatRoomCode(roomNumber)

    if (layout === 'portrait') {
        return (
            <RoomPortrait
                formattedCode={formattedCode}
                title={MOCK_ROOM.title}
                viewers={MOCK_ROOM.viewers}
                startedAt={MOCK_ROOM.startedAt}
            />
        )
    }

    return (
        <RoomCinema
            formattedCode={formattedCode}
            title={MOCK_ROOM.title}
            viewers={MOCK_ROOM.viewers}
            startedAt={MOCK_ROOM.startedAt}
        />
    )
}

export default RoomPage
