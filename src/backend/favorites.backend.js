import { useEffect, useState } from "react";
import supabase from "../config/supabase.config";
import Cookies from 'js-cookie';

export const useAddToFavoritesBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addToFavorites = async (inventoryId) => {
        setLoading(true);
        setError(null);

        try {

            if (!inventoryId) {
                throw new Error("Please specify the item to add to favorites!");
            }

            const token = Cookies.get("token")
            if (!token) {
                throw new Error("Please login to continue!")
            }

            const uId = token.split('-')[0]

            const { data: itemExist, error: checkingItemError } = await supabase
                .from('favorites')
                .select('*')
                .eq("inventory_id", inventoryId)
                .eq("customer_id", uId)

            if (checkingItemError) {
                throw new Error(checkingItemError)
            }

            if (itemExist && itemExist.length > 0) {
                throw new Error("Item already exists in the favorites.")
            }

            const { data, error } = await supabase
                .from('favorites')
                .insert({ inventory_id: inventoryId, customer_id: uId })

            if (error) {
                throw new Error(error)
            }

            setResponse("Item added to favorites!");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {response,loading,error,addToFavorites};
}

export const useRemoveFavItemBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeFavItem = async (id) => {
        if (!id) {
            throw new Error("Please specify the item to remove!");
        }

        setLoading(true);
        setError(null);

        try {
            const { error: errorDelete } = await supabase
                .from('favorites')
                .delete()
                .eq('id', id);

            if (errorDelete) {
                throw new Error(errorDelete.message || 'Failed to delete item');
            }

            setResponse("Item deleted successfully!");
            window.location.reload();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { response, loading, error, removeFavItem };
};

export const useFavoritesBackend = () => {
    const [favItems, setFavItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavItems = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = Cookies.get("token");
                if (!token) {
                    throw new Error("Please login to continue!");
                }

                const customerId = token.split('-')[0];

                const { data, error } = await supabase
                    .from('favorites')
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
                    fav_id: item.id,
                    name: item.inventory.name,
                    price: item.inventory.price,
                    image: item.inventory.inventory_images[0]?.url,
                }));
                console.log(formattedData);
                setFavItems(formattedData);
            } catch (error) {
                setError(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavItems();
    }, []);

    return { favItems, loading, error };
};