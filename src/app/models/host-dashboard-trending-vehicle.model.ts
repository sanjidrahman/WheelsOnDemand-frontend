import { IUserModel } from "./user.model";
import { IVehicleModel } from "./vehicle.model";

export interface ITrendingVehicleModel {
    _id: string;
    userId: string;
    vehicleId: string;
    startDate: string;
    endDate: string;
    pickup: string;
    dropoff: string;
    total: number;
    grandTotal: number;
    razorId: string;
    status: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    vehicleDetails: IVehicleModel
    userDetails: IUserModel
}
