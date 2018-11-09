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
    this.filterByDate = this.filterByDate.bind(this);
  }

  setCurrentList(id) {
    this.props.history.replace(`/lists/${id}`);
    this.setState({ currentList: id });
  }

  filterByDate(ps, tasks, period) {

    let start, end, condition;

    switch (period) {
      case 'missed':
        start     = ps.today.start;
        condition = (start, end, dueDate) => dueDate.getTime() < start.getTime();
        break;
      case 'later':
        end       = ps.next_month.end;
        condition = (start, end, dueDate) => dueDate.getTime() > end.getTime();
        break;
      default:
        start     = ps[period].start;
        end       = ps[period].end;
        condition = (start, end, dueDate) =>
          dueDate.getTime() >= start.getTime() && dueDate.getTime() <= end.getTime();
    }

    return tasks.filter(t => {
      const dueDate = new Date(t.dueDate);

      return !isNaN(dueDate.getTime())
        ? condition(start, end, dueDate)
        : false;
    });
  }

  render() {

    const current_list = this.props.lists[this.state.currentList]
      ? this.props.lists[this.state.currentList]
      : [];

    const current_tasks = current_list.hasOwnProperty('tasks')
      ? Object.values(this.props.tasks).filter(task => current_list.tasks.includes(task._id))
      : [];

    periods.create(new Date());
    const ps = periods.computePeriods();
    const p = {
      0: {
        name: 'Missed',
        tasks: []
      },
      1: {
        name: 'Today',
        tasks: []
      },
      2: {
        name: 'Tomorrow',
        tasks: []
      },
      3: {
        name: 'End of Week',
        tasks: []
      },
      4: {
        name: 'Next Week',
        tasks: []
      },
      5: {
        name: 'End of Month',
        tasks: []
      },
      6: {
        name: 'Next Month',
        tasks: []
      },
      7: {
        name: 'Later',
        tasks: []
      },
      8: {
        name: 'Without date',
        tasks: []
      },
    };

    p['0'].tasks = this.filterByDate(ps, current_tasks, 'missed');
    p["1"].tasks = this.filterByDate(ps, current_tasks, 'today');
    p["2"].tasks = this.filterByDate(ps, current_tasks, 'tomorrow');
    p["3"].tasks = this.filterByDate(ps, current_tasks, 'end_of_week');
    p["4"].tasks = this.filterByDate(ps, current_tasks, 'next_week');
    p["5"].tasks = this.filterByDate(ps, current_tasks, 'end_of_month');
    p["6"].tasks = this.filterByDate(ps, current_tasks, 'next_week');
    p["7"].tasks = this.filterByDate(ps, current_tasks, 'later');
    // Maybe I'll fix this. In future. Maybe)
    p["8"].tasks = current_tasks.filter(t => t.dueDate === "null");

    const tasks_to_show = Object.values(p).map((e, i) =>
      e.tasks.length > 0
        ? <React.Fragment key={i}>
            <div key={i} className={`section-name ${e.name === 'Missed' ? 'text-danger' : 'text-primary'} font-weight-bold`}>{e.name}</div>
            { e.tasks.map(task => <TaskItem key={task._id} task={task} missed={e.name === 'Missed'} />) }
          </React.Fragment>
        : null
    );

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

            // todo implement visibility filter
            { tasks_to_show }

          </div>

          <NewTaskButton list={this.state.currentList} />
        </Col>
      </Row>
    );
  }
}

export default ListTasks;