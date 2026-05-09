import { PinEntry } from '@/components/pinEntry'
import { Wordmark } from '@/components/ui/wordmark'
import { LabelTag } from '@/components/ui/labelTag'
import { DisplayHeading } from '@/components/ui/displayHeading'
import Link from 'next/link'

const MainPage = () => {
    return (
        <main className="flex flex-col min-h-dvh px-10 py-8">
            <header className="flex justify-between items-baseline">
                <Wordmark size={18} />
                <Link
                    href="/login"
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-hi hover:text-cream transition-colors"
                >
                    Sign in →
                </Link>
            </header>

            <div className="flex-1 flex flex-col justify-center max-w-[520px] mx-auto w-full">
                <LabelTag className="block mb-5">— Issue 001 · Watch together</LabelTag>
                <DisplayHeading className="text-[56px] leading-none italic mb-3">
                    Enter the
                    <br />
                    <span className="not-italic text-beige">six&#8209;digit code.</span>
                </DisplayHeading>
                <p className="text-muted-hi text-sm mb-8 max-w-[380px]">
                    A private room, opened by your host. No account needed to watch.
                </p>
                <PinEntry />
            </div>

            <footer className="flex justify-end">
                <LabelTag>v0.4</LabelTag>
            </footer>
        </main>
    )
}

export default MainPage
