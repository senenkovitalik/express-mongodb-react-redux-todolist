import React from 'react';
import {
    Card,
    CardBody,
  Input
} from 'reactstrap';
import './task.css';

class Task extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="task w-100">
                <CardBody>
                    <div className="form-check">
                      <Input className="form-check-input" type="checkbox"/>
                      <label className="mb-0">
                        <span className="d-flex flex-column task-description">
                          <span>Task #</span>
                          <span className="text-dark"><small>Tue, 1, Aug. 2018, 10:00</small></span>
                        </span>
                      </label>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default Task;