import React, { useState } from "react";
import ViewProductsComp from "./view.product.comp";
import AddProductComp from "./add.product.comp";
import { useProductsBackend } from "../../../../backend/inventory.backend";
import EditProductComp from "./edit.product.comp";


const ProductComp = () => {
    const [addProduct, setAddProduct] = useState(false)
    const [editProduct, setEditProduct] = useState(false)
    const { products, loading: loadingProducts,refreshProducts} = useProductsBackend()
    const [selectedProduct, setSelectedProduct] = useState(null)

    const handleRefresh = async()=>{
        refreshProducts();
    }

    return (
        <div>
            <h1 className="text-2xl font-medium text-slate-500">Products</h1>
            <div className="mt-20">
                {!addProduct && !editProduct ? <ViewProductsComp setAddProduct={setAddProduct} setEditProduct={setEditProduct} products={products} setSelectedProduct={setSelectedProduct} /> : ""}
                {addProduct && !editProduct ? <AddProductComp setAddProduct={setAddProduct} handleRefresh={handleRefresh}/> : ""}
                {editProduct && !addProduct? <EditProductComp setEditProduct={setEditProduct} productt={selectedProduct} setSelectedProduct={setSelectedProduct} handleRefresh={handleRefresh} /> : ""}
            </div>
        </div>
    );
}

export default ProductComp;