import React from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import TaskItem from "./task-item/TaskItem";
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
            <Row noGutters className="justify-content-center">
                <Col xs="10">
                    <div className="mt-3">
                        <ListsDropdown />
                        <Filter />
                        <GroupActions />
                    </div>

                    <hr />

                    <div className="mb-3">
                        <div className="section-name text-primary font-weight-bold">Tomorrow</div>
                        <TaskItem />
                        <TaskItem />
                        <TaskItem />
                        <div className="section-name text-primary font-weight-bold">Next week</div>
                        <TaskItem />
                        <TaskItem />
                        <div className="section-name text-primary font-weight-bold">Next month</div>
                        <TaskItem />
                        <div className="section-name text-primary font-weight-bold">Later</div>
                        <TaskItem />
                        <TaskItem />
                        <TaskItem />
                    </div>

                    <NewTaskButton />
                </Col>
            </Row>
        );
    }
}

export default Tasks;