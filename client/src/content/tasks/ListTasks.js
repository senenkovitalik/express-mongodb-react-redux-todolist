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
            Current list: {this.state.currentList}

            {/*<div className="section-name text-primary font-weight-bold">Tomorrow</div>*/}
            {/*<TaskItem/>*/}
            {/*<TaskItem/>*/}
            {/*<TaskItem/>*/}
            {/*<div className="section-name text-primary font-weight-bold">Next week</div>*/}
            {/*<TaskItem/>*/}
            {/*<TaskItem/>*/}
            {/*<div className="section-name text-primary font-weight-bold">Next month</div>*/}
            {/*<TaskItem/>*/}
            {/*<div className="section-name text-primary font-weight-bold">Later</div>*/}
            {/*<TaskItem/>*/}
            {/*<TaskItem/>*/}
            {/*<TaskItem/>*/}
          </div>

          <NewTaskButton/>
        </Col>
      </Row>
    );
  }

  componentDidMount() {
    /*
    If store doesn't contain lists, fetch them.
     */
    if (!Object.keys(this.props.lists).length) {
      this.props.fetchLists();
    }
  }
}

export default ListTasks;