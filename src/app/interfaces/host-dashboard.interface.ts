import { ITrendingVehicleModel } from "./host-dashboard-trending-vehicle.model";
import { IUserModel } from "./user.model";
import { IVehicleModel } from "./vehicle.model";

export interface IDashboardData {
    bookedCount: number;
    cancelledBooking: number;
    completedCount: number;
    hostRevenue: number;
    latestOrders: ITrendingVehicleModel[]
    trending: IVehicleModel
}