import React from 'react';
import { Col, Input, FormGroup } from "reactstrap";

class GroupActions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup row>
                <label htmlFor="actions" className="col-3 col-form-label">Group actions</label>
                <Col xs="9">
                    <Input type="select" className="form-control" name="actions" id="actions">
                        <option>Select/Deselect All</option>
                        <option>Complete/Activate selected</option>
                    </Input>
                </Col>
            </FormGroup>
        );
    }
}

export default GroupActions;