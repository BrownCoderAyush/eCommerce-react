import { useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import { getCartByUser } from "../APIs/fakeStoreProdApis";
import axios from "axios";

export default function useCart(){
    const {cart,setCart} = useContext(CartContext);
    async function fetchUserCart(userId){
        const response = await axios.get(getCartByUser(userId));
        setCart(response.data[0]);
    }
    return {cart,setCart,fetchUserCart};
}