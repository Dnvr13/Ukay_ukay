import { useEffect, useState } from "react";
import supabase from "../config/supabase.config";
import Cookies from 'js-cookie';
import { toast } from "sonner";

export const useInsertCustomerBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const insertCustomer = async (customer) => {
        setLoading(true);
        resetState();

        try {
            validateCustomer(customer);
            const result = await insertIntoDatabase(customer);
            handleSuccess(result);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const resetState = () => {
        setError(null);
        setResponse(null);
    };

    const validateCustomer = (customer) => {
        if (!customer) {
            throw new Error("Customer data cannot be empty!");
        }
    };

    const insertIntoDatabase = async (customer) => {
        const { data, error: errorInsert } = await supabase
            .from('customers')
            .insert(customer)
            .select();

        if (errorInsert) {
            throw new Error(errorInsert.message || "Failed to insert customer.");
        }

        return data;
    };

    const handleSuccess = (data) => {
        toast.success("Added successfully!");
        setResponse("Added successfully!");
    };

    const handleError = (err) => {
        toast.error(err.message);
        setError(err.message);
        console.error(err.message);
    };

    return { response, loading, error, insertCustomer };
};


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

export const useCustomersBackend = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomers = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('customers')
                .select('*')
                .eq('role', 0);

            if (error) {
                throw new Error(error.message);
            }

            setCustomers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []); // Empty dependency array to run only on mount

    // Refresh function to re-fetch customers
    const refreshCustomers = () => {
        fetchCustomers();
    };

    return { customers, loading, error, refreshCustomers };
};


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

            // console.log(userInfo);

            const { data, error: errorUpdate } = await supabase
                .from('customers')
                .update({ name: userInfo.name, email: userInfo.email, contact_no: userInfo.contact_no, address: userInfo.address })
                .eq('id', userInfo.id)
                .single();

            if (errorUpdate) {
                throw new Error(errorUpdate.message || "Failed to update customer info");
            }
            toast.success("Successfully updated!")
            setResponse("Successfully updated!");
        } catch (err) {
            toast.error(err.message)
            setError(err.message);
            console.error(err.message)
        } finally {
            setLoading(false);
        }
    };

    return { response, loading, error, updateInfo };
};