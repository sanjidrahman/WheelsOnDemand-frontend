import { IHostModel } from 'src/app/models/host.model';
import { IUserModel } from '../../models/user.model';
import { IVehicleModel } from 'src/app/models/vehicle.model';


export interface userState {
    userlist : IUserModel[]
}

export interface hostState {
    hostlist : IHostModel[]
}

export interface vehicleState {
    vehiclelist : IVehicleModel[]
}

