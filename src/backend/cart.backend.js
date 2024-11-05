import { useEffect, useState } from "react";
import supabase from "../config/supabase.config";
import Cookies from 'js-cookie';
import { toast } from "sonner";

export const useAddToCartBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const addToCart = async (inventoryId, qty) => {
        setLoading(true);
        setError(null);

        try {
            const token = Cookies.get("token")
            if (!token) {
                throw new Error("Please login to continue!")
            }
            const uId = token.split('-')[0]


            if (!inventoryId) {
                throw new Error("Please specify the item to add to cart!")
            }

            if (!qty) {
                qty = 1; // set the value if null
            }

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

            const { error } = await supabase
                .from('cart')
                .insert({ inventory_id: inventoryId, customer_id: uId, quantity: qty })

            if (error) {
                throw new Error(error)
            }
            toast.success("Item added to cart!");
            setResponse("Item added to cart!");

        } catch (err) {
            toast.error(err.message)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // add to cart that uses db function
    const addToCartStoredProc = async (inventoryId, qty) => {
        setLoading(true);
        setError(null);

        try {
            const token = Cookies.get("token")
            if (!token) {
                throw new Error("Please login to continue!")
            }
            const uId = token.split('-')[0]


            if (!inventoryId) {
                throw new Error("Please specify the item to add to cart!")
            }

            if (!qty) {
                qty = 1; // set the value if null
            }

            const { error } = await
                supabase.rpc('add_to_cart_stored', { invnt_id: inventoryId, customer_id: uId, qnty: qty })

            if (error) {
                throw new Error(error)
            }
            toast.success("Item added to cart!");
            setResponse("Item added to cart!");

        } catch (err) {
            toast.error(err.message)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }




    return { response, loading, error, addToCart,addToCartStoredProc };
}

export const useCartRemoveBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cartRemove = async (cartId) => {

        setLoading(true);
        setError(null);
        try {

            if (!cartId) {
                throw new Error("Please specify the item to remove!");
            }

            const { error: errorDelete } = await supabase
                .from('cart')
                .delete()
                .eq('id', cartId);

            if (errorDelete) {
                throw new Error(errorDelete.message || 'Failed to delete item');
            }

            toast.success("Item removed successfully!");
            setResponse("Item deleted successfully!");
            window.location.reload();
        } catch (err) {
            toast.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { response, loading, error, cartRemove };
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
                    cat_id: item.id,
                    name: item.inventory.name,
                    price: item.inventory.price,
                    image: item.inventory.inventory_images[0]?.url,
                    product_quantity: item.inventory.quantity,  // added product_quantity to check the qnty of the product when checking out
                    quantity: item.quantity,
                    total_price: item.inventory.price * item.quantity
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
    }, []);

    return { cartItems, loading, error };
};


export const useSelectedCustomerCartBackend = (customerId) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            setError(null);

            try {
                
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
                    cat_id: item.id,
                    name: item.inventory.name,
                    price: item.inventory.price,
                    image: item.inventory.inventory_images[0]?.url,
                    product_quantity: item.inventory.quantity,  // added product_quantity to check the qnty of the product when checking out
                    quantity: item.quantity,
                    total_price: item.inventory.price * item.quantity
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
    }, []);

    return { cartItems, loading, error };
};

export const useCartCheckoutBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkout = async (cart) => {
        setLoading(true)
        setError(null);

        try {

            const token = Cookies.get("token")
            if (!token) {
                throw new Error("Please login to continue!")
            }

            const uId = token.split('-')[0]

            if (!cart || cart.length === 0) {
                throw new Error("There's no item/s in the cart!")
            }

            const totalCartPrice = cart.reduce((total, item) => {
                return total + item.total_price;
            }, 0);

            // check if the product quantity is greater than or equal to the cart item qnty else it will throw an error of the specified product
            cart.forEach(item => {
                if (item.product_quantity < item.quantity) {
                    throw new Error(`Insufficient quantity for product: ${item.name}!\nPlease try to decrease the cart item quantity.`);
                }
            });

            const { data: orderDetailData, error: errorAddOrderDetails } = await supabase
                .from('order_details')
                .insert({ total_price: totalCartPrice, customer_id: uId })
                .select()

            if (errorAddOrderDetails) {
                throw new Error(errorAddOrderDetails)
            }

            const orderDetailId = orderDetailData[0].id
            const modifiedCart = cart.map(item => ({
                order_detail_id: orderDetailId,
                inventory_id: item.inventory_id,
                quantity: item.quantity,
                price: item.price,
                total_price: item.total_price,
                customer_id: uId
            }));

            console.log(modifiedCart);

            const { error: errorAddOrders } = await supabase
                .from("orders")
                .upsert(modifiedCart)

            if (errorAddOrders) {
                throw new Error(errorAddOrders)
            }

            // updating the product quantity 
            for (const item of cart) {
                const { error } = await supabase.rpc('update_p_quantity', { invnt_id: item.inventory_id, pqnty: item.quantity });
                if (error) {
                    throw new Error(error);
                }
            }
            

            // empty the customer cart
            const { error: errorCart } = await supabase
                .from('cart')
                .delete()
                .eq('customer_id', uId);

            if (errorCart) {
                throw new Error(errorCart)
            }

            toast.success("Successfully checkout!") // toast for now, suggest to have a success checkout page
            setResponse("Successfully checkout!")
            window.location.reload();

        } catch (error) {
            toast.error(error.message)
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return { response, loading, error, checkout }
}