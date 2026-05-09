'use client'

import { useRooms } from './_hooks/useRooms'
import { useEffect, useState } from 'react'

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
    const [search, setSearch] = useState<string>('')
    const { rooms, lastElementRef, isLoading } = useRooms(search)

    if (isLoading) return <p>Loading...</p>

    if (rooms.length === 0) return <p>No rooms found.</p>

    return (
        <>
            <p>Active rooms</p>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
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
                    {rooms.map((room, index) => (
                        <tr
                            key={room.number}
                            ref={index === rooms.length - 1 ? lastElementRef : undefined}
                        >
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
