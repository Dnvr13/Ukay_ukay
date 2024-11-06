import { useEffect, useState } from "react";
import supabase from "../config/supabase.config";
import { toast } from "sonner";


export const useCustomerOrdersBackend = (customer_id) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const customerOrders = async () => {
            setLoading(true);
            setError(null);

            if (!customer_id) {
                throw new Error("Specified the user")
            }

            try {
                const { data, error } = await supabase
                    .from('order_details')
                    .select(`
                *,
                orders (
                    *,
                    inventory (
                        *,
                        inventory_images (url)
                    )
                )
            `)
                    .eq('customer_id', customer_id)
                    .order('date_order', { ascending: false });

                if (error) {
                    throw new Error(error.message);
                }

                setOrders(data);
            } catch (err) {
                toast.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        customerOrders();
    }, []);

    return { orders, loading, error };

}


export const useCustomersOrdersBackend = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('order_details')
                .select(`
                    *,
                    customers (
                        name,
                        username
                    ),
                    orders (
                        *,
                        inventory (
                            *,
                            inventory_images (url)
                        )
                    )
                `)
                .order('date_order', { ascending: false });

            if (error) {
                throw new Error(error.message);
            }

            setOrders(data);
        } catch (err) {
            toast.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []); // Fetch orders on initial load

    const refreshOrders = () => {
        fetchOrders(); // Call fetchOrders to refresh data
    };

    return { orders, loading, error, refreshOrders };
};


export const useOrderDetailsStatusBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCompleteStatus = async (order_details_id) => {
        setLoading(true);
        setError(null);

        try {
            if (!order_details_id) {
                throw new Error("Please specify the order to complete!")
            }
            const { error } = await supabase.rpc('order_completed', { order_details_id:order_details_id });

            if (error) {
                throw new Error(error.message)
            }
            toast.success("Order has been completed!");
            setResponse("Order has been completed!");

        } catch (err) {
            toast.error(err.message)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { response, loading, error, updateCompleteStatus }
}