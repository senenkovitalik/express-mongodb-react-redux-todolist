import React from 'react';
import {
    Card,
    CardBody
} from 'reactstrap';

class Task extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="task">
                <CardBody className="d-flex flex-row" style={{padding: 0.5+'rem'}}>
                    <div>
                        <input type="checkbox" className="mr-2" />
                    </div>
                    <div className="d-flex flex-column">
                        <div>Write programs</div>
                        <small id="emailHelp" className="form-text text-primary">Tomorrow, 9:00</small>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default Task;