import React from 'react';
import { periods } from '../../libs/periods';
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

class ListTasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentList: this.props.match.params.id,
      filter: 'SHOW_ACTIVE',
    };

    this.setCurrentList = this.setCurrentList.bind(this);
  }

  setCurrentList(id) {
    this.props.history.replace(`/lists/${id}`);
    this.setState({ currentList: id });
  }

  render() {

    const current_list = this.props.lists[this.state.currentList];
    const current_tasks = current_list.hasOwnProperty('tasks')
      ? Object.values(this.props.tasks).filter(task => current_list.tasks.includes(task._id))
      : [];

    return (
      <Row noGutters className="justify-content-center">
        <Col xs="10">
          <div className="mt-3">
            <ListsDropdown
              current={this.state.currentList}
              lists={this.props.lists}
              setCurrentList={this.setCurrentList}
            />
            <Filter/>
            <GroupActions/>
          </div>

          <hr/>

          <div className="mb-3">

            {
              current_tasks.map(task => <TaskItem key={task._id} task={task} />)
            }

            {/*// todo filter tasks by date*/}
            <div className="section-name text-danger font-weight-bold">Missed</div>
            <div className="section-name text-primary font-weight-bold">Today</div>
            <div className="section-name text-primary font-weight-bold">Tomorrow</div>
            <div className="section-name text-primary font-weight-bold">Next week</div>
            <div className="section-name text-primary font-weight-bold">Next month</div>
            <div className="section-name text-primary font-weight-bold">Later</div>
          </div>

          <NewTaskButton list={this.state.currentList} />
        </Col>
      </Row>
    );
  }
}

export default ListTasks;