import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

export const Header = ()=>(
  <Navbar fixedTop style={{background:"#800000",borderRadius:0, borderWidth:"0px", fontSize:"125%"}}>
    <Navbar.Header>
      <Navbar.Brand>
        <Link style={{color:"white"}} to="/">FIFA Pool</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1}>
        <Link style={{color:"white"}} to="/create">Create a pool</Link>
      </NavItem>
      <NavItem eventKey={2}>
        <Link style={{color:"white"}} to="/pools">Join an existing pool</Link>
      </NavItem>
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={1}>
        <Link style={{color:"white"}} to="/login">Login</Link>
      </NavItem>
      <NavItem eventKey={2}>
        <Link style={{color:"white"}} to="/signUp">Create an account</Link>
      </NavItem>
    </Nav>
  </Navbar>
)