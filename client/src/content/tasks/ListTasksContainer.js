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
    },
    // createList: title => {
    //   dispatch(createList(title));
    // },
    // deleteList: (id) => {
    //   dispatch(deleteList(id));
    // }
  }
};

export const ListTasksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTasks);