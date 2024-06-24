import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getProductDetailsById } from '../../APIs/fakeStoreProdApis';
import CartContext from '../../context/CartContext';

function ProductDetails(){
    const { id } = useParams();
    const [product,setProduct] = useState(null);
    const {cart,setCart} = useContext(CartContext);
    async function downloadProduct(){
        const response = await axios.get(getProductDetailsById(id));
        console.log(response.data);
        setProduct(response.data);
    }
    useEffect(()=>{
        downloadProduct();
    },[]);

    return (    
        product &&
        <div className="container">
            <div className="row">
                <div className="product-details-wrapper d-flex justify-content-between align-items-start flex-row">
                    <div className="product-img d-flex">
                        <img src={product.image} alt="product image" id="product-img"/>
                    </div>

                    <div className="product-details-box d-flex flex-column">
                        <div id="productDetails">
                            {/* <!-- product details --> */}
                            <div className="product-name" id="product-name">{product.title}</div>
                            <div className="product-price fw-bold" id="product-price">Rs {product.price}</div>
                            <div className="product-description">
                                <div className="product-description-title fw-bold">Description</div>
                                <div className="product-description-data" id="product-description-data">
                                {product.description}
                                </div>
                            </div>
                        </div>

                        <div 
                            className="product-details-action btn btn-primary text-decoration-non"
                            onClick={()=>{
                                setCart({...cart,products:[...cart.products,id]});
                            }}
                        >Add to cart</div>
                        <a href="cart.html" id="goToCartBtn" className="product-details-action btn btn-warning text-decoration-none">
                            Go to cart
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;