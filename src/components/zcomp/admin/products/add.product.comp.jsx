import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useInsertProductBackend } from "../../../../backend/inventory.backend";
import { toast } from "sonner";


const AddProductComp = ({ setAddProduct,handleRefresh}) => {
    const nav = useNavigate()
    const { response: responseBackend, loading: loadingBackend, error: errorBackend, insertProduct } = useInsertProductBackend()
    // useEffect(() => {
    //     const admin = Cookies.get('admin')    
    //     if(admin){}else{
    //         nav('/')
    //     }
    // }, [nav])


    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        quantity: '',
        price: '',
        description: '',
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

    const handleInsert = async (e) => {
        e.preventDefault();
        await insertProduct(images, product)
        setAddProduct(false);       
        handleRefresh()
    }

    const logout = () => {
        Cookies.remove('admin')
        window.location.reload();
    }

    const resetComponent = async ()=>{    
        setAddProduct(false);       
        handleRefresh()
    }

    
    return (
        <div>
            {/* {responseBackend?resetComponent():""} */}
            <button className="bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white font-semibold text-sm py-1 px-2 rounded flex items-center" onClick={() => setAddProduct(false)}>
                <span className="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.3 1.5a.5.5 0 0 1 .4.8l-7 7a.5.5 0 0 1 0 .7l7 7a.5.5 0 0 1-.8.6l-7-7a1.5 1.5 0 0 1 0-2l7-7a.5.5 0 0 1 .4-.1z" />
                    </svg>
                </span>
                Back
            </button>
            <h1 className='text-gray-700 font-medium px-2 mt-4'>ADD PRODUCT</h1>
            <form onSubmit={handleInsert}>
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
                                onChange={handleProductInputs}
                            />
                        </div>

                    </div>
                </div>
                <div className="m-5 bg-white shadow-md rounded-lg">
                    <div className='m-5'>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="hidden"
                            multiple
                            id="file-input"
                            accept="image/png, image/jpeg"

                        />
                        <label htmlFor="file-input" className="cursor-pointer bg-green-300 p-2 rounded-md">
                            Select Image
                        </label>
                    </div>

                    <div className="image-preview">
                        {images.length === 0 ? <div class="flex items-center justify-center m-10    ">
                            <div class="text-center">
                                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3z" />
                                </svg>
                                <h2 class="text-xl font-semibold text-gray-700">Please Select Images</h2>
                                <p class="text-gray-500 mt-2">It seems there are no images to display at the moment.</p>
                            </div>
                        </div> : ""}
                        {images.map((image) => (
                            <div key={image.id} className="relative inline-block m-2 bg-white rounded-md shadow-md p-3">
                                <img src={image.src} alt="Preview" className="object-cover h-[100px] w-[100px]" />
                                <button
                                    onClick={() => removeImage(image.id)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                                >
                                    X
                                </button>
                                <p>{image.id}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button type='submit' className={`text-white  rounded p-2 m-2 text-base ${loadingBackend ? 'bg-slate-300' : 'bg-sky-500 hover:bg-sky-400'}`}>
                    {loadingBackend?"Loading...":"Add product"}
                </button>
            </form>
        </div>
    )
}


export default AddProductComp;