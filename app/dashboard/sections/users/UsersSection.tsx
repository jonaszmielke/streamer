'use client'

import { Flex, Group, Loader, rem, Table, Text } from '@mantine/core'
import { useUsers } from '@/app/dashboard/sections/users/_hooks/useUsers'
import useFetchMoreObserver from '@/lib/useFetchMoreObserver'

export const UsersSection = () => {
    const { users, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useUsers()

    const { lastElementRef } = useFetchMoreObserver({
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    })

    if (isLoading)
        return (
            <Group justify="center" py="xl">
                <Loader />
            </Group>
        )

    if (users.length === 0) return <Text c="dimmed">No users found.</Text>

    return (
        <Flex
            direction="column"
            align="center"
            w="100%"
            mih={`calc(100vh - ${rem(70)})`}
            justify="flex-start"
            pt={60}
            gap={12}
        >
            <Flex direction="column" align="center" justify="center" w="30%" gap={20}>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Role</Table.Th>
                            <Table.Th>Last active</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {users.map((user, index) => {
                            const isLast = index === users.length - 1
                            return (
                                <Table.Tr key={user.id} ref={isLast ? lastElementRef : undefined}>
                                    <Table.Td>{user.name}</Table.Td>
                                    <Table.Td>{user.role}</Table.Td>
                                    <Table.Td>
                                        {new Date(user.lastActive).toLocaleDateString()}
                                    </Table.Td>
                                </Table.Tr>
                            )
                        })}
                    </Table.Tbody>
                </Table>
                {isFetchingNextPage && (
                    <Group justify="center" py="sm">
                        <Loader size="sm" />
                    </Group>
                )}
            </Flex>
        </Flex>
    )
}
