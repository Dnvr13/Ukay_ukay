import { useEffect, useState } from "react";
import supabase from "../config/supabase.config";
import Cookies from 'js-cookie';


export const useCustomerBackend = () => {
    const [customer, setCustomer] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const customerFetch = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = Cookies.get("token");
                if (!token) {
                    throw new Error("Please login to continue!")
                }
                const uId = token.split('-')[0]

                const { data, error: insertInventoryImagesError } = await supabase
                    .from('customers')
                    .select('*')
                    .eq('id', uId)                
                    .single()
                setCustomer(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        customerFetch();
    }, []);

    return { customer, loading, error };
}


export const useUpdateCustomerInfoBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateInfo = async (userInfo) => {
        setLoading(true);

        try {
            if (!userInfo) {
                throw new Error("Provide your information!");
            }

            console.log(userInfo);

            const { data, error: errorUpdate } = await supabase
                .from('customers')
                .update({name:userInfo.name,email:userInfo.email,contact_no:userInfo.contact_no,address:userInfo.address})
                .eq('id',userInfo.id)
                .single();

            if (errorUpdate) {
                throw new Error(errorUpdate.message || "Failed to update customer info");
            }

            setResponse("Successfully updated!");
        } catch (err) {
            setError(err.message);
            console.error(err.message)
        } finally {
            setLoading(false);
        }
    };

    return { response, loading, error, updateInfo };
};