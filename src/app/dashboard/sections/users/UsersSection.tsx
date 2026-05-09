'use client'

import { useUsers } from '@/app/dashboard/sections/users/_hooks/useUsers'
import useFetchMoreObserver from '@/lib/useFetchMoreObserver'
import { useState } from 'react'

export const UsersSection = () => {
    const [search, setSearch] = useState<string>('')
    // TODO: debounce search
    const { users, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUsers(search)

    const { lastElementRef } = useFetchMoreObserver({
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    })

    if (isLoading) return <p>Loading...</p>

    if (users.length === 0) return <p>No users found.</p>

    return (
        <>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Last active</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        const isLast = index === users.length - 1
                        return (
                            <tr key={user.id} ref={isLast ? lastElementRef : undefined}>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{new Date(user.lastActive).toLocaleDateString()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {isFetchingNextPage && <p>Loading more...</p>}
        </>
    )
}
