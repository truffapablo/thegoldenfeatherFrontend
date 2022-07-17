
export const fetchWithOutToken = async (endpoint, data, method = 'GET') => {
    
    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
    
    if(method === 'GET'){
        return fetch(url);
    } else{
        return fetch(url, {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    
}

export const fetchWithToken = async (endpoint, data, method = 'GET') => {
    
    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    try {
        if(method === 'GET'){
            return fetch(url, {
                method,
                headers: {
                    'x-token': token
                }
            });
        } else{
            return fetch(url, {
                method,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token
                }
            });
        }
        
    } catch (error) {
        console.log('Error',error);
    }

    
}