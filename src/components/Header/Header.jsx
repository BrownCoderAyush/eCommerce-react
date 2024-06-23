import React, { useEffect, useState } from 'react';
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

function Header(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [token,setToken,removeToken] = useCookies(['jwt-token']);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(()=>{
    console.log(token['jwt-token'], "token");
  },[token]);
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
                <DropdownItem>Cart</DropdownItem>
                <DropdownItem>Setting</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  {
                    token['jwt-token']?
                      <Link onClick={()=>removeToken('jwt-token')} to="/signin">
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
          <NavbarText>Username</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;