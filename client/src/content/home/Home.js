import React, {Component} from 'react'
import {
  Row,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import back_1 from '../../img/pexels-photo-317356.jpeg';
import back_2 from '../../img/pen-calendar-to-do-checklist.jpg';
import back_3 from '../../img/pexels-photo-58457.jpeg';
import back_4 from '../../img/startup-photos.jpg';
import img_2 from '../../img/528917900.jpg';
import img_3 from '../../img/to do list.jpg';
import img_4 from '../../img/pexels-photo-279415.jpeg';
import './home.css';

export default class Home extends Component {
  render() {
    return (
      <div id="fullpage">
        <Row noGutters className="align-items-center inside-section" style={{backgroundImage: `url(${back_1})`}}>
          <Col className="text-center">
            <h1 className="display-1">Hello!</h1>
            <p className="lead font-weight-bold">Welcome to awesome and pretty simple planning tool - To Do List!</p>
            <p className="lead font-weight-bold"><Link to="/login">Sign in</Link> or <Link to="/signup">Sign up</Link> to start using To Do list.</p>
          </Col>
        </Row>

        <Row noGutters className="align-items-center inside-section" style={{backgroundImage: `url(${back_2})`}}>
          <Col sm md="6">
            <img src={img_2} className="img-fluid" />
          </Col>
          <Col sm md="6" className="text-right">
            <p className="font-weight-bold lead">Create lists as you like.</p>
          </Col>
        </Row>

        <Row noGutters className="align-items-center inside-section" style={{backgroundImage: `url(${back_3})`}}>
          <Col sm md="6" className="order-sm-last">
            <img src={img_3} className="img-fluid" />
          </Col>
          <Col sm md="6" className="order-sm-first text-left">
            <p className="font-weight-bold lead">Check tasks after they are done.</p>
          </Col>
        </Row>

        <Row noGutters className="align-items-center inside-section" style={{backgroundImage: `url(${back_4})`}}>
          <Col sm md="6" className="order-sm-first">
            <img src={img_4} className="img-fluid" />
          </Col>
          <Col sm md="6" className="order-sm-last text-right">
            <p className="font-weight-bold lead">Filter you tasks</p>
          </Col>
        </Row>
      </div>
    )
  }
}