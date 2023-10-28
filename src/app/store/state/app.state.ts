import { hostModel } from 'src/app/models/host.model';
import { userModel } from '../../models/user.model';
import { vehicleModel } from 'src/app/models/vehicle.model';


export interface userState {
    userlist : userModel[]
}

export interface hostState {
    hostlist : hostModel[]
}

export interface vehicleState {
    vehiclelist : vehicleModel[]
}

export interface choiceState {
    choice: any
}
