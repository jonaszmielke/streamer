'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { DashboardHeader } from './components/Header'
import { CreateRoomSection } from './sections/create/CreateRoomSection'
import { RoomsSection } from './sections/rooms/RoomsSection'
import { UsersSection } from './sections/users/UsersSection'

export enum DashboardSections {
    Rooms = 'rooms',
    Create = 'create',
    Users = 'users',
}

const validSections = Object.values(DashboardSections) as string[]

const DashboardPage = () => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const sectionParam = searchParams.get('section')

    const activeSection = useMemo(() => {
        if (!sectionParam || !validSections.includes(sectionParam)) return DashboardSections.Rooms
        return sectionParam as DashboardSections
    }, [sectionParam])

    const setActiveSection = useCallback(
        (section: DashboardSections) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('section', section)
            router.replace(`?${params.toString()}`)
        },
        [searchParams, router]
    )

    useEffect(() => {
        if (!activeSection || !validSections.includes(activeSection)) {
            const params = new URLSearchParams(searchParams.toString())
            params.set('section', DashboardSections.Rooms)
            router.replace(`?${params.toString()}`)
        }
    }, [activeSection, searchParams, router])

    const renderSection = () => {
        switch (activeSection) {
            case DashboardSections.Rooms:
                return <RoomsSection />
            case DashboardSections.Create:
                return <CreateRoomSection />
            case DashboardSections.Users:
                return <UsersSection />
            default:
                return null
        }
    }

    return (
        <>
            <DashboardHeader activeSection={activeSection} setActiveSection={setActiveSection} />
            {renderSection()}
        </>
    )
}

export default DashboardPage
