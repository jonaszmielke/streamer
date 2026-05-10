'use client'

import { useRooms } from './_hooks/useRooms'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LabelTag } from '@/components/ui/labelTag'
import { DisplayHeading, Accent } from '@/components/ui/displayHeading'
import { IconPlus, IconCopy, IconPlay, IconStop, IconEye } from '@/components/ui/icons'

const LiveDuration = ({ createdAt }: { createdAt: Date }) => {
    const [duration, setDuration] = useState<string>('—')

    useEffect(() => {
        const updateDuration = () => {
            const totalSeconds = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000)
            const h = Math.floor(totalSeconds / 3600)
            const m = Math.floor((totalSeconds % 3600) / 60)
            const s = totalSeconds % 60
            setDuration(
                `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
            )
        }
        updateDuration()
        const interval = setInterval(updateDuration, 1000)
        return () => clearInterval(interval)
    }, [createdAt])

    return <span className="font-mono text-[12px] text-muted-hi">{duration}</span>
}

const formatRoomCode = (num: number) => {
    const s = String(num).padStart(6, '0')
    return `${s.slice(0, 3)} ${s.slice(3)}`
}

const RoomsPage = () => {
    const router = useRouter()
    const [search, setSearch] = useState<string>('')
    const { rooms, lastElementRef, isLoading } = useRooms(search)

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
                    { label: 'Open rooms', value: String(rooms.length) },
                    { label: 'Live now', value: String(rooms.length), accent: true },
                    { label: 'Total viewers', value: '—' }, // TODO: add viewer count to Room type
                    { label: 'Peak today', value: '—' },    // TODO: track peak in server action
                ].map((s) => (
                    <div
                        key={s.label}
                        className="flex-1 bg-surface border border-border rounded-2xl p-4"
                    >
                        <LabelTag className="block">{s.label}</LabelTag>
                        <p
                            className={`font-serif font-semibold text-[28px] tracking-[-0.02em] mt-1 ${s.accent ? 'text-beige' : 'text-cream'}`}
                        >
                            {s.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Table card */}
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                {/* Card header */}
                <div className="flex justify-between items-center px-[18px] py-3.5 border-b border-border">
                    <div className="flex items-center gap-4">
                        <span className="font-sans font-semibold text-[15px] text-cream">
                            Active rooms
                        </span>
                        <input
                            type="text"
                            placeholder="Search…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-surface-2 border border-border rounded-full px-3 py-1.5 text-[13px] text-cream font-sans outline-none placeholder:text-muted-dim w-48"
                        />
                    </div>
                    <button
                        onClick={() => router.push('/dashboard/create')}
                        className="flex items-center gap-1.5 bg-beige text-background rounded-[10px] px-3 py-2 font-sans font-semibold text-[12px] cursor-pointer border-none"
                    >
                        <IconPlus size={12} /> New
                    </button>
                </div>

                {rooms.length === 0 ? (
                    <div className="px-[18px] py-8">
                        <p className="font-serif italic text-muted-hi">No rooms found.</p>
                    </div>
                ) : (
                    <>
                        {/* Column headers */}
                        <div className="grid grid-cols-[1fr_1fr_100px_140px_1fr] px-[18px] py-2.5 border-b border-border">
                            {['Code', 'Owner', 'Viewers', 'Live for', 'Actions'].map((h) => (
                                <LabelTag key={h} className={h === 'Actions' ? 'text-right' : ''}>
                                    {h}
                                </LabelTag>
                            ))}
                        </div>

                        {/* Rows */}
                        {rooms.map((room, index) => (
                            <div
                                key={room.number}
                                ref={index === rooms.length - 1 ? lastElementRef : undefined}
                                className="grid grid-cols-[1fr_1fr_100px_140px_1fr] px-[18px] py-3.5 items-center border-b border-border last:border-b-0 text-[13px]"
                            >
                                <span className="flex items-center gap-2 font-mono text-cream tracking-[0.05em]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-beige shadow-[0_0_0_3px_rgba(232,220,196,0.13)]" />
                                    {formatRoomCode(room.number)}
                                </span>
                                <span className="text-muted-hi">@{room.owner.name}</span>
                                <span className="text-cream">
                                    <span className="inline-flex items-center gap-1.5">
                                        <IconEye size={12} /> —
                                    </span>
                                </span>
                                <LiveDuration createdAt={room.createdAt} />
                                <span className="flex justify-end gap-1.5">
                                    {[
                                        {
                                            label: 'Copy',
                                            icon: <IconCopy size={11} />,
                                            onClick: () => {}, // TODO: copy room code to clipboard
                                        },
                                        {
                                            label: 'Open',
                                            icon: <IconPlay size={11} />,
                                            onClick: () => router.push(`/room/${room.number}`),
                                        },
                                        {
                                            label: 'End',
                                            icon: <IconStop size={9} />,
                                            onClick: () => {}, // TODO: end room server action
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
        </div>
    )
}

export default RoomsPage
