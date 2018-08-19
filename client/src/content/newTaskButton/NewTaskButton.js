import React from 'react';
import { Button } from 'reactstrap';
import './NewTaskButton.css';

class NewTaskButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button id="new-task-button" color="primary">+</Button>
        );
    }
}

export default NewTaskButton;