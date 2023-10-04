export type usersDashboard = {
    email: string
}

export type LoginRequestBody = {
    email: string
    password: string
}

export type SuccessResponse = {
    message: string
    user: usersDashboard
}
