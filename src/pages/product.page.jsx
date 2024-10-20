import React, { useEffect, useState } from 'react';
import { useInsertProductBackend } from '../backend/inventory.backend';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProductPage = () => {
    const nav = useNavigate()   
    const { response: responseBackend, loading: loadingBackend, error: errorBackend, insertProduct } = useInsertProductBackend()
    useEffect(() => {
        const admin = Cookies.get('admin')    
        if(admin){}else{
            nav('/')
        }
    }, [nav])


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
        setImages([]);
        setProduct({
            name: '',
            quantity: '',
            price: '',
            description: '',
        });
    }

    const logout = () => {
        Cookies.remove('admin')
        window.location.reload();
    }


    return (
        <form onSubmit={handleInsert}>
            <button type="button" className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
            <div className='m-5 bg-orange-200 rounded-lg'>
                <p className={`${!errorBackend ? 'bg-green-500' : 'bg-red-500'} font-medium m-3 text-3xl`}>{!errorBackend ? responseBackend : errorBackend}</p>
                <h1 className='text-gray-700 font-medium px-2'>Product</h1>
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
            <div className="m-5 bg-rose-200 rounded-lg">
                <div className='m-5'>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="hidden"
                        id="file-input"
                        accept="image/png, image/jpeg"
                        disabled={images.length === 1}
                    />
                    <label htmlFor="file-input" className="cursor-pointer bg-rose-300 p-2 rounded-md">
                        Select Images
                    </label>
                </div>

                <div className="image-preview">
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

                <button type='submit' className={`bg-amber-300 rounded p-3 m-5 ${loadingBackend ? 'hidden' : ''}`}>Insert product</button>
            </div>
        </form>

    );
}

export default ProductPage;