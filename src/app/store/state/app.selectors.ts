import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userModel } from "src/app/models/user.model";
import { hostState, userState, vehicleState } from "./app.state";
import { hostModel } from "src/app/models/host.model";
import { vehicleModel } from "src/app/models/vehicle.model";

const getuserstate = (state: userState) => state.userlist
export const getuser = createSelector(getuserstate, (state: userModel[]) => {
    // console.log(state , 'I AM SELECTOR')
    return state
})

const gethoststate = (state: hostState) => state.hostlist
export const gethost = createSelector(gethoststate , (state : hostModel[]) => {
    return state
})

const getvehiclestate = (state : vehicleState) => state.vehiclelist
export const getvehicles = createSelector(getvehiclestate , (state: vehicleModel[]) => {
    // console.log(state , 'I AM SELECTOR')
    return state
})