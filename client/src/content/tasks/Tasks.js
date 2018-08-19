import React from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import Task from "./Task";
import './tasks.css';
import Filter from "../controls/Filter";
import GroupActions from "../controls/GroupActions";
import ListsDropdown from "../controls/ListsDropdown";
import NewTaskButton from "../newTaskButton/NewTaskButton";

class Tasks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className="justify-content-center">
                <Col xs="10">
                    <div className="mt-3">
                        <ListsDropdown />
                        <Filter />
                        <GroupActions />
                    </div>

                    <hr />

                    <div className="mb-3">
                        <div className="section-name text-primary font-weight-bold">Tomorrow</div>
                        <Task />
                        <Task />
                        <Task />
                        <div className="section-name text-primary font-weight-bold">Next week</div>
                        <Task />
                        <Task />
                        <div className="section-name text-primary font-weight-bold">Next month</div>
                        <Task />
                        <div className="section-name text-primary font-weight-bold">Later</div>
                        <Task />
                        <Task />
                        <Task />
                    </div>

                    <NewTaskButton />
                </Col>
            </Row>
        );
    }
}

export default Tasks;