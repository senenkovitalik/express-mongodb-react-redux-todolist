import {createFormData} from "../utils";

export const ADD_TASK = 'ADD_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export const SET_CURRENT_LIST = 'SET_CURRENT_LIST';
export const GET_LISTS = 'GET_LISTS';
export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilter = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

// Task

export function createTask(listID, task) {
  console.log("Task", task);
  return dispatch =>
    fetch(`/api/lists/${listID}/tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: createFormData(task)
    })
      .then(res => res.ok && res.status === 201
        ? res.json()
        : null
      )
      .then(json => {
        console.log(json);
        dispatch(addTask(json))
      })
      .catch(err => console.log('An error occured', err));
}

export function addTask(task) {
  return {
    type: ADD_TASK,
    task
  }
}

//  List

export function setCurrentList(id) {
  return {
    type: SET_CURRENT_LIST,
    id
  }
}

export function fetchLists() {
  return dispatch =>
    fetch(`/api/lists`, { method: 'GET' })
      .then(res => res.ok && res.status === 200
          ? res.json()
          : null
      )
      .then(json => dispatch(getLists(json)))
      .catch(err => console.log('An error occurred', err))
}

export function getLists(lists) {
  return {
    type: GET_LISTS,
    lists
  }
}

export function createList(text) {
  return dispatch =>
    fetch(`/api/lists/${encodeURIComponent(text)}`, { method: 'POST' })
      .then(res => {
        if (res.ok && res.status === 201) {
          return res.json();
        }
      })
      .then(json => {
        dispatch(addList(json.list))
      })
      .catch(err => console.log('An error occurred', err))
}

export function addList(list) {
  return {
    type: ADD_LIST,
    list
  }
}

export function deleteList(id) {
  return dispatch =>
    fetch(`/api/lists/${encodeURIComponent(id)}`, { method: 'DELETE' })
      .then(res => res.ok && res.status === 204
        ? dispatch(removeList(id))
        : null
      )
      .catch(err => console.log('An error occurred,', err))
}

export function removeList(id) {
  return {
    type: REMOVE_LIST,
    id
  }
}

// Visibility Filter

export function updateVisibilityFilter(list_id, filter) {
  return dispatch =>
    fetch(`/api/lists/${list_id}/visibility_filter/${filter}`, { method: 'PATCH' })
      .then(res => res.ok && res.status === 204
        ? dispatch(setVisibilityFilter(list_id, filter))
        : null
      )
      .catch(err => console.error('An error occurred', err));
}

export function setVisibilityFilter(list_id, filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    list_id,
    filter
  }
}

