import { useEffect, useState } from 'react';
import axios from 'axios';


import ProductBox from '../../components/ProductBox/ProductBox';
import FilterProducts from '../../components/FilterProducts/FilterProducts';
import { getAllProducts, getAllProductsByCategory } from '../../APIs/fakeStoreProdApis';
import { useSearchParams } from 'react-router-dom';

import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchParams,setSearchParams] = useSearchParams();

    async function downloadAllProducts(category) {
        const downloadURL = (category=='')?
        getAllProducts():
        getAllProductsByCategory(category);
        console.log(downloadURL,'dwnurl');
        const products = await axios.get(downloadURL);
        console.log(products,"products");
        setProducts(products.data);
    }

    useEffect(() => {
        const category = searchParams.get('category');
        downloadAllProducts(category);
        // console.log("here");
    },[searchParams.get('category')])

    useEffect(()=>{
        console.log("hello first time");
    },[])
    return (
        <div className="container">
            <div className="row">
                <h2 className='product-list-title text-center'>All Products</h2>

                {/* list of products */}
                <div className="product-list-wrapper d-flex flex-row">

                    <FilterProducts />
                    <div className="product-list-box" id="productList">
                        {products.map((product, index) => 
                            <ProductBox
                            productImage={product.image}
                            name={product.title}
                            price={product.price}
                            productId = {product.id}
                            key={index}
                        />)}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductList;