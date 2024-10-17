import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useCheckUserLogged = () => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');       
        setLogged(!!token); // Convert token to boolean
    }, []);
    return { logged };
};