import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { roles } from "../types/role";

export const RequireRoleAdmin = ({children}) => {
    
    const {role} = useSelector(state => state.auth);

    if(role !== roles.admin) {
        return <Navigate to="/dashboard/panel"/>
    }
    return <Outlet/>

}