import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { retrievehost, retrievehostsuccess, retrieveuser, retrieveusersuccess, retrievevehicles, retrivevehiclessuccess } from "./app.actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { userModel } from "src/app/models/user.model";
import { hostModel } from "src/app/models/host.model";
import { vehicleModel } from "src/app/models/vehicle.model";
import { AdminService } from "src/app/admin/services/admin.services";

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private servive: AdminService,
        private toastr: ToastrService
    ) { }

    _users = createEffect(() => {
        return this.actions$.pipe(
            ofType(retrieveuser),
            exhaustMap((action) => {
                return this.servive.getAllUser().pipe(
                    map((data) => {
                        // console.log(data , 'I AM DATA FROM EFFECTS');
                        return retrieveusersuccess({ userlist: data as userModel[] });
                    }),
                    catchError(() => EMPTY)
                );
            })
        );
    })

    _host = createEffect(() => {
        return this.actions$.pipe(
            ofType(retrievehost),
            exhaustMap((action) => {
                return this.servive.getAllHost().pipe(
                    map((data) => {
                        // console.log(data , 'I AM DATA FROM EFFECTS');
                        return retrievehostsuccess({ hostlist: data as hostModel[] })
                    }),
                    catchError(() => EMPTY)
                )
            })
        )
    })

    _vehicles = createEffect(() => {
        return this.actions$.pipe(
            ofType(retrievevehicles),
            exhaustMap((action) => {
                return this.servive.getAllVehicles().pipe(
                    map((data) => {
                        // console.log(data , 'I AM DATA FROM EFFECTS');
                        return retrivevehiclessuccess({ vehiclelist: data as vehicleModel[] })
                    }),
                    catchError(() => EMPTY)
                )
            })
        )
    })
}