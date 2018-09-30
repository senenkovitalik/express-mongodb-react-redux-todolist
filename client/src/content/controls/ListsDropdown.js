import React from 'react';
import {Col, Input, FormGroup} from "reactstrap";

class ListsDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.props.setCurrentList(event.target.value);
  }

  render() {
    return (
      <FormGroup row>
        <label htmlFor="list" className="col-2 col-form-label">List</label>
        <Col xs="10">
          <Input
            type="select"
            name="list"
            className="form-control"
            id="list"
            value={this.props.current}
            onChange={this.handleChange}
          >
            {
              Object.values(this.props.lists)
                .map(l => <option key={l._id} value={l._id}>{l.title}</option>)
            }
          </Input>
        </Col>
      </FormGroup>
    );
  }
}

export default ListsDropdown;
