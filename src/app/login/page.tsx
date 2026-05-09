'use client'

import { login } from './actions/login'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const loginMutation = useMutation({
        mutationFn: () => login({ email, password }),
        onSuccess: () => {},
    })

    return (
        <div>
            <p>Login</p>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => loginMutation.mutate()}>Login</button>
        </div>
    )
}

export default LoginPage
