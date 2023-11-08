import { vehicleModel } from '../../models/vehicle.model';
import { createReducer, on } from "@ngrx/store"
import { retrievehostsuccess, retrieveusersuccess, retrivevehiclessuccess } from "./app.actions"
import { userModel } from "src/app/models/user.model"
import { hostModel } from "src/app/models/host.model"

// user reducer 
export const userinitialState: userModel[] = []
const _userReducer = createReducer(userinitialState,
    on(retrieveusersuccess, (state, { userlist }) => {
        // console.log(state , userlist , 'I AM INSIDE REDUCER')
        return [...userlist]
    })
)
export function userReducer(state: any, action: any) {
    return _userReducer(state, action)
}

// host reducer
export const hostintialState: hostModel[] = []
const _hostReducer = createReducer(hostintialState,
    on(retrievehostsuccess, (state, { hostlist }) => {
        console.log(state , hostlist , 'I AM INSIDE REDUCER')
        return [...hostlist]
    })
)
export function hostReducer(state: any, action: any) {
    return _hostReducer(state, action)
}

// vehicle reducer 
export const vehicleintialState: vehicleModel[] = []
const _vehicleReducer = createReducer(vehicleintialState,
    on(retrivevehiclessuccess, (state, { vehiclelist }) => {
        // console.log(state , vehiclelist , 'I AM INSIDE REDUCER')
        return [...vehiclelist]
    })
)
export function vehicleReducer(state: any, action: any) {
    return _vehicleReducer(state, action)
}