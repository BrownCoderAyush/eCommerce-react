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
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie' 

// css imports 
import './Header.css';
import { useCookies } from 'react-cookie';
import UserContext from '../../context/UserContext';
import { jwtDecode } from 'jwt-decode';
import CartContext from '../../context/CartContext';


function Header(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [token,removeToken] = useCookies(['jwt-token']);
  const {user,setUser} = useContext(UserContext);
  const {cart,setCart} = useContext(CartContext);

 

  function logout() {
    // removeToken('jwt-token', {httpOnly: true , path:'/'});
    // axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/logout`, {withCredentials: true});
    setCart({products:[]})
    setUser(null);
    removeToken('jwt-token',{httpOnly: true});
  }

  const toggle = () => setIsOpen(!isOpen);
  useEffect(()=>{
    // debugger
    
    if(token['jwt-token'])console.log("jwt-token present in cookie");
  })
  
  useEffect(()=>{
    if(token['jwt-token']){
      console.log('jwt-token hereaaaa');
      console.log(token['jwt-token'],'jwt-token here');
      const tokenData = jwtDecode(token['jwt-token']);
      setUser(tokenData);
      // console.log(tokenData.user,"user");
    }
  },[])

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
                {user&&<DropdownItem>Cart {cart.products.length}</DropdownItem>}
                <DropdownItem>Setting</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  {
                    token['jwt-token']?
                      <Link onClick={()=>{
                        logout();
                        }} to="/signin">
                        Logout
                      </Link>
                      :
                      <Link to="/signin">
                        SignIn
                      </Link>
                  }
                  
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {user&&<NavbarText>{user.user}</NavbarText>}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;