import { Routes , Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import ProductList from "../pages/ProductList/ProductList";
import ProductDetails from "../components/ProductDetails/ProductDetails";

function MainRoutes(){

    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/products/:id" element={<ProductDetails/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    )   

}

export default MainRoutes;