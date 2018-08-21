import React, {Component} from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button
} from 'reactstrap';
import {
  Link
} from 'react-router-dom';
import icon from './signup.svg';
import './signup.css';

export default class Signup extends Component {

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs="9">
            <div className="mt-5 mb-4">
              <img src={icon} width="50px" height="50px" />
              <span className="text-uppercase font-weight-bold ml-1">Sign up</span>
            </div>
            <Form>
              <FormGroup>
                <label htmlFor="username" className="text-uppercase">Username</label>
                <input type="text" className="form-control" id="username" name="username" placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="email" className="text-uppercase">Email address</label>
                <input type="text" className="form-control" id="email" name="email" placeholder="Email address" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="password" className="text-uppercase">Password</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="conf_password" className="text-uppercase">Confirm Password</label>
                <input type="password" className="form-control" id="conf_password" name="password_conf" placeholder="Confirm Password" />
              </FormGroup>
              <FormGroup>
                <Button type="submit" color="success" className="float-right">Sign up</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>

        <hr />

        <Row className="justify-content-center">
          <Col xs="9" className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center">
              <strong>Already have an account?</strong>
            </p>
            <Button tag={Link} color="secondary" className="mb-5" to="/login">Login</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
