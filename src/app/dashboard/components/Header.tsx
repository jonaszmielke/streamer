'use client'

import { DashboardSections } from '@/app/dashboard/types'
import { Wordmark } from '@/components/ui/wordmark'
import { cn } from '@/lib/utils'

type DashboardHeaderProps = {
    activeSection: DashboardSections
    setActiveSection: (section: DashboardSections) => void
}

export const DashboardHeader = ({ activeSection, setActiveSection }: DashboardHeaderProps) => {
    const tabs = Object.values(DashboardSections)

    return (
        <header className="flex items-center gap-8 px-8 py-5 border-b border-border">
            <Wordmark size={18} />

            <nav className="flex gap-5 flex-1">
                {tabs.map((section) => {
                    const active = activeSection === section
                    return (
                        <button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className={cn(
                                'font-mono text-[10px] uppercase tracking-[0.18em] pb-1.5 border-b transition-colors cursor-pointer bg-transparent border-x-0 border-t-0',
                                active
                                    ? 'text-cream border-b-beige'
                                    : 'text-muted-dim border-b-transparent hover:text-muted-hi'
                            )}
                        >
                            {section}
                        </button>
                    )
                })}
            </nav>

            {/* TODO: wire to session (next-auth SessionProvider not yet added to layout) */}
            <div className="flex items-center gap-2 bg-surface border border-border rounded-full pl-1 pr-3 py-1">
                <div className="w-7 h-7 rounded-full bg-beige text-background font-mono text-[11px] font-semibold flex items-center justify-center shrink-0">
                    —
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-hi">
                    user
                </span>
            </div>
        </header>
    )
}
