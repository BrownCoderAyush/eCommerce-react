import ProductBox from '../../components/ProductBox/ProductBox';
import FilterProducts from '../../components/FilterProducts/FilterProducts';

import './ProductList.css';

import ProductImage from '../../assets/product.jpg';

function ProductList() {
    return (
        <div className="container">
            <div className="row">
                <h2 className='product-list-title text-center'>All Products</h2>
                
                {/* list of products */}
                <div className="product-list-wrapper d-flex flex-row">

                    <FilterProducts/>
                    <div className="product-list-box" id="productList">
                        <ProductBox 
                            productImage={ProductImage}
                            name={"Dummy"}
                            price={100}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductList;