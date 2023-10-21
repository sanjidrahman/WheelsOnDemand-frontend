import { hostModel } from 'src/app/models/host.model';
import { userModel } from '../../models/user.model';
import { createAction, props } from "@ngrx/store";
import { vehicleModel } from 'src/app/models/vehicle.model';

export const LOAD_USER = '[admin page] list users'
export const loaduser = createAction('[admin page] list users')

export const retrieveuser = createAction('[users list api] users list')
export const retrieveusersuccess = createAction('[users list api] list users success' , props<{userlist : userModel[]}>())

export const retrievehost = createAction('[host list api] host list')
export const retrievehostsuccess = createAction('[host list api] host list success' , props<{hostlist : hostModel[]}>())

export const retrievevehicles = createAction('[vehicle list api] vehicles list')
export const retrivevehiclessuccess = createAction('[vehicle list api] vehicles list success' , props<{vehiclelist : vehicleModel[]}>())