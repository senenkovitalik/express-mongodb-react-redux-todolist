import { connect } from 'react-redux';
import Task from './Task';
import { fetchLists, createTask, updateTaskAsync } from "../../redux/actions";

const mapStateToProps = state => {
  return {
    lists: state.lists,
    tasks: state.tasks
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLists: () => dispatch(fetchLists()),
    createTask: (listID, title) => dispatch(createTask(listID, title)),
    updateTask: (list_id, task) => dispatch(updateTaskAsync(list_id, task))
  }
};

export const TaskContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
