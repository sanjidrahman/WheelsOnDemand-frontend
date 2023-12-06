import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserModel } from "src/app/interfaces/user.model";
import { hostState, userState, vehicleState } from "./app.state";
import { IHostModel } from "src/app/interfaces/host.model";
import { IVehicleModel } from "src/app/interfaces/vehicle.model";

const getuserstate = (state: userState) => state.userlist
export const getuser = createSelector(getuserstate, (state: IUserModel[]) => {
    // console.log(state , 'I AM SELECTOR')
    return state
})

const gethoststate = (state: hostState) => state.hostlist
export const gethost = createSelector(gethoststate , (state : IHostModel[]) => {
    return state
})

const getvehiclestate = (state : vehicleState) => state.vehiclelist
export const getvehicles = createSelector(getvehiclestate , (state: IVehicleModel[]) => {
    // console.log(state , 'I AM SELECTOR')
    return state
})