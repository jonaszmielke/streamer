'use client'

import { getRooms } from '../_actions/getRooms'
import useFetchMoreObserver from '@/lib/useFetchMoreObserver'
import { queryKeys } from '@/shared/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useRooms = (search: string) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: [queryKeys.rooms, search],
        queryFn: ({ pageParam }) => getRooms({ page: pageParam, search }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    })

    const { lastElementRef } = useFetchMoreObserver({
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    })

    const rooms = data?.pages.flatMap((page) => page.rooms) ?? []

    return { rooms, lastElementRef, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading }
}
