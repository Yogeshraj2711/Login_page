import {Navigate, redirect} from "react-router-dom"
export const Protectedroute=({componenet: Component})=>{

    const token = localStorage.getItem("token");
    return token ? <Component></Component> : <Navigate to="/login"/>
}

