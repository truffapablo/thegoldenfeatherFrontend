export const searchData = (searchValue, searchArray = []) => {
    
    const results = [];
    
    searchArray.map((item, index) => {
        
        if(searchByFirstName(item, searchValue).length > 0) {
            results.push(searchByFirstName(item, searchValue));
        }
        if(searchByLastName(item, searchValue).length > 0) {
            results.push(searchByLastName(item, searchValue));
        }
        if(searchByConfirmation(item, searchValue).length > 0) {
            results.push(searchByConfirmation(item, searchValue));
        }

        if(searchByEvent(item, searchValue).length > 0) {
            results.push(searchByEvent(item, searchValue));
        }
    });
    
    return clearDuplicatedData(results);
}

const searchByFirstName = (item, searchValue) => {
    return item.filter((el) => el.firstName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
}

const searchByLastName = (item, searchValue) => {
    return item.filter((el) => el.lastName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
}

const searchByConfirmation = (item, searchValue) => {
    return item.filter((el) => el.confirmation.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
}

const searchByEvent = (item, searchValue) => {
    return item.filter( (el) => {
        if(el.event){
            if(el.event.title) {
                return el.event.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
            }else{
                return el.event.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
            }
        }
    });
}

const clearDuplicatedData = (data) => {
    const uniqueData = [];
    data.map((item, index) => {
        item.map((el, index) => {
            if(!uniqueData.includes(el)) {
                uniqueData.push(el);
            }
        })

    });
    return uniqueData;
}
