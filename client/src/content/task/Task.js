import React, {Component} from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faTimesCircle,
  faClock,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

export default class Task extends Component {
  render() {
    return (
      <Container>
      <Row className="justify-content-center">
        <Col lg="7">
          <Form>
            {/*{<!-- Name -->}*/}
            <div className="mt-2">
              <label htmlFor="name"><strong>What need to done?</strong></label>
              <input className="form-control" id="name" name="title" defaultValue="Task #1" />
            </div>

            {/*{<!-- Done -->}*/}
            <div className="form-check">
              <label>
                <input type="checkbox" className="form-check-input" />
                  <small>Are task is done?</small>
              </label>
            </div>

            {/*{<!-- Deadline -->}*/}
            <FormGroup>
              <strong>Deadline</strong><br />

              {/*{<!-- Date -->}*/}
              <div className="mb-1 d-flex flex-nowrap">
                <InputGroup>
                  <input type="date" className="form-control" />
                  <div className="input-group-append">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faCalendarAlt} style={{width: 16+'px'}} />
                    </InputGroupText>
                  </div>
                </InputGroup>

                <Button outline color="danger">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </Button>
              </div>

              {/*{<!-- Time -->}*/}
              <div className="d-flex flex-nowrap">

                {/*{<!-- Input -->}*/}
                <InputGroup>
                  <input type="time" className="form-control" />
                  <div className="input-group-append">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faClock} />
                    </InputGroupText>
                  </div>
                </InputGroup>

                {/*{<!-- Remove button-->}*/}
                <Button outline color="danger">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </Button>
              </div>
            </FormGroup>

            {/*{<!-- Notification -->}*/}
            <FormGroup>
              <strong>Notification</strong>
              <Row>
                <label htmlFor="reminder" className="col-4 col-md-3 col-form-label">Remind me</label>
                <Col xs="8" md="9">
                  <select className="form-control" id="reminder">
                    <option>5 minutes</option>
                    <option>10 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>6 hours</option>
                    <option>12 hours</option>
                    <option>1 day</option>
                  </select>
                </Col>
              </Row>
            </FormGroup>

            {/*{<!-- List manipulation -->}*/}
            <FormGroup>
              <label htmlFor="list"><strong>List</strong></label>
              <div className="d-flex flex-nowrap">
                <select className="form-control" id="list">
                  <option>List #1</option>
                  <option>List #2</option>
                  <option>List #3</option>
                </select>
                <Button outline color="info">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </Button>
              </div>
            </FormGroup>

            {/*{<!-- Submit -->}*/}
            <div className="d-flex justify-content-end">
              <Button color="danger" className="mr-1">Remove</Button>
              <Button color="success">Save</Button>
            </div>
          </Form>
        </Col>
      </Row>
      </Container>
    );
  }
}