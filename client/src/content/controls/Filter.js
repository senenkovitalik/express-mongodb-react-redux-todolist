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
                <Col xs="2">Filter:</Col>
                <Col xs="10">
                    <Input type="select" name="filter">
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