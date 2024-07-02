import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

//components
import ProductBox from '../../components/ProductBox/ProductBox';
import FilterProducts from '../../components/FilterProducts/FilterProducts';

//APIs
import { getAllProducts, getAllProductsByCategory } from '../../APIs/fakeStoreProdApis';

//css
import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();

    async function downloadAllProducts(category) {
        const downloadURL = (category=='')?
        getAllProducts():
        getAllProductsByCategory(category);
        const products = await axios.get(downloadURL);
        setProducts(products.data);
    }

    useEffect(() => {
        const category = searchParams.get('category');
        downloadAllProducts(category);
    },[searchParams.get('category')])

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