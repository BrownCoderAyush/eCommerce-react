import React, { useContext, useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie' 

// css imports 
import './Header.css';
import { useCookies } from 'react-cookie';
import UserContext from '../../context/UserContext';
import { jwtDecode } from 'jwt-decode';
import CartContext from '../../context/CartContext';
import axios from 'axios';
import useCart from '../../hooks/useCart';
import { fetchUserCart } from '../../APIs/APIFetchFunctions';

function Header(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [token,removeToken] = useCookies(['jwt-token']);
  const {user,setUser} = useContext(UserContext);
  const {cart,setCart} = useContext(CartContext);
  // const {fetchUserCart} = useCart();

  function logout() {
    removeToken('jwt-token', {httpOnly: true , path:'/'});
    axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/logout`, {withCredentials: true});
    setCart(null);
    setUser(null);
  }
 const toggle = () => setIsOpen(!isOpen);

  
  // useEffect(()=>{
  //   axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/accesstoken`, {withCredentials: true})
  //   .then(async(res) => {
  //     if(res.data.token){
  //       const tokenDetails = jwtDecode(res.data.token);
  //       fetchUserCart(tokenDetails.id,setCart);
  //     }
  //   }); 
  // },[])

  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand id='title'>
          <Link to="/">
          Shopease
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <UncontrolledDropdown nav inNavbar style={{marginRight:'2rem'}}>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                {user&&<DropdownItem><Link  style={{ textDecoration: 'none' , color:'#3c4043'}} to={`/cart/${user.id}`}>Cart {cart&&cart.products&&cart.products.length}</Link></DropdownItem>}
                <DropdownItem>Setting</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
              
                {user? <Link onClick={() => {
                  // debugger
                    logout();
                  }} to="/signin">Logout</Link> : <Link to="/signin">SignIn</Link>}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {user&&<NavbarText>{user.username}</NavbarText>}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;