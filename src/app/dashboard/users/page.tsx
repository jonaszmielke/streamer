'use client'

import { useUsers } from '@/app/dashboard/users/_hooks/useUsers'
import useFetchMoreObserver from '@/lib/useFetchMoreObserver'
import { useState } from 'react'
import { DisplayHeading, Accent } from '@/components/ui/displayHeading'
import { IconPlus } from '@/components/ui/icons'
import { AddUserModal } from './_components/AddUserModal'
import { cn } from '@/lib/utils'

const UsersPage = () => {
    const [search, setSearch] = useState<string>('')
    const [addUserOpen, setAddUserOpen] = useState(false)
    // TODO: debounce search
    const { users, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUsers(search)

    const { lastElementRef } = useFetchMoreObserver({
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    })

    if (isLoading)
        return (
            <div className="px-8 py-12">
                <p className="font-serif italic text-muted-hi">Loading…</p>
            </div>
        )

    return (
        <div className="px-8 py-9">
            <div className="flex justify-between items-center mb-5">
                <DisplayHeading className="text-[28px]">
                    <Accent>{users.length}</Accent> people
                </DisplayHeading>
                <div className="flex items-center gap-2.5">
                    <input
                        type="text"
                        placeholder="Search members…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-surface border border-border rounded-full px-3.5 py-2 text-[13px] text-cream font-sans outline-none placeholder:text-muted-dim w-52"
                    />
                    <button
                        onClick={() => setAddUserOpen(true)}
                        className="inline-flex items-center gap-1.5 bg-beige text-background rounded-full px-3.5 py-2 font-sans font-semibold text-[12px] cursor-pointer border-none"
                    >
                        <IconPlus size={12} /> Add user
                    </button>
                </div>
            </div>

            {users.length === 0 ? (
                <p className="font-serif italic text-muted-hi">No users found.</p>
            ) : (
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                    {users.map((user, index) => {
                        const isLast = index === users.length - 1
                        const isEven = index % 2 === 0
                        return (
                            <div
                                key={user.id}
                                ref={isLast ? lastElementRef : undefined}
                                className="grid grid-cols-[1fr_100px_140px_80px] gap-3 px-[18px] py-3 items-center border-b border-border last:border-b-0"
                            >
                                <span className="flex items-center gap-3">
                                    <span
                                        className={cn(
                                            'w-8 h-8 rounded-[10px] font-sans text-[12px] font-bold flex items-center justify-center shrink-0',
                                            isEven
                                                ? 'bg-beige text-background'
                                                : 'bg-surface-2 text-cream'
                                        )}
                                    >
                                        {user.name.slice(0, 2).toUpperCase()}
                                    </span>
                                    <span className="text-cream text-[14px]">@{user.name}</span>
                                </span>
                                <span
                                    className={cn(
                                        'font-mono text-[10px] uppercase tracking-[0.16em] px-2.5 py-0.5 rounded-full justify-self-start',
                                        user.role === 'ADMIN'
                                            ? 'text-beige bg-[rgba(232,220,196,0.1)]'
                                            : 'text-muted-hi'
                                    )}
                                >
                                    {user.role.toLowerCase()}
                                </span>
                                <span className="text-muted-hi text-[12px]">
                                    {new Date(user.lastActive).toLocaleDateString()}
                                </span>
                                <span className="text-muted-hi text-[12px] cursor-pointer text-right hover:text-cream transition-colors">
                                    Manage →
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}

            {isFetchingNextPage && (
                <p className="font-serif italic text-muted-hi mt-4">Loading more…</p>
            )}

            <AddUserModal open={addUserOpen} onClose={() => setAddUserOpen(false)} />
        </div>
    )
}

export default UsersPage
