import React from 'react';
import {
  Card,
  CardBody,
  Input
} from 'reactstrap';
import './task-item.css';

const TaskItem = ({ task, trigger, list_id, missed, history }) => {
  return (
    <Card className="task w-100"
          onClick={() => history.push(`/lists/${list_id}/tasks/${task._id}`)}>
      <CardBody>
        <div className="form-check">
          <Input className="form-check-input"
                 type="checkbox"
                 checked={task.completed}
                 onChange={() => trigger(list_id, task._id)}/>
          <label className="mb-0">
            <span className="d-flex flex-column task-description">
              <span>{ task.title }</span>
              <span className={missed ? "text-danger" : "text-dark"}>
                <small>{task.dueDate !== 'null' ? new Date(task.dueDate).toLocaleString() : null}</small>
              </span>
            </span>
          </label>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskItem;