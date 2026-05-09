import { DashboardSections } from '@/app/dashboard/types'

type DashboardHeaderProps = {
    activeSection: DashboardSections
    setActiveSection: (section: DashboardSections) => void
}

export const DashboardHeader = ({ activeSection, setActiveSection }: DashboardHeaderProps) => {
    return Object.values(DashboardSections).map((section) => (
        <p
            key={section}
            onClick={() => {
                setActiveSection(section)
            }}
            className={`text-xl cursor-pointer ${activeSection === section ? 'underline' : ''}`}
        >
            {section}
        </p>
    ))
}
