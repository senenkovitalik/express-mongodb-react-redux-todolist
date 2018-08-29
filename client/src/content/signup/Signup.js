import React, {Component} from 'react';

import {
  Container,
  Row,
  Col,
  Label,
  FormText,
  Button,
  Alert
} from 'reactstrap';

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation';

import { Link } from 'react-router-dom';

import icon from './signup.svg';
import './signup.css';

export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = { visible: false };

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  handleValidSubmit(event, values) {
    const data = [];

    for(let prop in values) {
      if (values.hasOwnProperty(prop)) {
        let encKey = encodeURIComponent(prop);
        let encVal = encodeURIComponent(values[prop]);
        data.push(`${encKey}=${encVal}`);
      }
    }

    const formBody = data.join("&");

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(res => {
      if (res.ok && res.status === 201) {
        this.props.login();
        this.props.history.push('/');
      } else if (res.status === 409) {
        // try another email alert
        this.setState({ visible: true })
      }
    }).catch(err => console.error(err));
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Container>
        {!this.props.logged &&
          <div>
            <Row className="justify-content-center">
              <Col xs="9">
                <div className="mt-5 mb-4">
                  <img src={icon} width="50px" height="50px"/>
                  <span className="text-uppercase font-weight-bold ml-1">Sign up</span>
                </div>

                <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Email already in use. Please, try another one.
                </Alert>

                <AvForm onValidSubmit={this.handleValidSubmit}>
                  <AvGroup>
                    <Label for="username" className="text-uppercase">Username</Label>
                    <AvInput type="text"
                             className="form-control"
                             id="username"
                             name="username"
                             validate={{maxLength: {value: 20}, minLength: {value: 5}}}
                             placeholder="Username"
                             required/>
                    <AvFeedback>Type username</AvFeedback>
                    <FormText>Length 5-20 symbols.</FormText>
                  </AvGroup>
                  <AvGroup>
                    <Label for="email" className="text-uppercase">Email address</Label>
                    <AvInput type="text"
                             className="form-control"
                             id="email"
                             name="email"
                             validate={{email: true}}
                             placeholder="Email address"
                             required/>
                    <AvFeedback>Type correct email address.</AvFeedback>
                    <FormText>email@example.com</FormText>
                  </AvGroup>
                  <AvGroup>
                    <Label for="password" className="text-uppercase">Password</Label>
                    <AvInput type="password"
                             className="form-control"
                             id="password"
                             name="password"
                             validate={{pattern: {value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,20}$'}}}
                             placeholder="Password"
                             required/>
                    <AvFeedback>Fill this field</AvFeedback>
                    <FormText>Safe password must contain 8-20 symbols of letters, numbers, special signs
                      #$^+=!*()@%&.</FormText>
                  </AvGroup>
                  <AvGroup>
                    <Label for="conf_password" className="text-uppercase">Confirm Password</Label>
                    <AvInput type="password"
                             className="form-control"
                             id="conf_password"
                             name="conf_password"
                             validate={{match: {value: 'password'}}}
                             placeholder="Confirm Password"
                             required/>
                    <AvFeedback>Type same as password field</AvFeedback>
                    <FormText>Same as password field.</FormText>
                  </AvGroup>
                  <AvGroup>
                    <Button type="submit" color="success" className="float-right">Sign up</Button>
                  </AvGroup>
                </AvForm>
              </Col>
            </Row>

            <hr/>

            <Row className="justify-content-center">
              <Col xs="9" className="d-flex flex-column justify-content-center align-items-center">
                <p className="text-center">
                  <strong>Already have an account?</strong>
                </p>
                <Button tag={Link} color="secondary" className="mb-5" to="/login">Login</Button>
              </Col>
            </Row>
          </div>
        }

        {this.props.logged &&
          <Row className="justify-content-center">
            <Col xs="9" className="text-center">
              <h2>Congratulation!!!</h2>
              <p>Your account has been created.</p>
              <p>Go to <Link to="/">Home</Link> page.</p>
            </Col>
          </Row>
        }
      </Container>
    );
  }
}
