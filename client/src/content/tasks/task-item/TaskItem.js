import React from 'react';
import {
  Card,
  CardBody,
  Input
} from 'reactstrap';
import './task-item.css';

const TaskItem = ({ task }) => {
  return (
    <Card className="task w-100">
      <CardBody>
        <div className="form-check">
          <Input className="form-check-input" type="checkbox"/>
          <label className="mb-0">
            <span className="d-flex flex-column task-description">
              <span>{ task.title }</span>
              <span className="text-dark"><small>Due date</small></span>
            </span>
          </label>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskItem;