'use client'

import { createUser } from '../_actions/createUser'
import { ArrowButton } from '@/components/ui/arrowButton'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Accent, DisplayHeading } from '@/components/ui/displayHeading'
import { LabelTag } from '@/components/ui/labelTag'
import { cn } from '@/lib/utils'
import { queryKeys } from '@/shared/queryKeys'
import { Role } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

type AddUserModalProps = {
    open: boolean
    onClose: () => void
}

export const AddUserModal = ({ open, onClose }: AddUserModalProps) => {
    const queryClient = useQueryClient()
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [role, setRole] = useState<Role>(Role.USER)

    const resetForm = useCallback(() => {
        setName('')
        setEmail('')
        setRole(Role.USER)
    }, [])

    const handleClose = useCallback(() => {
        resetForm()
        onClose()
    }, [onClose, resetForm])

    const createUserMutation = useMutation({
        mutationFn: () => createUser({ name, email, role }),
        onSuccess: (result) => {
            if (result.success) {
                queryClient.invalidateQueries({ queryKey: [queryKeys.users] })
                handleClose()
            }
        },
    })

    const error =
        createUserMutation.data && !createUserMutation.data.success
            ? createUserMutation.data.error
            : null

    return (
        <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
            <DialogContent
                showCloseButton={false}
                className={cn(
                    'fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 max-w-none w-full h-full rounded-none p-8 gap-0',
                    'bg-background ring-1 ring-border-hi',
                    'sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2',
                    'sm:h-auto sm:max-w-[460px] sm:rounded-xl'
                )}
            >
                <DialogTitle className="sr-only">Add user</DialogTitle>

                <DisplayHeading className="text-[38px] mb-8">
                    Make an <Accent>account.</Accent>
                </DisplayHeading>

                <div className="mb-7">
                    <label className="block border-t border-b border-border py-3.5">
                        <LabelTag className="block mb-1.5">Username</LabelTag>
                        <input
                            type="text"
                            placeholder="maya.k"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-cream font-mono text-base placeholder:text-muted-dim"
                        />
                    </label>
                    <label className="block border-b border-border py-3.5">
                        <LabelTag className="block mb-1.5">Email</LabelTag>
                        <input
                            type="email"
                            placeholder="you@domain"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-cream font-sans text-base placeholder:text-muted-dim"
                        />
                    </label>
                    <div className="border-b border-border py-3.5">
                        <LabelTag className="block mb-3">Role</LabelTag>
                        <div className="flex gap-2">
                            {[Role.USER, Role.ADMIN].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRole(r)}
                                    className={cn(
                                        'font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border transition-colors cursor-pointer',
                                        role === r
                                            ? 'bg-beige text-background border-beige'
                                            : 'bg-transparent text-muted-hi border-border hover:border-border-hi'
                                    )}
                                >
                                    {r.toLowerCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {error && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-destructive mb-4">
                        {error}
                    </p>
                )}

                <div className="flex flex-col gap-5">
                    <ArrowButton
                        onClick={() => createUserMutation.mutate()}
                        disabled={!name || !email || createUserMutation.isPending}
                    >
                        Create user
                    </ArrowButton>
                    <button
                        onClick={handleClose}
                        className="w-full bg-transparent text-cream border border-border rounded-sm px-5 py-4 text-[13px] font-sans cursor-pointer hover:border-border-hi transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
