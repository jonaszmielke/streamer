'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getUsers } from '@/app/dashboard/sections/users/_actions/getUsers'
import { queryKeys } from '@/shared/queryKeys'

export const useUsers = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: [queryKeys.users],
        queryFn: ({ pageParam }) => getUsers(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    })

    const users = data?.pages.flatMap((page) => page.users) ?? []

    return { users, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading }
}
