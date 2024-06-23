export function getAllCategories(){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/categories`;
}
export function getAllProducts(){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products`;
}

export function getAllProductsByCategory(category){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/category/${category}`;
}

export function getProductDetailsById(id){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/${id}`;
}

export function signUp(id){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/users`;
}

export function sigin() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/auth/login`;
}