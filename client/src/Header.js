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
                <NavbarBrand href='/' className="mr-auto">To Do List</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar}/>
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Link 1</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">Link 2</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Header;