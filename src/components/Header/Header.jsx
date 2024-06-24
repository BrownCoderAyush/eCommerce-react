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

// css imports 
import './Header.css';
import { useCookies } from 'react-cookie';
import UserContext from '../../context/UserContext';
import { jwtDecode } from 'jwt-decode';
import CartContext from '../../context/CartContext';


function Header(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [token,setToken,removeToken] = useCookies(['jwt-token']);
  const {user,setUser} = useContext(UserContext);
  const {cart,setCart} = useContext(CartContext);
  
  const toggle = () => setIsOpen(!isOpen);

  useEffect(()=>{
    if(token['jwt-token']){
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
                        removeToken('jwt-token');
                        setUser(null);
                        setCart({products:[]})
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