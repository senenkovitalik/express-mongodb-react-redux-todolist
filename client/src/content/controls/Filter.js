import React from 'react';
import { Col, Input, FormGroup } from "reactstrap";
import { VisibilityFilter } from '../../redux/actions';

const { SHOW_ACTIVE, SHOW_COMPLETED, SHOW_ALL } = VisibilityFilter;

const Filter = function ({ list, setFilter }) {
  return (
    <FormGroup row>
      <label htmlFor="filter" className="col-2 col-form-label">Filter</label>
      <Col xs="10">
        <Input type="select"
               value={list.visibility_filter}
               onChange={e => setFilter(list._id, e.target.value)}
               className="form-control">
          <option value={SHOW_ACTIVE}>Show Active</option>
          <option value={SHOW_COMPLETED}>Show Completed</option>
          <option value={SHOW_ALL}>Show All</option>
        </Input>
      </Col>
    </FormGroup>
  )
};

export default Filter;