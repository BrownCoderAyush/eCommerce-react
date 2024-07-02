import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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


// css imports 
import './Header.css';

// context imports
import UserContext from '../../context/UserContext';
import CartContext from '../../context/CartContext';

function Header(args) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

  function logout() {
    axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/logout`, { withCredentials: true });
    setCart(null);
    setUser(null);
  }
  const toggle = () => setIsOpen(!isOpen);


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
            <UncontrolledDropdown nav inNavbar style={{ marginRight: '2rem' }}>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                {user && <DropdownItem><Link style={{ textDecoration: 'none', color: '#3c4043' }} to={`/cart/${user.id}`}>Cart {cart && cart.products && cart.products.length}</Link></DropdownItem>}
                <DropdownItem>Setting</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>

                  {user ? <Link onClick={() => {
                    // debugger
                    logout();
                  }} to="/signin">Logout</Link> : <Link to="/signin">SignIn</Link>}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {user && <NavbarText>{user.username}</NavbarText>}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;