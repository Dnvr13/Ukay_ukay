import { useEffect, useState } from "react";
import supabase from "../config/supabase.config";
import { toast } from "sonner";

export const useInsertProductBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const insertProduct = async (images, product) => {
        setLoading(true)
        setError(null)
        try {
            if (!images && !product) {
                throw new Error("Please input required the fields!")
            }

            const { data: inventoryData, error: insertInventoryError } = await supabase
                .from('inventory')
                .insert({ name: product.name, quantity: product.quantity, price: product.price, description: product.description })
                .select()

            if (insertInventoryError) {
                throw new Error(`Error inserting product: ${insertInventoryError.message}`);
            }

            const directoryImageForProduct = `${inventoryData[0].id}-${inventoryData[0].name}`
            const uploads = await uploadImages(images, directoryImageForProduct)
            if (!uploads || uploads.length === 0) {
                throw new Error("No images were uploaded.");
            }

            const fetchImagesData = await fetchImages(directoryImageForProduct);
            const urls = await Promise.all(fetchImagesData.map(async (image) => {
                return await getPublicUrl(`images/${directoryImageForProduct}/${image.name}`);
            }));

            if (!urls || urls.length === 0) {
                throw new Error("Could not fetch the image public url.")
            }

            const inventoryImageArray = urls.map((url) => ({
                url: url,
                inventory_id: inventoryData[0].id
            }))

            const { data: inventoryImagesData, error: insertInventoryImagesError } = await supabase
                .from('inventory_images')
                .insert(inventoryImageArray)
                .select()
            if (insertInventoryImagesError || !inventoryImagesData || inventoryImagesData.length === 0) {
                throw new Error(`Error inserting product images: ${insertInventoryImagesError?.message || 'No data returned'}`);
            }
            toast.success("Product added successfully!");
            setResponse("Product added successfully!");

        }
        catch (err) {
            toast.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { response, loading, error, insertProduct }

}

export const useUpdateProductBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProduct = async (inventoryId, product) => {
        setLoading(true);
        setError(null);
        try {
            if (!inventoryId || !product) {
                throw new Error("Please provide the required data!");
            }
            const { error: updateError } = await supabase
                .from('inventory')
                .update({ name: product.name, quantity: product.quantity, price: product.price, description: product.description })
                .eq('id', inventoryId);

            if (updateError) {
                throw new Error(updateError.message || "Failed to update the product.");
            }
            toast.success("Updatd successfully!");
            setResponse("Updated successfully!");
            // window.location.reload();

        } catch (err) {
            toast.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { response, loading, error, updateProduct }
}



// this will throws an error because it is contstraint in its child it is like a inheritance (parent-child) in programming 
export const useRemoveProductBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeProduct = async (inventoryId) => {
        setLoading(true);
        setError(null);
        try {
            if (!inventoryId) {
                throw new Error("Inventory ID is required.");
            }
            const { error: errorDelete } = await supabase
                .from('inventory')
                .delete()
                .eq('id', inventoryId);

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
    }

    return { response, loading, error, removeProduct };

}


export const useProductCategoryBackend = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Helper function to handle API calls
    const handleApiCall = async (apiCall) => {
        setLoading(true);
        setError(null);

        try {
            const { error } = await apiCall();

            if (error) {
                throw new Error(error.message);
            }

            return true;

        } catch (err) {
            console.error(err.message);
            toast.error(err.message);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const addCategory = (cat_id, pid) => {
        return handleApiCall(() => supabase.from("inventory_category").insert({ category_id: cat_id, inventory_id: pid }));
    };

    const addCategoryCustom = (cname, pid) => {
        return handleApiCall(() => supabase.rpc('add_cat_to_product', { cname, pid }));
    };

    const removeCategory = (cat_prod_id) => {
        return handleApiCall(() => supabase.rpc('remove_cat_to_product', { cat_prod_id }));
    };

    const categoryList = async () => {
        const success = await handleApiCall(() => supabase.from("category").select("*"));
        if (success) {
            const { data } = await supabase.from("category").select("*");
            setCategories(data);
        }
    };

    const refreshCatList = () => {
        categoryList();
    };

    useEffect(() => {
        categoryList();
    }, []);

    return {
        categories,
        loading,
        error,
        addCategory,
        addCategoryCustom,
        removeCategory,
        refreshCatList,
    };
};


// Select all the products
// usage
// const { products, loading, error,refreshProducts } = useProductsBackend();
export const useProductsBackend = (isAdmin) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts(isAdmin);
    }, []);

    const refreshProducts = () => {
        fetchProducts();
    };


    const fetchProducts = async (isAdmin) => {
        setLoading(true);
        setError(null)
        try {
            const { data, error } = await supabase
                .from('inventory')
                .select(`
              *,
              inventory_images(url),
              inventory_category (
                *,category(*)
              )
            `);

            if (error) {
                throw new Error(error.message);
            }

            if (Array.isArray(data)) {
                data.forEach(item => {
                    if (item.inventory_images) {
                        item.images = item.inventory_images;
                        delete item.inventory_images;
                    }
                });
            }

            const dat = data.filter(product => isAdmin ? product.is_deleted === 0 : product.quantity > 0 && product.is_deleted === 0);
            setProducts(dat);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getProduct = async (pid) => {
        setLoading(true);
        setError(null)
        try {
            const { data, error } = await supabase
                .from('inventory')
                .select(`
              *,
              inventory_images(url),
              inventory_category (
                *,category(*)
              )
            `)
                .eq("id", pid);

            if (error) {
                throw new Error(error.message);
            }

            if (Array.isArray(data)) {
                data.forEach(item => {
                    if (item.inventory_images) {
                        item.images = item.inventory_images;
                        delete item.inventory_images;
                    }
                });
            }

            const dat = data.filter(product => product.quantity > 0);
            setProducts(dat);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    return { products, loading, error, refreshProducts };
};

const uploadImages = async (images, directory) => {
    if (!images || images.length === 0) {
        throw new Error("No images provided for upload.");
    }
    const promises = Array.from(images).map(async (image) => {
        if (!image.id || !image.img_file) {
            throw new Error("Invalid image object: Each image must have an id and src.");
        }

        const { data: dataImage, error: errorImage } = await supabase
            .storage
            .from('products')
            .upload(`images/${directory}/${image.id}`, image.img_file, {
                cacheControl: '3600',
                upsert: true,
            });
        if (errorImage) {
            throw errorImage;
        }

        return dataImage.Key;
    });

    return Promise.all(promises);
}

const fetchImages = async (directoryImageForProduct) => {
    const { data, error } = await supabase
        .storage
        .from('products') // Your bucket name
        .list(`images/${directoryImageForProduct}`, { sortBy: { column: 'name', order: 'asc' } });
    if (error) {
        console.error('Error fetching images:', error);
        return [];
    }
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
    const filteredImages = data.filter(image =>
        image.name && imageExtensions.some(ext => image.name.toLowerCase().endsWith(ext))
    );

    return filteredImages;
};

const getPublicUrl = async (filePath) => {
    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    return data.publicUrl;
}