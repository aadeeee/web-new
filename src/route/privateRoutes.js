import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes (){
    let auth = {"token": localStorage.getItem("token")};
    console.log(auth)
    return(
        auth.token ? <Outlet /> : <Navigate to="/login" />
    )
}
