import { IChoiceModel } from "./choice.interface"

export interface IUserModel {
    _id: string
    name: string
    email: string
    phone: number
    password: string
    isBlocked: boolean
    __v: number
    choices: IChoiceModel | null
    profile: string
    wallet: number
}

export interface IIsBookingCompleted {
    hasCompletedBooking: boolean
}