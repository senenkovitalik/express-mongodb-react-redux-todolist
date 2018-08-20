import React from 'react';
import { Col, Input, FormGroup } from "reactstrap";

class ListsDropdown extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup row>
                <label htmlFor="list" className="col-2 col-form-label">List</label>
                <Col xs="10">
                    <Input type="select" name="list" className="form-control" id="list">
                        <option>List #1</option>
                        <option>List #2</option>
                        <option>List #3</option>
                    </Input>
                </Col>
            </FormGroup>
        );
    }
}

export default ListsDropdown;
