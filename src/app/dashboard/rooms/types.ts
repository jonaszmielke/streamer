export type Room = {
    number: number
    owner: {
        id: string
        name: string
    }
    viewers: number
    createdAt: Date
}
