import React from 'react';
import {
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  Button
} from "reactstrap";
import {NavLink as nav} from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: true };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  logout() {
    fetch('/api/logout')
      .then(res => {
        if (res.ok && res.status === 200) {
          this.props.logout();
          this.props.history.push('/');
        }
      })
      .catch(err => console.log(err));
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
              <NavLink tag={nav} to="/list/1">Lists</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={nav} to="/task">Task</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={nav} to="/about_us">About us</NavLink>
            </NavItem>
            <div className="form-inline">
              {
                !this.props.logged &&
                <Button tag={nav}
                        to="/login"
                        color="success"
                        onClick={this.toggleNavbar}
                        outline>Login</Button>
              }
              {
                this.props.logged &&
                <Button color="success"
                        outline
                        onClick={() => {
                          this.logout(); this.toggleNavbar();
                        }}>Logout</Button>
              }
              {
                !this.props.logged &&
                <Button tag={nav}
                        to="/signup"
                        color="primary"
                        onClick={this.toggleNavbar}
                        outline>Sign Up</Button>
              }
            </div>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;