import { Routes, Route } from "react-router-dom";


import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import ProductList from "../pages/ProductList/ProductList";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import Cart from "../pages/Cart/Cart";

function MainRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
            <Route path="/cart/:userId" element={<Cart />} />
        </Routes>
    )

}

export default MainRoutes;