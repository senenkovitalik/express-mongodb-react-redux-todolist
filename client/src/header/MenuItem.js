import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import {withRouter} from 'react-router';

const MenuItem = ({ to, title, onClickAction, history, location }) => {
  return (
    <NavItem>
      <NavLink active={location.pathname === to} onClick={() => {
        history.push(to);
        onClickAction();
      }}>{title}</NavLink>
    </NavItem>
  );
};

export default withRouter(MenuItem);