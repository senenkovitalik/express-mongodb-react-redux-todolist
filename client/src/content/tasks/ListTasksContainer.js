import { connect } from 'react-redux';
import { fetchLists } from '../../redux/actions';
import ListTasks from './ListTasks';

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
    }
  }
};

export const ListTasksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTasks);