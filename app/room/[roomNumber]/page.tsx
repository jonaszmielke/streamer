'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { IconVolume } from '@tabler/icons-react'
import { FullscreenButton, MediaProvider, useMediaStore, VolumeSlider } from '@vidstack/react'
import { FullscreenExitIcon, FullscreenIcon } from '@vidstack/react/icons'
import { Box, Flex, rem, Text } from '@mantine/core'

const RoomPage = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const { roomNumber } = useParams()
    const { fullscreen } = useMediaStore()

    if (!mounted) return null

    return (
        <Flex flex={1} direction="column" mih="100vh" align="center" gap={12} p={24}>
            {!fullscreen && (
                <Text w="100%" ta="left" size={rem(24)}>
                    Room {roomNumber}
                </Text>
            )}

            <Flex
                w="100%"
                h={`calc(100vh - ${rem(84)})`}
                justify="center"
                align="center"
                direction="column"
                gap={12}
            >
                <Box w="80%">
                    <MediaProvider style={{ borderRadius: rem(36) }} />
                </Box>
                <Flex direction="row" gap={12} align="center" justify="center" w={250}>
                    <IconVolume size={24} />
                    <VolumeSlider.Root className="vds-slider">
                        <VolumeSlider.Track className="vds-slider-track" />
                        <VolumeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                        <VolumeSlider.Thumb className="vds-slider-thumb" />
                    </VolumeSlider.Root>
                    <FullscreenButton className="vds-button">
                        {fullscreen ? (
                            <FullscreenIcon className="fs-enter-icon vds-icon" />
                        ) : (
                            <FullscreenExitIcon className="fs-exit-icon vds-icon" />
                        )}
                    </FullscreenButton>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default RoomPage
