import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"

export const RequireAuth = ({children}) => {
    
    const {uid} = useSelector(state => state.auth);
    if(!uid) {
        return <Navigate to="/login"/>
    }
        return <Outlet/>

}
