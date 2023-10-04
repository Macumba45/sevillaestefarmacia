export type User = {
    id: string
    email: string
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
    id: string
    urlPicture: string
    title: string
    descripcion: string
    price: number
    createdAt: Date
    updatedAt: Date
}
