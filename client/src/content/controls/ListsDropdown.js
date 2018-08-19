import React from 'react';
import { Col, Input, FormGroup } from "reactstrap";

class ListsDropdown extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup row>
                <Col xs="2">List:</Col>
                <Col xs="10">
                    <Input type="select" name="list">
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
