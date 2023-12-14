import { IUserModel } from "./user.model"
import { IVehicleModel } from "./vehicle.model"

export interface IBookingModel {
    _id: string
    userId: IUserModel 
    vehicleId: IVehicleModel 
    startDate: string
    endDate: string
    pickup: string
    dropoff: string
    total: number
    grandTotal: number
    razorId: string
    status: string
    __v: number
}

// this is only for admin ( admin booking-list component )
export interface IBookingListData {
    bookings: IBookingModel
}

