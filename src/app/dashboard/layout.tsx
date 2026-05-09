import isAdmin from '@/lib/isAdmin'
import { notFound } from 'next/navigation'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    if (!(await isAdmin())) notFound()

    return children
}
export default DashboardLayout
