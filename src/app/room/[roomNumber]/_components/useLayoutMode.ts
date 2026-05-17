'use client'

import { useSyncExternalStore } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

type LayoutMode = 'cinema' | 'portrait'

const PORTRAIT_QUERY = '(orientation: portrait)'

function subscribeOrientation(cb: () => void) {
    const mql = window.matchMedia(PORTRAIT_QUERY)
    mql.addEventListener('change', cb)
    return () => mql.removeEventListener('change', cb)
}

function getOrientationSnapshot() {
    return window.matchMedia(PORTRAIT_QUERY).matches
}

function getOrientationServerSnapshot() {
    return false
}

export const useLayoutMode = (): LayoutMode => {
    const isMobile = useIsMobile()
    const isPortrait = useSyncExternalStore(
        subscribeOrientation,
        getOrientationSnapshot,
        getOrientationServerSnapshot
    )
    return isMobile && isPortrait ? 'portrait' : 'cinema'
}
