import React from 'react';
import {
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
  NavLink,
    Navbar
} from "reactstrap";
import { NavLink as nav, Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href='/' className="mr-auto">To Do</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar}/>
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={nav} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={nav} to="/lists">Lists</NavLink>
                        </NavItem>
                      <NavItem>
                        <NavLink tag={nav} to="/task">Task</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink tag={nav} to="/about_us">About us</NavLink>
                      </NavItem>
                      <div className="form-inline">
                        <Link to="/login" className="btn btn-outline-success" role="button">Login</Link>
                        <Link to="/signup" className="btn btn-outline-primary" role="button">Sign Up</Link>
                      </div>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Header;