type Choice = {
    stateDate: string,
    endDate: string,
    pickup: string,
    dropoff: string
}

export interface userModel {
    _id: string
    name: string
    email: string
    phone: number
    password: string
    isBlocked: boolean
    __v: number
    choices: Choice | null
    profile: string
}