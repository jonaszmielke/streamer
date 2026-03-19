import { Flex, rem, Table, Text, Title } from '@mantine/core'

type Room = {
    number: number
    owner: {
        id: string
        name: string
    }
    createdAt: Date
}

const mockRooms: Room[] = [
    {
        number: 1,
        owner: {
            id: '1',
            name: 'Owner 1',
        },
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    },
    {
        number: 2,
        owner: {
            id: '2',
            name: 'Owner 2',
        },
        createdAt: new Date(),
    },
    {
        number: 3,
        owner: {
            id: '3',
            name: 'Owner 3',
        },
        createdAt: new Date(),
    },
]

export const RoomsSection = () => {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            w="100%"
            mih={`calc(100vh - ${rem(70)})`}
            gap={12}
        >
            <Flex direction="column" align="center" justify="center" w="30%" gap={20}>
                <Title>Active rooms</Title>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <Text w="100%" ta="center" fw={700} fz={20}>
                                    Number
                                </Text>
                            </Table.Th>
                            <Table.Th>
                                <Text w="100%" ta="center" fw={700} fz={20}>
                                    Owner
                                </Text>
                            </Table.Th>
                            <Table.Th>
                                <Text w="100%" ta="center" fw={700} fz={20}>
                                    Live for
                                </Text>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {mockRooms.map((room) => (
                            <Table.Tr key={room.number}>
                                <Table.Td>
                                    <Text w="100%" ta="center">
                                        {room.number}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text w="100%" ta="center">
                                        {room.owner.name}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text w="100%" ta="center">
                                        {new Date(
                                            new Date().getTime() - room.createdAt.getTime()
                                        ).getTime()}
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Flex>
        </Flex>
    )
}
