import { connect } from 'react-redux';
import { createList, fetchLists, deleteList } from '../../redux/actions';
import Lists from './Lists';

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
    createList: title => {
      dispatch(createList(title));
    },
    deleteList: (id) => {
      dispatch(deleteList(id));
    }
  }
};

export const ListsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);