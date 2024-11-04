import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useUpdateProductBackend } from "../../../../backend/inventory.backend";
import { toast } from "sonner";


const EditProductComp = ({ setEditProduct, productt,setSelectedProduct,handleRefresh}) => {
    const nav = useNavigate()
    const { response: responseBackend, loading: loadingBackend, error: errorBackend, updateProduct } = useUpdateProductBackend()
    // useEffect(() => {
    //     const admin = Cookies.get('admin')    
    //     if(admin){}else{
    //         nav('/')
    //     }
    // }, [nav])


    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({
        name: productt?productt.name:"",
        quantity: productt?productt.quantity:"",
        price: productt?productt.price:"",
        description: productt?productt.description:"",
    });
   
    const handleProductInputs = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            id: generateUID(file.name),
            src: URL.createObjectURL(file),
            name: file.name,
            img_file: file
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };


    const generateUID = (imageName) => {
        const ext = imageName.split('.').pop();
        return `img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;
    };

    const removeImage = (id) => {
        setImages(images.filter((image) => image.id !== id));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateProduct(productt.id,product)
    }

    const logout = () => {
        Cookies.remove('admin')
        window.location.reload();
    }

    const resetComponent =()=>{
        setEditProduct(false);
        setSelectedProduct({});
        handleRefresh();
    }

    return (
        <div>
            {responseBackend?resetComponent():""}
            <button className="bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white font-semibold text-sm py-1 px-2 rounded flex items-center" onClick={() => setEditProduct(null)}>
                <span className="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.3 1.5a.5.5 0 0 1 .4.8l-7 7a.5.5 0 0 1 0 .7l7 7a.5.5 0 0 1-.8.6l-7-7a1.5 1.5 0 0 1 0-2l7-7a.5.5 0 0 1 .4-.1z" />
                    </svg>
                </span>
                Back
            </button>
            <h1 className='text-gray-700 font-medium px-2 mt-4'>UPDATE PRODUCT</h1>
            <form onSubmit={handleUpdate}>
                <div className='m-5 bg-white rounded-lg shadow-md'>
                    {/* <p className={`${!errorBackend ? 'bg-green-500' : 'bg-red-500'} font-medium m-3 text-3xl`}>{!errorBackend ? responseBackend : errorBackend}</p> */}
                    <div className="space-y-4 p-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Product Name:
                            </label>
                            <input
                                id='name'
                                type='text'
                                name='name'
                                placeholder='Product name'
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                                required
                                value={product.name}
                                onChange={handleProductInputs}
                            />
                        </div>

                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                Product Quantity:
                            </label>
                            <input
                                id='quantity'
                                type='number'
                                name='quantity'
                                placeholder='Product quantity'
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                                required
                                onChange={handleProductInputs}
                                value={product.quantity}
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Product Price:
                            </label>
                            <input
                                id='price'
                                type='number'
                                name='price'
                                placeholder='Product price'
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                                step="0.01"
                                min="0"
                                required
                                value={product.price}
                                onChange={handleProductInputs}
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description:
                            </label>
                            <input
                                id='description'
                                type='text'
                                name='description'
                                placeholder='Product description'
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                                required
                                value={product.description}
                                onChange={handleProductInputs}
                            />
                        </div>

                    </div>
                </div>
                <button type='submit' className={`text-white bg-sky-500 rounded p-2 m-2 text-base ${loadingBackend ? 'hidden' : ''}`}>
                    Update product
                </button>
            </form>
        </div>
    )
}


export default EditProductComp;