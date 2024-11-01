import React from "react";
import HeaderComp from "../components/zcomp/header.comp";
import FooterComp from "../components/zcomp/footer.comp";
import { useProductsBackend } from "../backend/inventory.backend";
import FeaturedProductComp from "../components/zcomp/home/feat.comp";
import ProductGridComp from "../components/zcomp/home/grid.comp";

const HomePage = () => {
  const { products, loading } = useProductsBackend();
  const featProduct = products[Math.floor(Math.random() * products.length)];
  return (
    <div className="flex flex-col min-h-screen bg-gray-300">
      <HeaderComp />
      <main className="flex-grow p-5 md:p-10">
        {/* Featured Product Section */}
        <FeaturedProductComp {...featProduct} />
        {/* Product Grid Section */}
        <ProductGridComp products={products} loading={loading}/>
      </main>
      {/* Footer */}
      <FooterComp />
    </div>
  );
};

export default HomePage;