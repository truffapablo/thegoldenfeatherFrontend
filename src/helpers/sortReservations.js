import { convertDate } from "./convertDate";

export const fnSortByRoomNumber = (allReservations, asc = true) => {
    if(asc){
        return allReservations.slice().sort((a, b) => b.roomNumber - a.roomNumber); 
    }
        return allReservations.slice().sort((a, b) => a.roomNumber - b.roomNumber); 
}
    
export const fnSortByConfirmation = (allReservations, asc = true) =>{
    
    if(asc){
        return allReservations.slice().sort((a, b) => b.confirmation - a.confirmation); 
    }
        return allReservations.slice().sort((a, b) => a.confirmation - b.confirmation); 

}

export const fnSortByGuestName = (allReservations, asc = true) =>{
    
        if(asc){

            return allReservations.slice().sort(function (a, b) {
                if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
                  return 1;
                }
                if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });
            }else{
                
                return allReservations.slice().sort(function (a, b) {
                    if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
                      return 1;
                    }
                    if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  });
        }

        
        
    
}


export const fnSortByTime = (allReservations, asc = true) => {

    const turnToNumber = (time) => {
      return parseInt(time.replace(':',''));
    }

    if(!asc) {
      
      return allReservations.slice().sort(function (a, b) {
     
        if(turnToNumber(a.time || a.event.start) > turnToNumber(b.time || b.event.start)){
          return 1
        }
        if(turnToNumber(a.time || a.event.start) < turnToNumber(b.time || b.event.start)){
          return -1
        }
        return 0
      
    });
    }
    return allReservations.slice().sort(function (a, b) {
     
        if(turnToNumber(a.time || a.event.start) < turnToNumber(b.time || b.event.start)){
          return 1
        }
        if(turnToNumber(a.time || a.event.start) > turnToNumber(b.time || b.event.start)){
          return -1
        }
        return 0
      
    });
    
  }


export const fnSortByEvent = (allReservations, asc = true) => {
    
    if(!asc){
      return allReservations.slice().sort(function (a, b) {
        /**
         * RE EVENTE    - re.event.title
         * RE CUSTOM    - re.event
         * RE TRANSFER  - re.origin 
         */
        
        
       if((a.origin && a.origin.toLowerCase() || a.event.title && a.event.title.toLowerCase() || a.event && a.event.toLowerCase()) < (b.origin && b.origin.toLowerCase() || b.event.title && b.event.title.toLowerCase() || b.event && b.event.toLowerCase())){
          return 1
       }
       if((a.origin && a.origin.toLowerCase() || a.event.title && a.event.title.toLowerCase() || a.event && a.event.toLowerCase()) > (b.origin && b.origin.toLowerCase() || b.event.title && b.event.title.toLowerCase() || b.event && b.event.toLowerCase())){
          return -1
       }
       return 0
  
      })
    }
    return allReservations.slice().sort(function (a, b) {
      /**
       * RE EVENTE    - re.event.title
       * RE CUSTOM    - re.event
       * RE TRANSFER  - re.origin 
       */
      
      
     if((a.origin && a.origin.toLowerCase() || a.event.title && a.event.title.toLowerCase() || a.event && a.event.toLowerCase()) > (b.origin && b.origin.toLowerCase() || b.event.title && b.event.title.toLowerCase() || b.event && b.event.toLowerCase())){
        return 1
     }
     if((a.origin && a.origin.toLowerCase() || a.event.title && a.event.title.toLowerCase() || a.event && a.event.toLowerCase()) < (b.origin && b.origin.toLowerCase() || b.event.title && b.event.title.toLowerCase() || b.event && b.event.toLowerCase())){
        return -1
     }
     return 0

    })

}


export const fnSortByStatus = (allReservations, asc = true) => {
  
  if(!asc){
    return allReservations.slice().sort(function(a,b){
      if(a.status.toLowerCase() < b.status.toLowerCase()){
        return 1
      }
      if(a.status.toLowerCase() > b.status.toLowerCase()){
        return -1
      }
      return 0
    });
  }

  return allReservations.slice().sort(function(a,b){
    if(a.status.toLowerCase() > b.status.toLowerCase()){
      return 1
    }
    if(a.status.toLowerCase() < b.status.toLowerCase()){
      return -1
    }
    return 0
  });

}



export const fnSortByDate = (allReservations, asc = true) => {
  
  if(!asc){
    return allReservations.slice().sort(function(a,b){

      //console.log(convertDate(a.date, 'YYYY-MM-DD'));
      if( convertDate(a.date, 'YYYY-MM-DD') < convertDate(b.date, 'YYYY-MM-DD') ){
        return 1
      }
      if( convertDate(a.date, 'YYYY-MM-DD') > convertDate(b.date, 'YYYY-MM-DD') ){
        return -1
      }
      return 0
    });
  }

  return allReservations.slice().sort(function(a,b){

    //console.log(convertDate(a.date, 'YYYY-MM-DD'));
    if( convertDate(a.date, 'YYYY-MM-DD') > convertDate(b.date, 'YYYY-MM-DD') ){
      return 1
    }
    if( convertDate(a.date, 'YYYY-MM-DD') < convertDate(b.date, 'YYYY-MM-DD') ){
      return -1
    }
    return 0
  });


}