'use client'

import { formatRoomCode, LiveDuration } from '../_utils'
import { Room } from '../types'
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer'
import { IconArrow, IconCopy, IconEye, IconPlay, IconStop } from '@/components/ui/icons'
import { LabelTag } from '@/components/ui/labelTag'

type ActionRowVariant = 'primary' | 'default' | 'danger'

type ActionRowProps = {
    icon: React.ReactNode
    label: string
    hint: string
    mono?: boolean
    variant?: ActionRowVariant
    onClick: () => void
}

const ActionRow = ({ icon, label, hint, mono, variant = 'default', onClick }: ActionRowProps) => {
    const isPrimary = variant === 'primary'
    const isDanger = variant === 'danger'

    return (
        <button
            onClick={onClick}
            className={[
                'w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-left cursor-pointer border',
                isPrimary
                    ? 'bg-beige text-background border-transparent'
                    : isDanger
                      ? 'bg-transparent text-[#e8a89e] border-border'
                      : 'bg-transparent text-cream border-border',
            ].join(' ')}
        >
            <span
                className={[
                    'w-[30px] h-[30px] rounded-lg flex items-center justify-center shrink-0',
                    isPrimary ? 'bg-black/10' : isDanger ? 'bg-[#e8a89e]/10' : 'bg-surface-2',
                ].join(' ')}
            >
                {icon}
            </span>
            <span className="flex-1 min-w-0">
                <span
                    className={[
                        'block text-[14px]',
                        isPrimary
                            ? 'font-serif font-semibold tracking-[-0.01em]'
                            : 'font-sans font-medium',
                    ].join(' ')}
                >
                    {label}
                </span>
                <span
                    className={[
                        'block text-[11px] mt-0.5',
                        isPrimary
                            ? 'text-background/55'
                            : isDanger
                              ? 'text-[#e8a89e]/65'
                              : 'text-muted-dim',
                        mono ? 'font-mono tracking-wider' : 'font-sans',
                    ].join(' ')}
                >
                    {hint}
                </span>
            </span>
            <span className="opacity-60">
                <IconArrow size={14} />
            </span>
        </button>
    )
}

type RoomOptionsModalProps = {
    room: Room | null
    onClose: () => void
    openRoom: (roomNumber: number) => void
    copyRoomCode: (roomNumber: number) => void
    endRoom: (roomNumber: number) => void
}

export const RoomOptionsModal = ({
    room,
    onClose,
    openRoom,
    copyRoomCode,
    endRoom,
}: RoomOptionsModalProps) => {
    if (!room) return null

    return (
        <Drawer direction="bottom" open onOpenChange={(open) => !open && onClose()}>
            <DrawerContent className="bg-surface border-border px-[18px] pb-6">
                <DrawerTitle className="sr-only">Room {formatRoomCode(room.number)}</DrawerTitle>

                {/* Summary header */}
                <div className="flex justify-between items-start mb-4 mt-4">
                    <div>
                        <LabelTag className="block mb-1.5">Room code</LabelTag>
                        <p className="font-serif font-semibold text-[34px] leading-none tracking-[-0.02em] text-cream">
                            {formatRoomCode(room.number)}
                        </p>
                        <p className="text-muted-hi text-[13px] mt-2">@{room.owner.name}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-beige/10 text-beige px-2.5 py-1 rounded-full mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-beige shadow-[0_0_0_3px_rgba(232,220,196,0.2)]" />
                        <LabelTag className="text-beige">Live</LabelTag>
                    </span>
                </div>

                {/* Stat strip */}
                <div className="flex bg-surface-2 border border-border rounded-xl overflow-hidden mb-4">
                    <div className="flex-1 px-3.5 py-3">
                        <LabelTag className="block mb-1.5">Viewers</LabelTag>
                        <span className="font-serif font-semibold text-[22px] text-cream leading-none inline-flex items-center gap-2">
                            <IconEye size={14} /> {room.viewers}
                        </span>
                    </div>
                    <div className="w-px bg-border" />
                    <div className="flex-1 px-3.5 py-3">
                        <LabelTag className="block mb-1.5">Live for</LabelTag>
                        <LiveDuration createdAt={room.createdAt} />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 mb-3">
                    <ActionRow
                        variant="primary"
                        icon={<IconPlay size={13} />}
                        label="Open room"
                        hint="Join as host"
                        onClick={() => {
                            openRoom(room.number)
                            onClose()
                        }}
                    />
                    <ActionRow
                        icon={<IconCopy size={13} />}
                        label="Copy code"
                        hint={formatRoomCode(room.number)}
                        mono
                        onClick={() => {
                            copyRoomCode(room.number)
                            onClose()
                        }}
                    />
                    <ActionRow
                        variant="danger"
                        icon={<IconStop size={11} />}
                        label="End room"
                        hint="Closes for all viewers"
                        onClick={() => {
                            endRoom(room.number)
                            onClose()
                        }}
                    />
                </div>

                {/* Cancel */}
                <button
                    onClick={onClose}
                    className="w-full py-3.5 bg-transparent text-muted-hi border border-border rounded-xl font-sans text-[13px] cursor-pointer"
                >
                    Cancel
                </button>
            </DrawerContent>
        </Drawer>
    )
}
