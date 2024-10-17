import React, { useEffect, useState } from 'react';
import { useProducts } from '../backend/inventory.backend';


const Admin = () => {
    

    const products = [
        {
            id: 1,
            name: "Drone Everest",
            price: 69,
            href: "#link",
            picture: "https://fancytailwind.com/static/drone-1-48a0f287f2496f2797a23ad4e2011e29.png",
            pictureAlt: "Black drone and accessories",
            color: "Black",
        },
        {
            id: 2,
            name: "Drone Kilimanjaro",
            price: 55,
            href: "#link",
            picture: "https://fancytailwind.com/static/drone-2-24ccf30292d123ee42a256eb0fc2af34.png",
            pictureAlt: "Blue drone and accessories",
            color: "Blue",
        },
        {
            id: 3,
            name: "Drone Kilimanjaro",
            price: 22,
            href: "#link",
            picture: "https://fancytailwind.com/static/drone-2-24ccf30292d123ee42a256eb0fc2af34.png",
            pictureAlt: "Blue drone and accessories",
            color: "Blue",
        },
        {
            id: 4,
            name: "Drone Kilimanjaro",
            price: 67,
            href: "#link",
            picture: "https://fancytailwind.com/static/drone-2-24ccf30292d123ee42a256eb0fc2af34.png",
            pictureAlt: "Blue drone and accessories",
            color: "Blue",
        },

    ]


    return (
        <div className="mx-auto py-8 px-4 sm:px-6 w-full max-w-7xl bg-white">
            <div className="mx-auto max-w-2xl lg:max-w-none">

                {/* :CATEGORY TITLE */}
                <h2 className="text-2xl text-gray-700 font-bold">Trending Drones</h2>

                {/* :PRODUCT LIST */}
                <div className="mt-6">                 
                    <ul className="grid grid-cols-4 gap-10">
                        {products.map(product => (
                            <li key={product.id} className="col-span-full sm:col-span-2 lg:col-span-1 group shadow-sm rounded border border-gray-50 hover:shadow-md">
                                <a href={product.href} className="p-2 flex flex-col">
                                    {/* ::Picture */}
                                    <div className="aspect-w-1 aspect-h-1 w-full h-full overflow-hidden filter group-hover:brightness-110">
                                        <img src={product.picture} className="w-full h-full object-cover object-center" />
                                    </div>
                                    {/* ::Product Details */}
                                    <div className="mt-5 pt-4 pb-2 border-t-2 border-gray-100 flex flex-col items-center">
                                        {/* :::title */}
                                        <h3 className="text-base text-gray-500 font-medium">{product.name}</h3>
                                        {/* :::color */}
                                        <p className="text-sm text-sky-500">{product.color}</p>
                                        {/* :::price */}
                                        <p className="text-lg text-gray-700 font-semibold">{product.price}€</p>
                                    </div>
                                </a>
                            </li>
                        ))
                        }
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Admin;