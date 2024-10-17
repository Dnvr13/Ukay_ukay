import React, { useState } from 'react';
import { insertProductBackend } from '../backend/inventory.backend';



const ProductPage = () => {
    const [images, setImages] = useState([]);
    const [product,setProduct] = useState({
        name:'',
        quantity:'',
        price:''
    });
    const [loading,setLoading] = useState(false)

    const handleProductInputs=(e)=>{
        setProduct({...product,[e.target.name]:e.target.value})
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
        if (images & product) {
            setLoading(true);
            const x = await insertProductBackend(images,product)
            console.log(x)
            setLoading(false);
        } else {
            console.log("false");
        }

    }


    return (
        <>
            <div className='m-5 bg-orange-200'>
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
                </div>
            </div>
            <div className="m-5 bg-rose-200">        
                <div className='m-5'>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        id="file-input"
                        accept="image/png, image/jpeg"
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
                            <p>{image.name}</p>
                            <p>{image.id}</p>
                        </div>
                    ))}
                </div>

                <button type='button' className={`bg-amber-300 rounded p-3 m-5 ${loading?'hidden':''}`} onClick={handleInsert}>Insert product</button>
            </div>
        </>

    );
}

export default ProductPage;