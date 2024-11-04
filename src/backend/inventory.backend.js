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





// Select all the products
// usage
// const { products, loading, error,refreshProducts } = useProducts();
export const useProductsBackend = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const productsData = await fetchProductsData();
            const productsWithImages = await fetchProductsWithImages(productsData);

            // Filter out products with quantity of 0
            const filteredProducts = productsWithImages.filter(product => product.quantity > 0);
            // console.log(filteredProducts);
            setProducts(filteredProducts);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, []); // Runs once on mount

    // Function to fetch product data from Supabase
    const fetchProductsData = async () => {
        const { data: productsData, error: fetchError } = await supabase
            .from('inventory')
            .select('*');

        if (fetchError) {
            throw new Error(fetchError.message);
        }

        return productsData;
    };

    // Function to fetch images for each product
    const fetchProductsWithImages = async (productsData) => {
        return Promise.all(productsData.map(async (product) => {
            const images = await fetchProductImages(product.id);
            return { ...product, images };
        }));
    };

    // Function to fetch images for a specific product
    const fetchProductImages = async (inventoryId) => {
        const { data: productImages, error: imagesError } = await supabase
            .from('inventory_images')
            .select('url')
            .eq('inventory_id', inventoryId);

        if (imagesError) {
            throw new Error(imagesError.message);
        }

        return productImages || [];
    };

    // Refresh function to re-fetch products
    const refreshProducts = () => {
        fetchProducts();
    };

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