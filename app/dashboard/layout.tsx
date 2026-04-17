import { notFound } from 'next/navigation'
import isAdmin from '@/lib/isAdmin'

const DashboardLayout = async ({ children }: { children: any }) => {
    if (!(await isAdmin())) notFound()

    return children
}
export default DashboardLayout
