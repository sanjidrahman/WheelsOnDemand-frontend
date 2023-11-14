export interface IBookingModel {
    _id: string
    userId: any
    vehicleId: any
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