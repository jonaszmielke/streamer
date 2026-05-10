'use client'

import { DashboardSections } from '@/app/dashboard/types'
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer'
import { Wordmark } from '@/components/ui/wordmark'
import { cn } from '@/lib/utils'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const tabs = Object.values(DashboardSections)

const hrefFor = (section: DashboardSections) => `/dashboard/${section}`

const UserBadge = ({ className }: { className?: string }) => (
    <div
        className={cn(
            'flex items-center gap-2 bg-surface border border-border rounded-full pl-1 pr-3 py-1',
            className
        )}
    >
        <div className="w-7 h-7 rounded-full bg-beige text-background font-mono text-[11px] font-semibold flex items-center justify-center shrink-0">
            U
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-hi">
            user
        </span>
    </div>
)

export const DashboardHeader = () => {
    const pathname = usePathname()
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

    const isActive = (section: DashboardSections) => pathname === hrefFor(section)

    return (
        <>
            <header className="flex items-center gap-8 px-8 py-5 border-b border-border">
                <Wordmark size={18} />

                <nav className="hidden md:flex justify-center gap-5 flex-1">
                    {tabs.map((section) => {
                        const active = isActive(section)
                        return (
                            <Link
                                key={section}
                                href={hrefFor(section)}
                                className={cn(
                                    'font-mono text-[10px] uppercase tracking-[0.18em] pb-1.5 border-b transition-colors cursor-pointer bg-transparent border-x-0 border-t-0 no-underline',
                                    active
                                        ? 'text-cream border-b-beige'
                                        : 'text-muted-dim border-b-transparent hover:text-muted-hi'
                                )}
                            >
                                {section}
                            </Link>
                        )
                    })}
                </nav>

                {/* TODO: wire to session (next-auth SessionProvider not yet added to layout) */}
                <UserBadge className="hidden md:flex" />

                <div className="flex-1 md:hidden" />
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="md:hidden bg-transparent border-none text-muted-hi hover:text-cream transition-colors cursor-pointer p-1 -mr-1"
                    aria-label="Open menu"
                >
                    <MenuIcon size={20} />
                </button>
            </header>

            <Drawer direction="right" open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent className="fixed top-0 right-0 bottom-0 left-auto h-dvh w-1/2 max-w-none rounded-none border-l border-border bg-background p-6">
                    <DrawerTitle className="sr-only">Navigation</DrawerTitle>

                    <UserBadge className="self-start" />

                    <nav className="flex flex-col mt-6 pt-6 border-t border-border gap-1">
                        {tabs.map((section) => {
                            const active = isActive(section)
                            return (
                                <Link
                                    key={section}
                                    href={hrefFor(section)}
                                    onClick={() => setDrawerOpen(false)}
                                    className={cn(
                                        'font-mono text-[10px] uppercase tracking-[0.18em] text-left px-3 py-3 rounded-sm transition-colors cursor-pointer bg-transparent border-l-2 no-underline',
                                        active
                                            ? 'text-cream border-l-beige'
                                            : 'text-muted-dim border-l-transparent hover:text-muted-hi'
                                    )}
                                >
                                    {section}
                                </Link>
                            )
                        })}
                    </nav>
                </DrawerContent>
            </Drawer>
        </>
    )
}
