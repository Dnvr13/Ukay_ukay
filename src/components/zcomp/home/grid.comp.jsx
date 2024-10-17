import React from "react"
import ItemCard from "./item.card.comp";

const ProductGridComp = ({ products }) => {
    return (

        <section className="bg-white p-5 mt-4">
            <div className="flex justify-between mb-5">
                <h2 className="text-3xl font-extrabold">New Arrivals</h2>
                <h2 className="text-3xl font-extrabold">Trending</h2>
            </div>
            <div className="grid grid-cols-auto-fill gap-x-5 gap-y-5 md:grid-cols-auto-fill-md">
                <div className="mt-6">
                    <ul className="grid grid-cols-4 gap-10">
                        {products.map((product,index) => (
                            <ItemCard key={index} {...product}/>
                        ))
                        }
                    </ul>
                </div>
            </div>
        </section>

    )

}

export default ProductGridComp;