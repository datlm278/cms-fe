import {FileHandle} from "./file-handle.model";

export interface Cinema {
    id?: number,
    name: string,
    releaseDate: string,
    director: string,
    status?: number,
    createTime: string,
    updateTime: string,
    cinemaTypeId?: number
    cinemaType: string,
    producerId?: number,
    producerName: string,
    images: FileHandle[]
}
