import { IUserModel } from "./user.model"
import { IVehicleModel } from "./vehicle.model"

export interface IBookingData {
  dropoff: string
  endDate: Date
  grandTotal: number
  paymentMethod: string
  pickup: string
  razorId?: RazorId
  startDate: Date
  total: number
  vehicleId: string | null
}

export interface RazorId {
  razorpay_payment_id: string
}

export interface IBookingId {
  bookingId: string
}

export interface IBookingSuccess extends IBookingData, IVehicleModel, IUserModel {}
