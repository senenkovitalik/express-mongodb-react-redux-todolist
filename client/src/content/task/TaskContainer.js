import { connect } from 'react-redux';
import Task from './Task';
import {fetchLists} from "../../redux/actions";

const mapStateToProps = state => {
  return {
    lists: state.lists
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLists: () => {
      dispatch(fetchLists())
    }
  }
};

export const TaskContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
