import { useEffect, useState } from "react";
import supabase from "../config/supabase.config";
import { toast } from "sonner";

export const useLogOrdersBackend = () => {
    const [logOrders, setLogOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data, error } = await supabase
                    .from('log_order')
                    .select(`
                        *,
                        customers (
                            *
                        )
                    `).order('created_at', { ascending: false });

                if (error) {
                    throw new Error(error.message);
                }

                setLogOrders(data); // Assuming 'data' is already in the desired format
            } catch (err) {
                toast.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    return { logOrders, loading, error };
};

export const useDashboardBackend = () => {
    const [totalUser, setTotalUser] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error before fetching

            try {
                await Promise.all([
                    fetchDataFromApi('get_total_users', setTotalUser),
                    fetchDataFromApi('get_monthly_income', setMonthlyIncome)
                ]);
            } catch (err) {
                // Handle any errors that occurred during fetching
                console.error("Fetch error:", err); // Log error for debugging
            } finally {
                setLoading(false); // Ensure loading is false when done
            }
        };

        fetchData();
    }, []);

    const fetchDataFromApi = async (rpcFunction, setter) => {
        try {
            const { data, error } = await supabase.rpc(rpcFunction);

            if (error) {
                throw new Error(error.message); // Throw error for handling in the outer scope
            }

            setter(data); // Set the data using the provided setter function
        } catch (err) {
            toast.error(`Error fetching ${rpcFunction}: ${err.message}`); // Specific error message
            setError(err.message); // Set error state for UI feedback
        }
    };

    return { totalUser, monthlyIncome, loading, error };
};