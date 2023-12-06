import { IHostModel } from 'src/app/interfaces/host.model';
import { IUserModel } from '../../interfaces/user.model';
import { IVehicleModel } from 'src/app/interfaces/vehicle.model';


export interface userState {
    userlist : IUserModel[]
}

export interface hostState {
    hostlist : IHostModel[]
}

export interface vehicleState {
    vehiclelist : IVehicleModel[]
}

