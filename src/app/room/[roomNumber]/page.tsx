'use client'

import { useParams } from 'next/navigation'

const RoomPage = () => {
    const { roomNumber } = useParams<{ roomNumber: string }>()

    return <div>Room: {roomNumber}</div>
}

export default RoomPage
