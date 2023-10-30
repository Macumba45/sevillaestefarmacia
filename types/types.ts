export type User = {
    id?: string
    email?: string
    password?: string
    services?: Services[]
    name?: string
    role?: string
    phone?: string
    payment?: Payment[]
    birthdate?: string
    resetLink?: string
}

export type Services = {
    id?: string
    urlPicture: string
    urlVideo: string
    title: string
    subtitle: string
    descripcion: string
    dates?: Dates[]
    price: string
    priceId?: string | null
    createdAt?: Date
    updatedAt?: Date
    users?: User[]
    payment?: Payment[]
    service?: Services
}

export type Payment = {
    id: string
    user?: User
    date?: Dates
    hour?: Hour
    dateId?: string
    hourId?: string
    payed?: boolean
    createdAt?: Date
    service?: Services
}

export type Dates = {
    id?: string
    date: string
    hours: Hour[]
    serviceId?: string
    createdAt?: Date
    updatedAt?: Date
}

export type Hour = {
    id?: string
    hour?: string
    isBooked?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export type Talleres = {
    id?: string
    title: string
    subtitle: string
    descripcion: string
    urlPicture: string
}

export type Blogs = {
    id?: string
    title: string
    subtitle: string
    descripcion: string
    urlPicture: string
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
