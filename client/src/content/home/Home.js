import React, {Component} from 'react'
import {
  Row,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './home.css';

export default class Home extends Component {
  render() {
    return (
      <div id="fullpage">
        <div className="section">
          <Row className="align-items-center inside-section" id="section_1">
            <Col className="text-center">
              <h1 className="display-1">Hello!</h1>
              <p className="lead font-weight-bold">Welcome to awesome and pretty simple planning tool - To Do List!</p>
              <p className="lead font-weight-bold"><Link to="/login">Sign in</Link> or <Link to="/signup">Sign up</Link> to start using To Do list.</p>
            </Col>
          </Row>
        </div>

        {/*<div className="section">*/}
          {/*<Row className="align-items-center inside-section" style={{backgroundImage: url('img/pen-calendar-to-do-checklist.jpg')}}>*/}
            {/*<Col sm md="6">*/}
              {/*<img src="img/528917900.jpg" className="img-fluid" />*/}
            {/*</Col>*/}
            {/*<Col sm md="6" className="text-right">*/}
              {/*<p className="font-weight-bold lead">Create lists as you like.</p>*/}
            {/*</Col>*/}
          {/*</Row>*/}
        {/*</div>*/}

        {/*<div className="section">*/}
          {/*<Row className="align-items-center inside-section" style={{backgroundImage: url('img/pexels-photo-58457.jpeg')}}>*/}
            {/*<Col sm md="6" className="order-sm-last">*/}
              {/*<img src="img/to do list.jpg" className="img-fluid" />*/}
            {/*</Col>*/}
            {/*<Col sm md="6" className="order-sm-first text-left">*/}
              {/*<p className="font-weight-bold lead">Check tasks after they are done.</p>*/}
            {/*</Col>*/}
          {/*</Row>*/}
        {/*</div>*/}

        {/*<div className="section">*/}
          {/*<Row className="align-items-center inside-section" style={{backgroundImage: url('img/startup-photos.jpg')}}>*/}
            {/*<Col sm md="6" className="order-sm-first">*/}
              {/*<img src="img/pexels-photo-279415.jpeg" className="img-fluid" />*/}
            {/*</Col>*/}
            {/*<Col sm md="6" className="order-sm-last text-right">*/}
              {/*<p className="font-weight-bold lead">Filter you tasks</p>*/}
            {/*</Col>*/}
          {/*</Row>*/}
        {/*</div>*/}
      </div>
    )
  }
}