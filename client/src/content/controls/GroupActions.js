import React from 'react';
import { Col, Input, FormGroup } from "reactstrap";

class GroupActions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup row>
                <Col xs="3">Group actions:</Col>
                <Col xs="9">
                    <Input type="select" name="filter">
                        <option>Select/Deselect All</option>
                        <option>Complete/Activate selected</option>
                    </Input>
                </Col>
            </FormGroup>
        );
    }
}

export default GroupActions;