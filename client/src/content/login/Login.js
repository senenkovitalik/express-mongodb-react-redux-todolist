import React, {Component} from 'react';

import {
  Container,
  Row,
  Col,
  Label,
  FormGroup,
  Button,
  Alert
} from 'reactstrap';

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from'availity-reactstrap-validation';

import { Link } from 'react-router-dom';

import icon from './login.svg';
import './login.css';

import { createFormData } from '../../utils';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { alert: false };

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  handleValidSubmit(event, values) {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: createFormData(values)
    };

    fetch('/api/login', opts).then(res => {
      if (res.ok && res.status === 200) {
        this.props.login();
        this.props.history.push('/');
      }
      if (res.status === 401) {
        // show invalid login/pass
        this.setState({ alert: true });
      }
    }).catch(err => console.error(err));
  }

  onDismiss() {
    this.setState({ alert: false });
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs="9">
            <div className="mt-5 mb-4">
              <img src={icon} width="50px" height="50px" />
              <span className="text-uppercase font-weight-bold ml-1">Login</span>
            </div>
            <Alert color="danger" isOpen={this.state.alert} toggle={this.onDismiss}>
              Invalid email, password. Please, try again.
            </Alert>
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvGroup>
                <Label for="email" className="text-uppercase">Email address</Label>
                <AvInput type="text"
                         className="form-control"
                         id="email"
                         name="email"
                         placeholder="Email address"
                         required
                />
                <AvFeedback>Email must looks like email@example.com</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="password" className="text-uppercase">Password</Label>
                <AvInput type="password"
                         className="form-control"
                         id="password"
                         name="password"
                         placeholder="Password"
                         required
                />
                <AvFeedback>Please, type a correct password.</AvFeedback>
              </AvGroup>
              <FormGroup>
                <Button color="success" className="float-right">Login</Button>
              </FormGroup>
            </AvForm>
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