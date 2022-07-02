
export const types = {
    login:                              '[Auth] Login',
    logout:                             '[Auth] Logout',
    register:                           '[Auth] Register',
    changeUserPassword:                 '[Auth] Change User Password',
    setUsers:                           '[Auth] Set user list',
    
    authFinishChecking:                 '[Auth] Finish checking login state',
    
    uiSetError:                         '[UI] set error',
    uiRemoveError:                      '[UI] remove error',
    
    uiStartLoading:                     '[UI] Start Loading',
    uiFinishLoading:                    '[UI] Finish Loading',
    
    reservationAdd:                     '[Reservation] Add',
    reservationAddFuture:               '[Reservation] Add Future',
    reservationDelete:                  '[Reservation] Delete',
    reservationRemove:                  '[Reservation] Remove',
    reservationUpdate:                  '[Reservation] Update',
    reservationUpdateMany:              '[Reservation] Update Many',
    reservationCancel:                  '[Reservation] Cancel',
    reservationConfirm:                 '[Reservation] Confirm',
    reservationComplete:                '[Reservation] Complete',
        
    reservationAddCustom:               '[Custom - Reservation] Add Custom',
    reservationSetCustom:               '[Custom - Reservation] Set Custom',
    reservationUpdateCustom:            '[Custom - Reservation] Update Custom',
    reservationCancelCustom:            '[Custom - Reservation] Cancel Custom',
    reservationConfirmCustom:           '[Custom - Reservation] Confirm Custom',
    reservationCompleteCustom:          '[Custom - Reservation] Complete Custom',
    reservationRemoveCustom:            '[Custom - Reservation] Remove Custom',
        
    reservationStartLoading:            '[Reservation] Start Loading',
    reservationFinishLoading:           '[Reservation] Finish Loading',
    reservationSet:                     '[Reservation] Set reservation list',

    reservationStartAdvanceSearch:      '[Reservation - Search] Start Searching',
    reservationFinishAdvanceSearch:     '[Reservation - Search] Finish Searching',
    reservationSetAdvanceSearch:        '[Reservation - Search] Set Search',
    reservationCleanSearch:             '[Reservation - Search] Clean Search',
        
    transferAdd:                        '[Transfer] Add',
    transferDelete:                     '[Transfer] Delete',
    transferUpdate:                     '[Transfer] Update',
    transferUpdateMany:                 '[Transfer] Update Many',
    transferCancel:                     '[Transfer] Cancel',
    transferConfirm:                    '[Transfer] Confirm',
    transferComplete:                   '[Transfer] Complete',
        
    transferStartLoading:               '[Transfer] Start Loading',
    transferFinishLoading:              '[Transfer] Finish Loading',
    transferSet:                        '[Transfer] Set transfer list',
        
    transferReservationAdd:             '[Transfer - Reservation] Add',
    transferReservationDelete:          '[Transfer - Reservation] Delete',
    transferReservationRemove:          '[Transfer - Reservation] Remove',
    transferReservationUpdate:          '[Transfer - Reservation] Update',
    transferReservationCancel:          '[Transfer - Reservation] Cancel',
    transferReservationConfirm:         '[Transfer - Reservation] Confirm',
    transferReservationComplete:        '[Transfer - Reservation] Complete',

    transferReservationStartLoading:    '[Transfer - Reservation] Start Loading',
    transferReservationFinishLoading:   '[Transfer - Reservation] Finish Loading',
    transferReservationSet:             '[Transfer - Reservation] Set transfer reservation list',
    
    
    eventAdd:                           '[Event] Add',
    eventDelete:                        '[Event] Delete',
    eventCancelReservation:             '[Event] Cancel Reservations',
    eventUpdate:                        '[Event] Update',
    eventCancel:                        '[Event] Update',
    eventSetActive:                     '[Event] Set active event',
    
    eventStartLoading:                  '[Event] Start Loading',
    eventFinishLoading:                 '[Event] Finish Loading',
    eventSet:                           '[Event] Set event list',
    
    
    logStartLoading:                    '[Log] Start Loading',
    logFinishLoading:                   '[Log] Finish Loading',
    logSet:                             '[Log] Set log list',
    
    
    navBarStartSearching:               '[Navbar] Start searching',
    navBarFinishSearching:              '[Navbar] Finish searching',
    navBarSetSearch:                    '[Navbar] Set search',
    
}   