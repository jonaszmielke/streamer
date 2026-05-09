'use client'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { ArrowButton } from '@/components/ui/arrowButton'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const PinEntry = () => {
    const router = useRouter()
    const [value, setValue] = useState<string>('')

    const handleJoin = () => {
        if (value.length === 6) {
            router.push(`/room/${value}`)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <InputOTP maxLength={6} value={value} onChange={setValue}>
                <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <InputOTPSlot key={i} index={i} />
                    ))}
                </InputOTPGroup>
            </InputOTP>
            <ArrowButton
                onClick={handleJoin}
                disabled={value.length < 6}
                variant={value.length === 6 ? 'filled' : 'outline'}
            >
                Join the room
            </ArrowButton>
        </div>
    )
}
