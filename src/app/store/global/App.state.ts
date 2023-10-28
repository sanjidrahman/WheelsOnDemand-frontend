import { choiceReducer, hostReducer, userReducer, vehicleReducer } from "../state/app.reducers";

export const AppState =  {
    userlist : userReducer,
    hostlist : hostReducer,
    vehiclelist : vehicleReducer,
    choice: choiceReducer
}