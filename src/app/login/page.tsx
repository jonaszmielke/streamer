'use client'

import { login } from './actions/login'
import { ArrowButton } from '@/components/ui/arrowButton'
import { Accent, DisplayHeading } from '@/components/ui/displayHeading'
import { LabelTag } from '@/components/ui/labelTag'
import { Wordmark } from '@/components/ui/wordmark'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const router = useRouter()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const loginMutation = useMutation({
        mutationFn: () => login({ email, password }),
        onSuccess: () => {
            router.push('/dashboard')
        },
    })

    return (
        <main className="flex flex-col min-h-dvh px-10 py-8">
            <header>
                <Wordmark size={18} />
            </header>

            <div className="flex-1 flex flex-col justify-center max-w-[420px] mx-auto w-full">
                <DisplayHeading className="text-[44px] leading-[1.05] mb-8">
                    Welcome <Accent>back.</Accent>
                </DisplayHeading>

                <div>
                    <label className="block border-t border-b border-border py-3.5">
                        <LabelTag className="block mb-1.5">Email</LabelTag>
                        <input
                            type="email"
                            placeholder="you@domain"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-cream font-sans text-base placeholder:text-muted-dim"
                        />
                    </label>
                    <label className="block border-b border-border py-3.5">
                        <LabelTag className="block mb-1.5">Password</LabelTag>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-cream font-sans text-base placeholder:text-muted-dim"
                        />
                    </label>
                </div>

                <div className="mt-7">
                    <ArrowButton onClick={() => loginMutation.mutate()}>Continue</ArrowButton>
                </div>
            </div>
        </main>
    )
}

export default LoginPage
