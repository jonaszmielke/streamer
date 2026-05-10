import { redirect } from 'next/navigation'
import { DashboardSections } from './types'

const DashboardPage = () => {
    redirect(`/dashboard/${DashboardSections.Rooms}`)
}

export default DashboardPage
