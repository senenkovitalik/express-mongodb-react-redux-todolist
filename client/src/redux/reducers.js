import { combineReducers } from 'redux';
import {
  ADD_TASK,
  TOGGLE_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  GET_LISTS,
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
    case GET_LISTS: {
      const {lists} = action;

      let newState = {};

      for (let id in lists) {
        if (lists.hasOwnProperty(id)) {
          let list = lists[id];

          const { _id, tasks, ...rest } = list;
          newState = Object.assign({}, newState, {
            [_id]: {
              _id,
              tasks: tasks.map(t => t._id),
              ...rest
            }
          });
        }
      }
      return newState;
    }
    case ADD_LIST: {
      const {list} = action;
      return Object.assign({}, state, {
        [list._id]: {
          _id: list._id,
          title: list.title,
          tasks: list.tasks, // there will be empty array, do nothing
          created_at: list.created_at,
          modified_at: list.modified_at
        }
      });
    }
    case REMOVE_LIST: {
      action.tasks = state[action.id].tasks;
      const newState = Object.assign({}, state);
      delete newState[action.id];

      return newState;
    }
    case ADD_TASK:
      const list = state[action.task.list_id];
      const updatedList = Object.assign({}, list, {
        tasks: [action.task._id, ...list.tasks]
      });

      return Object.assign({}, state, { [list._id]: updatedList });
    /*
     * for other actions
     */
    default:
      return state;
  }
}

function tasks(state = {}, action) {
  switch (action.type) {
    case GET_LISTS: {
      const newState = {};

      action.lists.forEach(l => {
        l.tasks.forEach(t => Object.assign(newState, {
          [t._id]: t
        }));
      });

      return newState;
    }
    case ADD_TASK: {
      const { list_id, ...task } = action.task;
      return Object.assign({}, state, {
        [action.task._id]: task
      });
    }
    case REMOVE_LIST: {
      /*
      We set this value 'action.tasks' at REMOVE_LIST lists reducer
       */
      const tasksToDelete = action.tasks;
      const nextState = Object.assign({}, state);

      tasksToDelete.map(task_id => delete nextState[task_id]);

      return nextState;
    }
    default:
      return state;
  }
}

export const todoApp = combineReducers({
  lists,
  tasks
});
