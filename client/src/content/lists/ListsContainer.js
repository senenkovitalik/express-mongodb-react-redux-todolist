import { connect } from 'react-redux';
import { createList, fetchLists } from '../../redux/actions';
import Lists from './Lists';

const mapStateToProps = state => {
  return {
    lists: state.lists
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLists: () => {
      dispatch(fetchLists())
    },
    createList: title => {
      dispatch(createList(title));
    }
  }
};

export const ListsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);