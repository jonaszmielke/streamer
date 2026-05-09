import { createUser } from '../_actions/createUser'
import { Role } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

type AddUserModalProps = {
    open: boolean
    onClose: () => void
}

export const AddUserModal = ({ open, onClose }: AddUserModalProps) => {
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
        onSuccess: handleClose,
    })

    if (!open) return null

    return (
        <div>
            <p>Add User</p>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
                <option value={Role.USER}>{Role.USER}</option>
                <option value={Role.ADMIN}>{Role.ADMIN}</option>
            </select>
            <button onClick={() => createUserMutation.mutate()}>Add User</button>
            <button onClick={handleClose}>Cancel</button>
        </div>
    )
}
