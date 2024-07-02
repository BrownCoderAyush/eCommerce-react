import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// css imports
import "./Cart.css";

//component imports
import Loader from "../../components/Loader/Loader";
import OrderDetailsProduct from "../../components/OrderDetailsProduct/OrderDetailsProduct";

// API urls
import { getProductDetailsById, updateProductInCart } from "../../APIs/fakeStoreProdApis";

//context
import UserContext from "../../context/UserContext";
import CartContext from "../../context/CartContext";

function  Cart(){
    const {cart,setCart} = useContext(CartContext);
    const {user}= useContext(UserContext);
    const [products,setProducts]=useState([]);

    async function onProductUpdate(productId,quantity){
        if(!user){
            return;
        }
        const response = await axios.put(updateProductInCart(),{userId : user.id, productId ,quantity});
        setCart({...response.data});
        setProducts(response.data.products);
    }
    
    async function downloadProductDetails(){
        const productQuantMapping = {};
        cart.products.forEach(product => {
            productQuantMapping[product.productId]=product.quantity;
        });
        const productsPromise = cart.products.map(product => axios.get(getProductDetailsById(product.productId)));
        const productPromiseResponse = await axios.all(productsPromise);

        const downloadedProducts = productPromiseResponse.map((productDetails)=>{
            return {...productDetails.data,quantity:productQuantMapping[productDetails.data.id]}
        });
        setProducts(downloadedProducts);
    }

    useEffect(()=>{
        if(cart && cart.products.length){
            downloadProductDetails();
        }
        
    },[cart])

    return (
        <>
        {
            !cart && <Loader/>
        }
        <div className="cartPage">
            
        <div className="container ">
            <div className="row">
                <h2 className="cart-title text-center">Your cart</h2>
                <div className="cart-wrapper d-flex flex-row">
                    <div className="order-details d-flex flex-column" id="orderDetails">
                       
                        <div className="order-details-title fw-bold">Order Details</div>
                        {
                            products.length>0 && products.map((product)=><OrderDetailsProduct 
                                    key={product.id} 
                                    image={product.image} 
                                    title={product.title} 
                                    price={product.price} 
                                    quantity={product.quantity}
                                    onRemove={()=>onProductUpdate(product.id,0)}
                                />
                            )
                        }
                       
                        
                    </div>

                    <div className="price-details d-flex flex-column" id="priceDetails">
                        <div className="price-details-box">             

                            <div className="price-details-title fw-bold">Price Details</div>
                            <div className="price-details-data">
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Price</div>
                                    <div id="total-price"></div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Discount</div>
                                    <div>10</div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Delivery Charges</div>
                                    <div>FREE</div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Total</div>
                                    <div id="net-price"></div>
                                </div>
                            </div>

                        </div>
                        <div className="price-details-btn-group">
                            <Link to="/products?category=" className="continue-shopping-btn btn btn-info text-decoration-none">
                                Continue Shopping
                            </Link>
                            <Link to="/products?category=" className="checkout-btn btn btn-primary text-decoration-none">
                                Checkout
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default Cart;