
export const types = {
    login: '[Auth] login',
    logout: '[Auth] logout',
    register: '[Auth] register',

    authFinishChecking: '[Auth] Finish checking login state',

    uiSetError: '[UI] set error',
    uiRemoveError: '[UI] remove error',

    uiStartLoading: '[UI] Start Loading',
    uiFinishLoading: '[UI] Finish Loading',

    reservationAdd: '[Reservation] Add',
    reservationDelete: '[Reservation] Delete',
    reservationUpdate: '[Reservation] Update',
    reservationCancel: '[Reservation] Cancel',
    
    reservationAddCustom: '[Reservation] Add Custom',
    reservationSetCustom: '[Reservation] Set Custom',
    reservationUpdateCustom: '[Reservation] Update Custom',
    reservationCancelCustom: '[Reservation] Cancel Custom',
    
    reservationStartLoading: '[Reservation] Start Loading',
    reservationFinishLoading: '[Reservation] Finish Loading',
    reservationSet: '[Reservation] Set reservation list',


    eventAdd: '[Event] Add',
    eventDelete: '[Event] Delete',
    eventUpdate: '[Event] Update',
    eventCancel: '[Event] Update',
    eventSetActive: '[Event] Set active event',

    eventStartLoading: '[Event] Start Loading',
    eventFinishLoading: '[Event] Finish Loading',
    eventSet: '[Event] Set event list',


    logStartLoading: '[Log] Start Loading',
    logFinishLoading: '[Log] Finish Loading',
    logSet: '[Log] Set log list',


}