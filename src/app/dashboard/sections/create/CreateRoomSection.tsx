'use client'

import { createRoom } from './_actions/createRoom'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export const CreateRoomSection = () => {
    const [roomName, setRoomName] = useState<string>('')
    const [maxViewers, setMaxViewers] = useState<number>(10)

    const createRoomMutation = useMutation({
        mutationFn: () => createRoom({ roomName, maxViewers }),
        onSuccess: () => {
            setRoomName('')
            setMaxViewers(10)
        },
    })

    return (
        <div>
            <p>Create Room</p>
            <input
                type="text"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <button onClick={() => createRoomMutation.mutate()}>Create Room</button>
        </div>
    )
}
