'use client'

import { getUsers } from '@/app/dashboard/users/_actions/getUsers'
import { queryKeys } from '@/shared/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const useUsers = (search: string) => {
    const [quantity, setQuantity] = useState<number | null>(null)

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: [queryKeys.users, search],
        queryFn: async ({ pageParam }) => {
            const users = await getUsers({ page: pageParam, search })
            if (pageParam === 0 && users.quantity !== undefined) setQuantity(users.quantity)
            return users
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    })

    const users = data?.pages.flatMap((page) => page.users) ?? []

    return { users, quantity, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading }
}
