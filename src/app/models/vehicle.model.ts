import { IUserModel } from "./user.model"

export interface IReviewModel  {
    userId: IUserModel
    review: string
    rating: number
    _id: string
    replay?: string
}

export interface IVehicleModel  {
    _id: string
    name: string
    price: number
    make: number
    transmission: string
    brand: string
    fuel: string
    location: string
    createdBy: string
    isVerified: boolean
    images: string[]
    document: string
    review: IReviewModel[]
}