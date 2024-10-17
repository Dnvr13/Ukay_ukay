import { useEffect, useState } from "react";
import supabase from "../config/supabase.config";
import Cookies from 'js-cookie';

export const addToCartBackend = async (inventoryId, qty) => {

    try {
        const token = Cookies.get("token")
        if (!token) {
            throw new Error("Please login to continue!")
        }

        const uId = token.split('-')[0]

        const { data: itemExist, error: checkingItemError } = await supabase
            .from('cart')
            .select('*')
            .eq("inventory_id", inventoryId)
            .eq("customer_id", uId)

        if (checkingItemError) {
            throw new Error(checkingItemError)
        }

        if (itemExist && itemExist.length > 0) {
            throw new Error("Item already exists in the cart.")
        }

        const { data, error } = await supabase
            .from('cart')
            .insert({ inventory_id: inventoryId, customer_id: uId, quantity: qty })

        if (error) {
            throw new Error(error)
        }

        return { success: true, message: "Item added to cart!" };

    } catch (error) {
        return { success: false, message: error.message }
    }
}


export const useCartBackend = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = Cookies.get("token");
                if (!token) {
                    throw new Error("Please login to continue!");
                }

                const customerId = token.split('-')[0];

                const { data, error } = await supabase
                    .from('cart')
                    .select(`
                        *,
                        inventory (
                            *,
                            inventory_images (url)
                        )
                    `)
                    .eq('customer_id', customerId); // Use customerId from token

                if (error) {
                    throw new Error(error.message);
                }

                const formattedData = data.map(item => ({
                    ...item,
                    name: item.inventory.name,
                    price: item.inventory.price,
                    image: item.inventory.inventory_images[0]?.url,
                    quantity: item.quantity,
                }));
                console.log(formattedData);
                setCartItems(formattedData);
            } catch (error) {
                setError(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []); // Empty dependency array to run only once on mount

    return { cartItems, loading, error };
};