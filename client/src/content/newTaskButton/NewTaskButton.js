import React from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NewTaskButton.css';

const NewTaskButton = ({ list }) => {
  return (
    <Button
      tag={Link}
      to={`/lists/${list}/tasks`}
      id="new-task-button"
      color="primary"
    >+</Button>
  );
};

export default NewTaskButton;