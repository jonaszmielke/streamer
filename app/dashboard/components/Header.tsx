import { Flex, Text } from '@mantine/core'
import { DashboardSections } from '@/app/dashboard/page'

type DashboardHeaderProps = {
    activeSection: DashboardSections
    setActiveSection: (section: DashboardSections) => void
}

export const DashboardHeader = ({ activeSection, setActiveSection }: DashboardHeaderProps) => {
    return (
        <Flex direction="column" align="center" justify="center" w="100%">
            <Flex direction="row" align="center" justify="space-around" w="60%" my={18}>
                {Object.values(DashboardSections).map((section) => (
                    <Text
                        key={section}
                        styles={{
                            root: {
                                borderBottom:
                                    activeSection === section ? '2px solid white' : 'none',
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                            },
                        }}
                        onClick={() => {
                            setActiveSection(section)
                        }}
                    >
                        {section}
                    </Text>
                ))}
            </Flex>
        </Flex>
    )
}
