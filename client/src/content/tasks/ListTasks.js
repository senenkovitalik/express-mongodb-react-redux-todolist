import React from 'react';
import {
  Row,
  Col
} from 'reactstrap';
import TaskItem from "./task-item/TaskItem";
import './tasks.css';
import Filter from "../controls/Filter";
import ListsDropdown from "../controls/ListsDropdown";
import NewTaskButton from "../newTaskButton/NewTaskButton";
import { createTasksObject } from '../../libs/helpers'
import { apply_visibility_filter } from '../../libs/helpers';

class ListTasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentList: this.props.match.params.id,
    };

    this.setCurrentList = this.setCurrentList.bind(this);
  }

  setCurrentList(id) {
    this.props.history.replace(`/lists/${id}`);
    this.setState({ currentList: id });
  }

  render() {

    const current_list = this.props.lists[this.state.currentList]
      ? this.props.lists[this.state.currentList]
      : [];

    const current_tasks = current_list.hasOwnProperty('tasks')
      ? Object.values(this.props.tasks).filter(task => current_list.tasks.includes(task._id))
      : [];

    const visibility_filter = current_list.hasOwnProperty('visibility_filter')
      ? current_list.visibility_filter
      : null;

    const tasks_to_show = Object.values(createTasksObject(current_tasks))
      .map((e, i) => {
          if (e.tasks.length > 0) {

            const missed = e.name === 'Missed' ? 'text-danger' : 'text-primary';
            const className = `section-name ${missed} font-weight-bold`;

            const filtered = apply_visibility_filter(e.tasks, visibility_filter);

            return filtered.length > 0
              ? <React.Fragment key={i}>
                <div key={i} className={className}>{e.name}</div>
                {
                  filtered.map(task => <TaskItem key={task._id}
                                                 task={task}
                                                 list_id={current_list._id}
                                                 trigger={this.props.triggerTask}
                                                 missed={e.name === 'Missed'}/>)
                }
              </React.Fragment>
              : null;
          } else {
            return null;
          }
        }
      );

    return (
      <Row noGutters className="justify-content-center">
        <Col xs="10">
          <div className="mt-3">
            <ListsDropdown
              current={this.state.currentList}
              lists={this.props.lists}
              setCurrentList={this.setCurrentList}/>
            <Filter setFilter={this.props.updateVisibilityFilter}
                    list={current_list}/>
          </div>

          <hr/>

          <div className="mb-3">
            {tasks_to_show}
          </div>

          <NewTaskButton list={this.state.currentList}/>
        </Col>
      </Row>
    );
  }
}

export default ListTasks;