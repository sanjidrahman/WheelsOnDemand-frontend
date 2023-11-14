import { IUserModel } from "./user.model"

export interface IReview  {
    userId: IUserModel
    review: string
    _id: string
    replay?: string
}

export interface IVehicleModel  {
    _id: string
    name: string
    price: number
    model: number
    transmission: string
    brand: string
    fuel: string
    location: string
    createdBy: string
    isVerified: boolean
    images: string[]
    document: string
    review: IReview
}