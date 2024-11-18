import React, { useState } from "react";
import { dateFormatter } from "../../../utilities";
import { useProductCategoryBackend } from "../../../../backend/inventory.backend";
import ModalProductCategory from "./cat.modal.product.comp";
import { toast } from "sonner";


const ViewProductsComp = ({ setAddProduct, setEditProduct, products, setSelectedProduct, handleRefresh }) => {
    const { categories, loading: loadingCategories, removeCategory, addCategory, addCategoryCustom } = useProductCategoryBackend();

    const [isModalOpen, setModalOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [isCustom, setIsCustom] = useState(false);
    const [cat, setCat] = useState({
        pid: "",
        cat_id: "",
        cat: ""
    });

    let toastDisplayed = false;

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    const handleCat = (e) => {
        if (isCustom) {
            setCat({ ...cat, [e.target.name]: e.target.value });
        } else {
            const selectedId = e.target.value;
            const selectedName = e.target.options[e.target.selectedIndex].text;
            setCat({ ...cat, cat_id: selectedId, cat: selectedName });
        }
    };



    const handleCategorySelectedProduct = (product) => {
        setProduct(product);
        openModal();
    }

    const handleAddCategory = async (cname, cat_id, pid) => {
        if (isCustom) {
            await addCategoryCustom(cname, pid)
            closeModal()
            handleRefresh()
        } else {
            await addCategory(cat_id, pid)
            closeModal()
            handleRefresh()
        }
    }


    const handleRemoveAction = async (isProceed, cat_prod_id) => {
        if (isProceed) {
            await removeCategory(cat_prod_id)
            closeModal();
            handleRefresh();
        }
        toastDisplayed = false;
    };


    const handleRemoveCategory = (itemId) => {
        if (!toastDisplayed) {
            toastDisplayed = true;

            toast.warning("Removing Category", {
                classNames: {
                    toast: "flex-col items-start",
                    actionButton: "w-full justify-center !bg-rose-500 group-[.toast]:!text-white",
                    cancelButton: "w-full justify-center !bg-sky-500 group-[.toast]:!text-white",
                },
                description: "Are you sure you want to remove the category of this product? This cannot be undone.",
                action: {
                    label: "Cancel",
                    onClick: () => handleRemoveAction(false, itemId),
                },
                cancel: {
                    label: "Yes",
                    onClick: () => handleRemoveAction(true, itemId),
                },
                duration: Infinity,
                onDismiss: () => {
                    toastDisplayed = false;
                }
            });
        }
    };



    const productCategory = (categories) => {

        return (
            <div className="flex flex-wrap">
                {
                    categories.length === 0 ?
                        <div className="flex items-center bg-stone-300 text-black rounded-full px-2 py-1 min-w-min mr-1 mt-1">
                            <span className="text-[9px] font-medium overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[90px]">
                                No category
                            </span>
                        </div>
                        : categories.map((item, index) => {
                            return (
                                <div key={index} className="flex items-center bg-stone-700 text-white rounded-full px-2 py-1 min-w-min mr-1 mt-1">
                                    <span className="text-[9px] font-medium overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[90px]">
                                        {item.category.name}
                                    </span>
                                </div>
                            )
                        })
                }

            </div>
        )
    }

    return (

        <div>
            <button className="my-5 bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white font-semibold text-sm py-1 px-2 rounded flex items-center" onClick={() => setAddProduct(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                </svg>
                Add Product
            </button>


            <div className="flex space-x-2 justify-end">
                <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 py-1 px-1 rounded mx-1 text-green-500 border border-green-500" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                    Edit
                </span>
            </div>


            <div className="relative overflow-x-auto rounded-xl">
                <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th>
                                Images
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th>
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length === 0 ?
                                <tr className="bg-white border-b">
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        Products is empty.
                                    </td>
                                </tr> :

                                products.map((product, index) => {
                                    return (
                                        <tr className="bg-white border-b " key={product.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                                                <img src={product.images[0].url} className="w-9 h-9" />
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                                                {product.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {product.quantity}
                                            </td>
                                            <td className="px-6 py-4">
                                                ₱{product.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.description}
                                            </td>
                                            <td className="px-6 py-4 hover:bg-slate-200 cursor-pointer"
                                                onClick={() => handleCategorySelectedProduct(product)}
                                            >
                                                {productCategory(product.inventory_category)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {dateFormatter(product.created_at)}
                                            </td>
                                            <td>
                                                <button className="mx-1 bg-transparent text-green-500 border border-green-500 hover:bg-green-500 hover:text-white font-semibold text-sm py-1 px-2 rounded"
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setEditProduct(true);
                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                    </svg>
                                                </button>
                                                {/* <button className="mx-1 bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white font-semibold text-sm py-1 px-2 rounded">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1" viewBox="0 0 16 16">
                                                        <path d="M14 3a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2M3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5s-3.69-.311-4.785-.793" />
                                                    </svg>
                                                </button> */}
                                            </td>
                                        </tr>
                                    )
                                })}
                    </tbody>
                </table>
            </div>
            <ModalProductCategory product={product} isOpen={isModalOpen} onClose={closeModal} categories={categories} handleAddCategory={handleAddCategory} handleRemoveCategory={handleRemoveCategory} isCustom={isCustom} setIsCustom={setIsCustom} cat={cat} handleCat={handleCat} loading={loadingCategories} />
        </div>
    )



}


export default ViewProductsComp;