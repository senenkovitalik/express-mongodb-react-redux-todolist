import { connect } from 'react-redux';
import { updateVisibilityFilter, triggerTask } from '../../redux/actions';
import ListTasks from './ListTasks';

const mapStateToProps = state => {
  return {
    lists: state.lists,
    tasks: state.tasks,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    triggerTask: (list_id, task_id) =>
      dispatch(triggerTask(list_id, task_id)),
    updateVisibilityFilter: (list_id, filter) =>
      dispatch(updateVisibilityFilter(list_id, filter))
  }
};

export const ListTasksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTasks);