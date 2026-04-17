'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Flex, PasswordInput, rem, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { theme } from '@/shared/theme'
import { register } from './_actions/register.action'

type RegisterFormValues = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const RegisterPage = () => {
    const router = useRouter()
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<RegisterFormValues>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: {
            username: (value) => (value.length > 0 ? null : 'Username is required'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
            confirmPassword: (value, values) =>
                value === values.password ? null : 'Passwords do not match',
        },
    })

    const handleSubmit = async (values: RegisterFormValues) => {
        setError('')
        setLoading(true)

        try {
            const result = await register({
                name: values.username,
                email: values.email,
                password: values.password,
            })

            if (!result.success) {
                setError(result.error || 'Registration failed')
            } else {
                router.push('/')
                router.refresh()
            }
        } catch {
            setError('An error occurred during registration')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex flex={1} mih="100vh" justify="center" align="center">
            <Flex direction="column" align="center" gap={12}>
                <Title c={theme.white[0]} size={100} mb="10vh">
                    Streamer
                </Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
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
                            Sign up
                        </Text>
                        <TextInput label="Username" w={300} {...form.getInputProps('username')} />
                        <TextInput label="Email" type="email" w={300} {...form.getInputProps('email')} />
                        <PasswordInput label="Password" w={300} {...form.getInputProps('password')} />
                        <PasswordInput
                            label="Confirm Password"
                            w={300}
                            {...form.getInputProps('confirmPassword')}
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
                            Sign up
                        </Button>
                    </Flex>
                </form>
            </Flex>
        </Flex>
    )
}

export default RegisterPage
