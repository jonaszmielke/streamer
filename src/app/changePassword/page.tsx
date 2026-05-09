'use client'

import { changePassword } from './_actions/changePassword'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ChangePasswordPage = () => {
    const router = useRouter()

    const [newPassword, setNewPassword] = useState<string>('')

    const changePasswordMutation = useMutation({
        mutationFn: () => changePassword({ newPassword }),
        onSuccess: () => {
            router.push('/')
        },
    })

    return (
        <div>
            <p>Change Password</p>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={() => changePasswordMutation.mutate()}>Change Password</button>
        </div>
    )
}

export default ChangePasswordPage
