import { useEffect, useState } from "react";
import supabase from "../config/supabase.config";

export const insertProductBackend = async (images,product) => {

    try {

        const { data: inventoryData, error: insertInventoryError } = await supabase
            .from('inventory')
            .insert({ name: product.name, quantity: product.quantity, price: product.price })
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

        if(!urls || urls.length === 0){
            throw new Error("Could not fetch the image public url.")
        }

        const inventoryImageArray = urls.map((url)=>({
            url:url,
            inventory_id:inventoryData[0].id
        }))

        const {data:inventoryImagesData,error:insertInventoryImagesError} = await supabase
        .from('inventory_images')
        .insert(inventoryImageArray)
        .select()
        if (insertInventoryImagesError || !inventoryImagesData || inventoryImagesData.length === 0) {
            throw new Error(`Error inserting product images: ${insertInventoryImagesError?.message || 'No data returned'}`);
        }

        return {success:true,message:"Product added successfully!"}

    } catch (error) {
        return { success: false, message: error.message };
    }

}

// Select all the products
// usage
// const { products, loading, error } = useProducts();
//
export const useProductsBackend = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data: productsData, error: fetchError } = await supabase
                    .from('inventory')
                    .select('*');

                if (fetchError) {
                    throw new Error(fetchError.message);
                }

                // Fetch product images concurrently
                const productsWithImages = await Promise.all(productsData.map(async (product) => {
                    const { data: productImages, error: imagesError } = await supabase
                        .from('inventory_images')
                        .select('url')
                        .eq('inventory_id', product.id);

                    if (imagesError) {
                        throw new Error(imagesError.message);
                    }

                    return {
                        ...product,
                        images: productImages || []
                    };
                }));


                console.log(productsWithImages)

                setProducts(productsWithImages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array to run once on mount

    return { products, loading, error };
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