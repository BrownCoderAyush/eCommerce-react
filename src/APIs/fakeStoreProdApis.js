export function getAllCategories(){
    return 'https://fakestoreapi.com/products/categories';
}
export function getAllProducts(){
    return 'https://fakestoreapi.com/products';
}

export function getAllProductsByCategory(category){
    return `https://fakestoreapi.com/products/category/${category}`;
}

export function getProductDetailsById(id){
    return `https://fakestoreapi.com/products/${id}`
}