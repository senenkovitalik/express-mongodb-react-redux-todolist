import React, {Component} from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
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
import { Link } from 'react-router-dom';

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      done: false,
      date: '',
      time: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearValue = this.clearValue.bind(this);
  }

  handleChange(e) {
    const { name, value, checked } = e.target;

    switch (name) {
      case "name":
      case "date":
      case "time":
        this.setState({ [name]: value });
        break;
      case "done":
        this.setState({ done: checked });
        break;
    }
  }

  clearValue(name) {
    switch (name) {
      case "date":
      case "time":
        this.setState({ [name]: '' });
        break;
    }
  }

  render() {
    const minDate = new Date().toISOString().substring(0, 10);

    return (
      <Container>
      <Row className="justify-content-center">
        <Col lg="7">
          <Form>
            {/*{<!-- Name -->}*/}
            <div className="mt-2">
              <label htmlFor="name"><strong>What need to done?</strong></label>
              <input
                className="form-control"
                id="name"
                name="name"
                placeholder="Task #1"
                onChange={this.handleChange}
                value={this.state.value}
              />
            </div>

            {/*{<!-- Done -->}*/}
            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="done"
                  checked={this.state.done}
                  onChange={this.handleChange}
                />
                  <small>Are task is done?</small>
              </label>
            </div>

            {/*{<!-- Deadline -->}*/}
            <FormGroup>
              <strong>Deadline</strong><br />

              {/*{<!-- Date -->}*/}
              <div className="mb-1 d-flex flex-nowrap">
                <InputGroup>
                  <input
                    type="date"
                    name="date"
                    min={minDate}
                    className="form-control"
                    value={this.state.date}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <InputGroupText>
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        style={{width: 16+'px'}} />
                    </InputGroupText>
                  </div>
                </InputGroup>

                <Button type="button" outline color="danger">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    onClick={() => this.clearValue("date")}
                  />
                </Button>
              </div>

              {/*{<!-- Time -->}*/}
              <div className="d-flex flex-nowrap">

                {/*{<!-- Input -->}*/}
                <InputGroup>
                  <input
                    type="time"
                    name="time"
                    className="form-control"
                    value={this.state.time}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faClock} />
                    </InputGroupText>
                  </div>
                </InputGroup>

                {/*{<!-- Remove button-->}*/}
                <Button type="button" outline color="danger">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    onClick={() => this.clearValue("time")}
                  />
                </Button>
              </div>
            </FormGroup>

            {/*{<!-- Notification -->}*/}
            {/*<FormGroup>
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
            </FormGroup>*/}

            {/*{<!-- List manipulation -->}*/}
            <FormGroup>
              <label htmlFor="list"><strong>List</strong></label>
              <div className="d-flex flex-nowrap">
                <Input
                  value={this.props.match.params.id}
                  onChange={this.handleChange}
                  name="list"
                  type="select"
                  id="list"
                >
                  {
                    Object.values(this.props.lists).map(
                      l => <option key={l.id} value={l.id}>{l.title}</option>
                    )
                  }
                </Input>
                <Button outline color="info">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </Button>
              </div>
            </FormGroup>

            {/*{<!-- Submit -->}*/}
            <div className="d-flex justify-content-end">
              <Button
                tag={Link}
                to={`/lists/${this.props.match.params.id}`}
                color="primary"
                className="mr-1"
              >Cancel</Button>
              {
                this.props.match.params.task_id && <Button color="danger" className="mr-1">Remove</Button>
              }
              <Button color="success" onClick={() => console.log(this.state)}>Save</Button>
            </div>
          </Form>
        </Col>
      </Row>
      </Container>
    );
  }

  componentDidMount() {
    /*
    If store doesn't contain lists, fetch them.
     */
    if (!Object.keys(this.props.lists).length) {
      this.props.fetchLists();
    }
  }
}