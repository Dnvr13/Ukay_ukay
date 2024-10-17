export const CustomerModel = {
    id:0,
    username:'',
    name:'',
    email:'',
    address:'',
    contact_no:''
}

export const CategoryModel = {
    id:0,
    name:''
}

export const InventoryModel ={
    id:0,
    name:'',
    quantity:0,
    price:0,
    created_at:''
}


export const InventoryCategoryModel = {
    id:0,
    inventory_id:0,
    category_id:0,
    name:''
}

export const InventoryImageModel = {
    id:0,
    url:'',
    inventory_id:0
}