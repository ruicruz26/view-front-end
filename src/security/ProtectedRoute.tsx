import React , { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useUser } from "../context/contexts";
import UsersService from "../services/Users";
import { useToken } from "../context/contexts";

const ProtectedRoute: React.FC = ({children}) => {

    const {setUser} = useUser();
    const {setToken} = useToken();

    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");

    useEffect(() => {
        if(userId) {
            UsersService.getUser(Number(userId))
            .then(res => {
                setUser(res)
            })
        }
    }, [userId,setUser])

    useEffect(() => {
        if(token) {
         setToken(token)   
        }
    },[token,setToken])

    return (
        <>
            {userId === "" ?  
            <Redirect to="/"></Redirect> : 
            children }
        </>
    )
}

export default ProtectedRoute;