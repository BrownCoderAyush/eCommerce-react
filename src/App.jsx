
import { useState } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import UserContext from './context/UserContext'

import MainRoutes from './routes/MainRoutes'
import CartContext from './context/CartContext'
function App() {

  const [user,setUser]=useState(null);
  const [cart,setCart]=useState({products:[]});
  return (
    <UserContext.Provider value={{user,setUser}}>
      <CartContext.Provider value={{cart,setCart}}>
      <div>    
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
      <Footer/>
      </div>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App
