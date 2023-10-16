export type User = {
    id?: string
    email?: string
    password?: string
    name?: string
    role?: string
    phone?: string
    birthdate?: string
}

export type LoginRequestBody = {
    email: string
    password: string
}

export type SuccessResponse = {
    message: string
    user: User
    token: string
}

export type Services = {
    id?: string
    urlPicture: string
    urlVideo: string
    title: string
    subtitle: string
    descripcion: string
    dates?: { date: string; hours: string[] }[] // Cambia el nombre de la propiedad
    price: string
    createdAt?: Date
    updatedAt?: Date
}

export type ServiceData = {
    title: string
    subtitle: string
    descripcion: string
    pictureUrl: string
    videoUrl: string
}

export type Dates = {
    id?: string
    dates: string
    serviceId: string
    createdAt?: Date
    updatedAt?: Date
}

export type Hours = {
    id?: string
    hours: string[]
    isBooked: boolean
    dateId: string
    createdAt?: Date
    updatedAt?: Date
}
