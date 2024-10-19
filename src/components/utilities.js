import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useCheckUserLoggedUtil = () => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');       
        setLogged(!!token); // Convert token to boolean
    }, []);
    return { logged };
};

export const useIsAdminUtil =()=>{
    const [isAdmin, setIsAdmin] = useState(false);  
    useEffect(()=>{
        const admin = Cookies.get('admin')
        setIsAdmin(admin) 
    },[])
    return {isAdmin};
}
