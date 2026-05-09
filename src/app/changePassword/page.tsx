'use client'

import { changePassword } from './_actions/changePassword'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wordmark } from '@/components/ui/wordmark'
import { DisplayHeading, Accent } from '@/components/ui/displayHeading'
import { LabelTag } from '@/components/ui/labelTag'
import { ArrowButton } from '@/components/ui/arrowButton'

const ChangePasswordPage = () => {
    const router = useRouter()
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const changePasswordMutation = useMutation({
        mutationFn: () => changePassword({ newPassword }),
        onSuccess: () => {
            router.push('/')
        },
    })

    const canSubmit = newPassword.length > 0 && newPassword === confirmPassword

    return (
        <main className="flex flex-col min-h-dvh px-10 py-8">
            <header>
                <Wordmark size={18} />
            </header>

            <div className="flex-1 flex flex-col justify-center max-w-[420px] mx-auto w-full">
                <LabelTag className="block mb-3.5">— First login</LabelTag>
                <DisplayHeading className="text-[44px] leading-[1.05] mb-3">
                    Set a new <Accent>password.</Accent>
                </DisplayHeading>
                <p className="text-muted-hi text-sm mb-7 max-w-[360px]">
                    You signed in with a temporary password. Choose your own to continue.
                </p>

                <div>
                    <label className="block border-t border-b border-border py-3.5">
                        <LabelTag className="block mb-1.5">New password</LabelTag>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-cream font-sans text-base placeholder:text-muted-dim"
                        />
                    </label>
                    <label className="block border-b border-border py-3.5">
                        <LabelTag className="block mb-1.5">Confirm password</LabelTag>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-cream font-sans text-base placeholder:text-muted-dim"
                        />
                    </label>
                </div>

                <div className="mt-7">
                    <ArrowButton
                        onClick={() => changePasswordMutation.mutate()}
                        disabled={!canSubmit}
                    >
                        Save and continue
                    </ArrowButton>
                </div>
            </div>
        </main>
    )
}

export default ChangePasswordPage
