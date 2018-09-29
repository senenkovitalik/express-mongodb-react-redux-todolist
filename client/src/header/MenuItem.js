import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import {withRouter} from 'react-router';

const MenuItem = ({ to, title, onClickAction, history, location: { pathname } }) => {
  const isActive = (to === pathname)
    ? true
    : (to !== "/")
      ? pathname.startsWith(to)
      : false;

  return (
    <NavItem>
      <NavLink active={isActive} onClick={() => {
        history.push(to);
        onClickAction();
      }}>{title}</NavLink>
    </NavItem>
  );
};

export default withRouter(MenuItem);
