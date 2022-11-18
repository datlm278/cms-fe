export interface Cinema {
    id?: number,
    name: string,
    releaseDate: string,
    director: string,
    poster: string,
    posterName: string,
    status?: number,
    createTime: string,
    updateTime: string,
    cinemaTypeId: number
    cinemaType: string,
    producerId: number,
    producerName: string
}
