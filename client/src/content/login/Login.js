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
import icon from './login.svg';
import './login.css';

export default class Login extends Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs="9">
            <div className="mt-5 mb-4">
              <img src={icon} width="50px" height="50px" />
              <span className="text-uppercase font-weight-bold ml-1">Login</span>
            </div>
            <Form>
              <FormGroup>
                <label htmlFor="email" className="text-uppercase">Email address</label>
                <input type="text" className="form-control" id="email" name="email" placeholder="Email address" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="password" className="text-uppercase">Password</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <Button color="success" className="float-right">Login</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>

        <hr />

        <Row className="justify-content-center">
          <Col xs="9" className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center">
              <strong>New user?</strong><br />Create a To Do account.
            </p>
            <Button tag={Link} color="secondary" className="mb-5" to="/signup">Create account</Button>
          </Col>
        </Row>

      </Container>
    )
  }
}