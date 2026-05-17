'use server'

import { Room } from '../types'

const mockRooms: Omit<Room, 'viewers'>[] = [
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
] //TODO: Implement actual rooms fetch logic

// const PAGE_SIZE = 10

type GetRoomsProps = {
    page: number
    search?: string
}

export type GetRoomsResult = {
    rooms: Room[]
    quantity: number
    nextPage: number | undefined
}

export const getRooms = async ({ page }: GetRoomsProps): Promise<GetRoomsResult> => {
    return {
        rooms: mockRooms.map((room) => ({
            ...room,
            number: room.number + page * 10,
            viewers: Math.floor(Math.random() * 100),
        })),
        quantity: (page + 1) * 3,
        // nextPage: rooms.length === PAGE_SIZE ? page + 1 : undefined,
        nextPage: page + 1,
    }
}
