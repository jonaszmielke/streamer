'use client'

import { getRooms } from '../_actions/getRooms'
import useFetchMoreObserver from '@/lib/useFetchMoreObserver'
import { queryKeys } from '@/shared/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const useRooms = (search: string) => {
    const [quantity, setQuantity] = useState<number | null>(null)

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: [queryKeys.rooms, search],
        queryFn: async ({ pageParam }) => {
            const users = await getRooms({ page: pageParam, search })
            if (pageParam === 0 && users.quantity !== undefined) setQuantity(users.quantity)
            return users
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    })

    const { lastElementRef } = useFetchMoreObserver({
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    })

    const rooms = data?.pages.flatMap((page) => page.rooms) ?? []

    // TODO: change quantity to quantity upon actual room backend implementation
    return {
        rooms,
        quantity: rooms.length,
        lastElementRef,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    }
}
