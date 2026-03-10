'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Flex, PinInput, rem, Text, Title } from '@mantine/core'
import { theme } from '@/shared/theme'

const HomePage = () => {
    const [roomNumber, setRoomNumber] = useState<string>('')

    return (
        <Flex flex={1} mih="100vh" justify="center" align="center">
            <Flex direction="column" align="center" gap={12}>
                <Title c={theme.white[0]} size={100} mb="10vh">
                    Streamer
                </Title>
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
                        Input room code
                    </Text>
                    <PinInput length={6} size="xl" value={roomNumber} onChange={setRoomNumber} />
                    <Link
                        href={`/room/${roomNumber}`}
                        onClick={(e) => roomNumber.length !== 6 && e.preventDefault()}
                    >
                        <Button
                            disabled={roomNumber.length !== 6}
                            color={theme.violet[0]}
                            variant="filled"
                            size="md"
                            styles={{
                                root: {
                                    cursor: 'default',
                                },
                            }}
                        >
                            Join
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default HomePage
