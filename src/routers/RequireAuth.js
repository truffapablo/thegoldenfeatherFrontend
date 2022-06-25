import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom"

export const RequireAuth = ({children}) => {
    
    const {uid, changePassword} = useSelector(state => state.auth);
 
    if(!uid) {
        return <Navigate to="/login"/>
    }
    if(uid && changePassword) {
        return <Navigate to="/password-reset"/>
    }
    return <Outlet/>

}
