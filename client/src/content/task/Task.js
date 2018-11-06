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
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation';
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
      title: '',
      completed: false,
      date: '',
      time: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleValidSubmit() {
    if (this.state.completed) {
      /*
      complete task
      PATCH /api/lists/:listID/tasks/:taskID/trigger
      */
    } else {
      // create new task
      const dateString = this.state.date !== '' ? this.state.date : null;
      const timeString = this.state.time !== '' ? this.state.time : null;

      let dueDate = null;

      if (dateString && timeString) {
        dueDate = new Date(`${dateString}T${timeString}:00`).toISOString();
      } else if (dateString && !timeString) {
        dueDate = new Date(`${dateString}T00:00:00`).toISOString();
      }

      const { title, completed } = this.state;

      this.props.createTask(this.props.match.params.id, {
        title, completed, dueDate
      });

      // todo get dispatch callback AND THEN call line below
      // this.props.history.push(`/lists/${this.props.match.params.id}`);
    }
  }

  // todo process all data by availity-reactstrap-validation
  handleChange(e) {
    const { name, value, checked } = e.target;

    switch (name) {
      case "title":
      case "date":
      case "time":
        this.setState({ [name]: value });
        break;
      case "completed":
        this.setState({ completed: checked });
        break;
    }
  }

  clearValue(name) {
    this.setState({ [name]: '' });
  }

  render() {
    return (
      <Container>
      <Row className="justify-content-center">
        <Col lg="7">
          <AvForm onValidSubmit={this.handleValidSubmit}>
            {/*{<!-- Title -->}*/}
            <AvGroup className="mt-2 mb-0">
              <label htmlFor="name"><strong>What need to done?</strong></label>
              <AvInput
                required
                validate={{ minLength: { value: 3 }, maxLength: { value: 25 }}}
                id="title"
                name="title"
                placeholder="Task #1"
                onChange={this.handleChange}
                value={this.state.value}
              />
              <AvFeedback>Please, fill  this field.</AvFeedback>
            </AvGroup>

            {/*{<!-- Completed -->}*/}
            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="completed"
                  checked={this.state.done}
                  onChange={this.handleChange}
                  disabled={!this.props.match.params.task_id}
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
                    min={new Date().toISOString().substring(0, 10)}
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
                    disabled={!this.state.date}
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
                      l => <option key={l._id} value={l._id}>{l.title}</option>
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
              <Button color="success">Save</Button>
            </div>
          </AvForm>
        </Col>
      </Row>
      </Container>
    );
  }

  // componentDidMount() {
  //   /*
  //   If store doesn't contain lists, fetch them.
  //    */
  //   if (!Object.keys(this.props.lists).length) {
  //     this.props.fetchLists();
  //   }
  // }
}