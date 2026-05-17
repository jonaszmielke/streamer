'use client'

import { useRooms } from './_hooks/useRooms'
import { Room } from './types'
import { formatRoomCode, LiveDuration } from './_utils'
import { RoomOptionsModal } from './_components/roomOptionsModal'
import { Accent, DisplayHeading } from '@/components/ui/displayHeading'
import { IconCopy, IconEye, IconPlay, IconPlus, IconStop } from '@/components/ui/icons'
import { LabelTag } from '@/components/ui/labelTag'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

const RoomsPage = () => {
    const router = useRouter()
    const [search, setSearch] = useState<string>('')
    const { rooms, lastElementRef, isLoading } = useRooms(search)

    const openRoom = useCallback((roomNumber: number) => {
        router.push(`/room/${roomNumber}`)
    }, [])

    const copyRoomCode = useCallback((roomNumber: number) => {
        navigator.clipboard.writeText(formatRoomCode(roomNumber))
    }, [])

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const endRoom = useCallback((roomNumber: number) => {
        // TODO: end room server action
    }, [])

    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

    if (isLoading)
        return (
            <div className="px-8 py-12">
                <p className="font-serif italic text-muted-hi">Loading…</p>
            </div>
        )

    return (
        <div className="px-8 py-9">
            <div className="flex justify-between items-baseline mb-7">
                <div>
                    <LabelTag className="block mb-2">— Active</LabelTag>
                    <DisplayHeading className="text-[38px]">
                        <Accent>{rooms.length}</Accent> rooms open
                    </DisplayHeading>
                </div>
            </div>

            {/* Stat cards */}
            <div className="flex gap-3 mb-5">
                {[
                    { label: 'Total viewers', value: '42' }, // TODO: add viewer count to Room type
                    { label: 'Peak today', value: '58' }, // TODO: track peak in server action
                ].map((s) => (
                    <div
                        key={s.label}
                        className="flex-1 bg-surface border border-border rounded-2xl p-4"
                    >
                        <LabelTag className="block">{s.label}</LabelTag>
                        <p
                            className={`font-serif font-semibold text-[28px] tracking-[-0.02em] mt-1 text-white`}
                        >
                            {s.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="font-serif  text-[28px] text-cream flex-1 md:flex-none md:mr-auto">
                    Active rooms
                </span>
                <button
                    onClick={() => router.push('/dashboard/create')}
                    className="order-2 md:order-3 inline-flex items-center gap-1.5 bg-beige text-background rounded-[10px] px-3 py-2 font-sans font-semibold text-[12px] cursor-pointer border-none"
                >
                    <IconPlus size={12} /> New
                </button>
                <input
                    type="text"
                    placeholder="Search…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="order-3 w-full md:order-2 md:w-48 bg-surface-2 border border-border rounded-full px-3 py-1.5 text-[13px] text-cream font-sans outline-none placeholder:text-muted-dim"
                />
            </div>

            {/* Table card */}
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                {rooms.length === 0 ? (
                    <div className="px-[18px] py-8">
                        <p className="font-serif italic text-muted-hi">No rooms found.</p>
                    </div>
                ) : (
                    <>
                        {/* Column headers */}
                        <div className="grid grid-cols-[minmax(0,1fr)_90px_70px] md:grid-cols-[1fr_1fr_100px_140px_1fr] gap-3 md:gap-0 px-3 md:px-[18px] py-2.5 border-b border-border">
                            <LabelTag className="hidden md:block">Code</LabelTag>
                            <LabelTag>Owner</LabelTag>
                            <LabelTag>Viewers</LabelTag>
                            <LabelTag>Live for</LabelTag>
                            <LabelTag className="hidden md:block text-right">Actions</LabelTag>
                        </div>

                        {/* Rows */}
                        {rooms.map((room, index) => (
                            <div
                                key={room.number}
                                ref={index === rooms.length - 1 ? lastElementRef : undefined}
                                onClick={() => setSelectedRoom(room)}
                                className="grid grid-cols-[minmax(0,1fr)_90px_70px] md:grid-cols-[1fr_1fr_100px_140px_1fr] gap-3 md:gap-0 px-3 md:px-[18px] py-3.5 items-center border-b border-border last:border-b-0 text-[13px] md:cursor-default cursor-pointer md:active:bg-transparent active:bg-surface-2 transition-colors"
                            >
                                <span className="hidden md:flex items-center gap-2 font-mono text-cream tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-beige shadow-[0_0_0_3px_rgba(232,220,196,0.13)]" />
                                    {formatRoomCode(room.number)}
                                </span>
                                <span className="flex flex-col gap-0.5 md:block">
                                    <span className="md:hidden font-mono text-cream tracking-wider text-base">
                                        {formatRoomCode(room.number)}
                                    </span>
                                    <span className="text-muted-hi">@{room.owner.name}</span>
                                </span>
                                <span className="text-cream">
                                    <span className="inline-flex items-center gap-1.5">
                                        <IconEye size={12} /> {room.viewers}
                                    </span>
                                </span>
                                <LiveDuration createdAt={room.createdAt} />
                                <span className="hidden md:flex justify-end gap-1.5">
                                    {[
                                        {
                                            label: 'Copy',
                                            icon: <IconCopy size={11} />,
                                            onClick: () => copyRoomCode(room.number),
                                        },
                                        {
                                            label: 'Open',
                                            icon: <IconPlay size={11} />,
                                            onClick: () => openRoom(room.number),
                                        },
                                        {
                                            label: 'End',
                                            icon: <IconStop size={9} />,
                                            onClick: () => endRoom(room.number),
                                        },
                                    ].map((b) => (
                                        <button
                                            key={b.label}
                                            onClick={b.onClick}
                                            className="inline-flex items-center gap-1 bg-transparent border border-border text-muted-hi rounded-lg px-2.5 py-1.5 font-sans text-[11px] cursor-pointer hover:text-cream hover:border-border-hi transition-colors"
                                        >
                                            {b.icon} {b.label}
                                        </button>
                                    ))}
                                </span>
                            </div>
                        ))}
                    </>
                )}
            </div>

            <RoomOptionsModal
                room={selectedRoom}
                onClose={() => setSelectedRoom(null)}
                openRoom={openRoom}
                copyRoomCode={copyRoomCode}
                endRoom={endRoom}
            />
        </div>
    )
}

export default RoomsPage
