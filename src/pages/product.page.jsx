import React, { useState } from 'react';
import { insertProductBackend } from '../backend/inventory.backend';
import { useNavigate } from 'react-router-dom';
import { useCheckUserLoggedUtil, useIsAdminUtil } from '../components/utilities';

const ProductPage = () => {
    const nav = useNavigate()
    const {logged} = useCheckUserLoggedUtil()
    const {isAdmin} = useIsAdminUtil()
    if(!isAdmin && logged){
        nav('/')
    }

    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        quantity: '',
        price: '',
        description:'',
    });
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState({
        success:'',
        message:''
    })
    
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

    const handleInsert = async () => {
        setLoading(true);
        const x = await insertProductBackend(images, product)
        if (x.success) {
            setProduct(null);
            setLoading(false);
            setResponse(x);
        }else{
            console.log(x.message)
        }
    }


    return (
        <>
            <div className='m-5 bg-orange-200 rounded-lg'>
                <p className={`${response.success?'bg-green-500':'bg-red-500'} font-medium m-3 text-3xl`}>{response.message}</p>
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

                <button type='button' className={`bg-amber-300 rounded p-3 m-5 ${loading ? 'hidden' : ''}`} onClick={handleInsert}>Insert product</button>
            </div>
        </>

    );
}

export default ProductPage;