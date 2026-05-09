'use client'

import { useEffect, useState } from 'react'

type Room = {
    number: number
    owner: {
        id: string
        name: string
    }
    createdAt: Date
}

const mockRooms: Room[] = [
    {
        number: 1,
        owner: {
            id: '1',
            name: 'Owner 1',
        },
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    },
    {
        number: 2,
        owner: {
            id: '2',
            name: 'Owner 2',
        },
        createdAt: new Date(),
    },
    {
        number: 3,
        owner: {
            id: '3',
            name: 'Owner 3',
        },
        createdAt: new Date(),
    },
]

const LiveDuration = ({ createdAt }: { createdAt: Date }) => {
    const [duration, setDuration] = useState<string>('0 min')

    useEffect(() => {
        const updateDuration = () => {
            const minutes = Math.floor((Date.now() - createdAt.getTime()) / 1000 / 60)
            setDuration(`${minutes} min`)
        }

        updateDuration()
        const interval = setInterval(updateDuration, 60000) // Update every minute

        return () => clearInterval(interval)
    }, [createdAt])

    return <p>{duration}</p>
}

export const RoomsSection = () => {
    return (
        <>
            <p>Active rooms</p>
            <table>
                <thead>
                    <tr>
                        <th>
                            <p>Number</p>
                        </th>
                        <th>
                            <p>Owner</p>
                        </th>
                        <th>
                            <p>Live for</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {mockRooms.map((room) => (
                        <tr key={room.number}>
                            <td>
                                <p>{room.number}</p>
                            </td>
                            <td>
                                <p>{room.owner.name}</p>
                            </td>
                            <td>
                                <LiveDuration createdAt={room.createdAt} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
