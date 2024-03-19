import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

export default function (){
    return(
        <>
            <NavBar/>
            <Outlet></Outlet>
        </>
    )
}