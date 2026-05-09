'use client'

import { getUsers } from '@/app/dashboard/sections/users/_actions/getUsers'
import { queryKeys } from '@/shared/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useUsers = (search: string) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: [queryKeys.users, search],
        queryFn: ({ pageParam }) => getUsers({ page: pageParam, search }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    })

    const users = data?.pages.flatMap((page) => page.users) ?? []

    return { users, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading }
}
