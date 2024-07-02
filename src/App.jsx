import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react'

// routes
import MainRoutes from './routes/MainRoutes'

//component imports
import Header from './components/Header/Header'

// context imports
import UserContext from './context/UserContext'
import CartContext from './context/CartContext'


// API URLs
import { fetchUserCart } from './APIs/APIFetchFunctions'


function App() {

  const [user,setUser]=useState(null);
  const [cart,setCart]=useState(null);
  async function accessToken() {

      const res = await axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/accesstoken`, {withCredentials: true})
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
      </main>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App
