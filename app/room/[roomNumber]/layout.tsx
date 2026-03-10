import { MediaPlayer } from '@vidstack/react'

import '@vidstack/react/player/styles/default/theme.css'

export const metadata = {
    title: 'Streamer',
    description: "Jonasz's streaming app",
}

const RoomLayout = ({ children }: { children: any }) => {
    return (
        <MediaPlayer
            title="Sprite Fight"
            src="https://files.vidstack.io/sprite-fight/720p.mp4"
            style={{ maxHeight: '100vh' }}
        >
            {children}
        </MediaPlayer>
    )
}

export default RoomLayout
