
import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import UserContext from './context/UserContext'

import MainRoutes from './routes/MainRoutes'
import CartContext from './context/CartContext'

import axios from 'axios'
import { useCookies } from 'react-cookie'
import { jwtDecode } from "jwt-decode";
import { fetchUserCart } from './APIs/APIFetchFunctions'


function App() {

  const [user,setUser]=useState(null);
  const [cart,setCart]=useState(null);
  const [token,setToken,removeToken] = useCookies(['jwt-token']);
  async function accessToken() {

      const res = await axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/accesstoken`, {withCredentials: true})
      setToken('jwt-token', res.data.token, {httpOnly: true});
      if(res.data.token){
        const tokenDetails = jwtDecode(res.data.token);
        setUser({username: tokenDetails.user, id: tokenDetails.id});
        
      }
    }; 
  
  function load(){
    if(!user){
      accessToken();
    }
    if(user){
      fetchUserCart(user.id,setCart);
    }
  }


  useEffect(()=>{
    load();
  },[user]);


  return (
    <UserContext.Provider value={{user,setUser}}>
      <CartContext.Provider value={{cart,setCart}}>
      <main>    
    {/* Common header for all pages  */}
      <Header 
          color='light' 
          light={true} 
          expand='md' 
          container='md' 
      />

    {/* router based rendering */}
      <MainRoutes/>
    {/* Common footer for all pages */}
      {/* <Footer/> */}
      </main>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App
