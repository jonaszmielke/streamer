import isAdmin from '@/lib/isAdmin'
import { notFound } from 'next/navigation'
import { DashboardHeader } from './components/Header'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    if (!(await isAdmin())) notFound()

    return (
        <>
            <DashboardHeader />
            {children}
        </>
    )
}
export default DashboardLayout
