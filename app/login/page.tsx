'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button, Flex, PasswordInput, rem, Text, TextInput, Title } from '@mantine/core'
import { theme } from '@/shared/theme'

const LoginPage = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if (result?.error) {
            setError('Invalid email or password')
        } else {
            router.push('/')
        }
    }

    return (
        <Flex flex={1} mih="100vh" justify="center" align="center">
            <Flex direction="column" align="center" gap={12}>
                <Title c={theme.white[0]} size={100} mb="10vh">
                    Streamer
                </Title>
                <form onSubmit={handleSubmit}>
                    <Flex
                        direction="column"
                        align="center"
                        gap={24}
                        bd={`2px solid ${theme.violet[0]}`}
                        bdrs={36}
                        py={36}
                        px={48}
                        bg={theme.gray[1]}
                    >
                        <Text c={theme.white[0]} size={rem(24)}>
                            Sign in
                        </Text>
                        <TextInput
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            required
                            w={300}
                        />
                        <PasswordInput
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            required
                            w={300}
                        />
                        {error && (
                            <Text c="red" size="sm">
                                {error}
                            </Text>
                        )}
                        <Button
                            type="submit"
                            color={theme.violet[0]}
                            variant="filled"
                            size="md"
                            loading={loading}
                            styles={{ root: { cursor: 'default' } }}
                        >
                            Sign in
                        </Button>
                    </Flex>
                </form>
            </Flex>
        </Flex>
    )
}

export default LoginPage
