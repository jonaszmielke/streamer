'use client'

import { AddUserModal } from './_components/AddUserModal'
import { useUsers } from '@/app/dashboard/users/_hooks/useUsers'
import { Accent, DisplayHeading } from '@/components/ui/displayHeading'
import { IconPlus } from '@/components/ui/icons'
import useFetchMoreObserver from '@/lib/useFetchMoreObserver'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const UsersPage = () => {
    const [search, setSearch] = useState<string>('')
    const [addUserOpen, setAddUserOpen] = useState(false)
    // TODO: debounce search
    const { users, quantity, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useUsers(search)

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
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <DisplayHeading className="text-[28px] flex-1 md:flex-none md:mr-auto">
                    <Accent>{quantity}</Accent> people
                </DisplayHeading>
                <button
                    onClick={() => setAddUserOpen(true)}
                    className="order-2 md:order-3 inline-flex items-center gap-1.5 bg-beige text-background rounded-full px-3.5 py-2 font-sans font-semibold text-[12px] cursor-pointer border-none"
                >
                    <IconPlus size={12} /> Add user
                </button>
                <input
                    type="text"
                    placeholder="Search members…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="order-3 w-full md:order-2 md:w-52 bg-surface border border-border rounded-full px-3.5 py-2 text-[13px] text-cream font-sans outline-none placeholder:text-muted-dim"
                />
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
                                className="grid grid-cols-[minmax(0,1fr)_70px_70px] md:grid-cols-[1fr_100px_140px_80px] gap-3 px-3 md:px-[18px] py-3 items-center border-b border-border last:border-b-0"
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
                                <span className="hidden md:inline text-muted-hi text-[12px] cursor-pointer text-right hover:text-cream transition-colors">
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
