import { Link, useNavigate, useParams } from 'react-router-dom';
import './ProductDetails.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { addProductToUserCart, getProductDetailsById } from '../../APIs/fakeStoreProdApis';
import CartContext from '../../context/CartContext';
import UserContext from '../../context/UserContext';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { user } = useContext(UserContext);
    const { setCart } = useContext(CartContext);
    const navigator = useNavigate();
    async function downloadProduct() {
        const response = await axios.get(getProductDetailsById(id));
        console.log(response.data);
        setProduct(response.data);
    }

    async function addProductToCart() {
        if (!user) {
            return;
        }
        const response = await axios.put(addProductToUserCart(), {
            userId: user.id,
            productId: id
        })
        setCart({ ...response.data });
        navigator(`/cart/${user.id}`);
    }

    useEffect(() => {
        downloadProduct();
    }, []);


    return (
        product &&
        <div className="container">
            <div className="row">
                <div className="product-details-wrapper d-flex justify-content-between align-items-start flex-row">
                    <div className="product-img d-flex">
                        <img src={product.image} alt="product image" id="product-img" />
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

                        {
                            user && <div
                                className="product-details-action btn btn-primary text-decoration-non"
                                onClick={() => {
                                    addProductToCart();
                                }}
                            >Add to cart</div>
                        }
                        {
                            user && <Link to={`/cart/${id}`} id="goToCartBtn" className="product-details-action btn btn-warning text-decoration-none">
                                Go to cart
                            </Link>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;