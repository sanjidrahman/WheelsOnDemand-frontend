import { IHostModel } from 'src/app/interfaces/host.model';
import { IUserModel } from '../../interfaces/user.model';
import { createAction, props } from "@ngrx/store";
import { IVehicleModel } from 'src/app/interfaces/vehicle.model';

export const LOAD_USER = '[admin page] list users'
export const loaduser = createAction('[admin page] list users')

export const retrieveuser = createAction('[users list api] users list')
export const retrieveusersuccess = createAction('[users list api] list users success' , props<{userlist : IUserModel[]}>())

export const retrievehost = createAction('[host list api] host list')
export const retrievehostsuccess = createAction('[host list api] host list success' , props<{hostlist : IHostModel[]}>())

export const retrievevehicles = createAction('[vehicle list api] vehicles list')
export const retrivevehiclessuccess = createAction('[vehicle list api] vehicles list success' , props<{vehiclelist : IVehicleModel[]}>())
