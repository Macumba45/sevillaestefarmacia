export type User = {
    id: string
    email?: string
    password?: string
    name?: string
    role?: string
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
    descripcion: string
    dates?: string[]
    price: string
    createdAt?: Date
    updatedAt?: Date
}

export type Dates = {
    id?: string
    dates: string[]
    serviceId: string
    createdAt?: Date
    updatedAt?: Date
}
