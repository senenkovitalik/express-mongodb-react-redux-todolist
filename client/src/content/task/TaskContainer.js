import { connect } from 'react-redux';
import Task from './Task';
import {fetchLists, createTask} from "../../redux/actions";

const mapStateToProps = state => {
  return {
    lists: state.lists,
    tasks: state.tasks
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLists: () => {
      dispatch(fetchLists())
    },
    createTask: (listID, title) => {
      dispatch(createTask(listID, title))
    }
  }
};

export const TaskContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
