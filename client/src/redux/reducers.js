import { combineReducers } from 'redux';
import {
  ADD_TASK,
  TOGGLE_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  ADD_LIST,
  REMOVE_LIST,
  UPDATE_LIST,
  SET_VISIBILITY_FILTER,
  VisibilityFilter, SET_CURRENT_LIST
} from './actions';

const { SHOW_ALL } = VisibilityFilter;

const store = {
  currentList: 1,
  lists: {
    0: {
      id: 0,
      title: 'List #1',
      tasks: [0, 2, 3, 4],
    },
    1: {
      id: 1,
      title: 'List #2',
      tasks: [1, 5],
    },
  },
  tasks: {
    0: {id: 0, title: 'Task #0', completed: false},
    1: {id: 1, title: 'Task #1', completed: false},
    2: {id: 2, title: 'Task #2', completed: true},
    3: {id: 3, title: 'Task #3', completed: false},
    4: {id: 4, title: 'Task #4', completed: true},
    5: {id: 5, title: 'Task #5', completed: false},
  },
  visibilityFilter: 'SHOW_ALL'
};

function lists(state = {}, action) {
  switch (action.type) {
    case ADD_LIST:
      const { list } = action;
      return Object.assign({}, state, {
        [list._id]: {
          id: list._id,
          title: list.title,
          tasks: list.tasks,
          created_at: list.created_at,
          modified_at: list.modified_at
        }
      });
    case REMOVE_LIST:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    /*
     * for other actions
     */
    default:
      return state;
  }
}

export const todoApp = combineReducers({
  lists
});
