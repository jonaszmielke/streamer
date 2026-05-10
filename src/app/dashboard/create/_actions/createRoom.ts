type CreateRoomProps = {
    roomName: string
    maxViewers: number
}

export const createRoom = async ({ roomName, maxViewers }: CreateRoomProps) => {
    // TODO: Implement proper room creation logic
    console.log('createRoom', roomName, maxViewers)
}
