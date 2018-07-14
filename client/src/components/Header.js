import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

export const Header = ()=>(
  <Navbar style={{background:"#800000",borderRadius:0, borderWidth:"0px"}}>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">FIFA Pool</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1}>
        <Link to="/create">Create a pool</Link>
      </NavItem>
      <NavItem eventKey={2}>
        <Link to="/pools">Join an existing pool</Link>
      </NavItem>
      {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.4}>Separated link</MenuItem>
      </NavDropdown> */}
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={1}>
        <Link to="/login">Login</Link>
      </NavItem>
      <NavItem eventKey={2}>
        <Link to="/signUp">Create an account</Link>
      </NavItem>
    </Nav>
  </Navbar>
)