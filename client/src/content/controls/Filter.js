import React from 'react';
import {
    Col, Input, FormGroup
} from "reactstrap";

class Filter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup row>
                <label htmlFor="filter" className="col-2 col-form-label">Filter</label>
                <Col xs="10">
                    <Input type="select" name="filter" className="form-control" id="filter">
                        <option>Show Active</option>
                        <option>Show Completed</option>
                        <option>Show All</option>
                    </Input>
                </Col>
            </FormGroup>
        );
    }
}

export default Filter;