import React, {Component} from 'react'
import {
  Container,
  Row,
  Col,
  FormGroup,
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
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function getTaskStateObj(task) {
  const obj = {
    title: '',
    completed: false,
    date: '',
    time: ''
  };

  if (task) {
    const regexp = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}):00.000Z$/;
    const match = regexp.exec(task.dueDate);

    obj.title = task.title;
    obj.completed = task.completed;
    obj.date = match[1] || '';
    obj.time = match[2] || '';
  }

  return obj;
}

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = getTaskStateObj(
      this.props.tasks[this.props.match.params.task_id] || null
    );

    this.handleChange = this.handleChange.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // todo Are task is done? -> trigger task status
  // todo change list
  handleValidSubmit() {

    const { task_id } = this.props.match.params;
    const { title, completed } = this.state;

    const date_str = this.state.date !== '' ? this.state.date : null;
    const time_str = this.state.time !== '' ? this.state.time : null;
    let dueDate = null;

    if (date_str && time_str) {
      dueDate = new Date(`${date_str}T${time_str}:00`).toISOString();
    } else if (date_str && !time_str) {
      dueDate = new Date(`${date_str}T00:00:00`).toISOString();
    }

    const old_task = this.props.tasks[task_id];
    const new_task = { _id: task_id, title, completed, dueDate };

    if (old_task) {
      this.props.updateTask(this.props.match.params.list_id, new_task)
    } else {
      this.props.createTask(this.props.match.params.list_id, new_task);
    }

    // todo get dispatch callback AND THEN call line below
    // this.props.history.push(`/lists/${this.props.match.params.id}`);
  }

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
    const { task_id, list_id } = this.props.match.params;
    return (
      <Container>
      <Row className="justify-content-center">
        <Col lg="7">
          <AvForm onValidSubmit={this.handleValidSubmit}>
            {/*{<!-- Title -->}*/}
            <AvGroup className="mt-2 mb-0">
              <label htmlFor="title"><strong>What need to done?</strong></label>
              <AvInput
                required
                validate={{ minLength: { value: 3 }, maxLength: { value: 25 }}}
                id="title"
                name="title"
                placeholder="Task #1"
                onChange={this.handleChange}
                value={this.state.title}
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
                  checked={this.state.completed}
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
              {
                this.state.date &&
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
              }
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
                this.props.match.params.task_id
                && <Button color="danger"
                           className="mr-1"
                           onClick={() => this.props.deleteTask(list_id, task_id)}
                >Remove</Button>
              }
              <Button color="success">Save</Button>
            </div>
          </AvForm>
        </Col>
      </Row>
      </Container>
    );
  }
}