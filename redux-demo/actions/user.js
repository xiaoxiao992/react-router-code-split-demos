import { createAction, createActions } from 'redux-actions';

import api from '../api';

const actions = createActions({
  USER: {
    "GET_LIST": () => api.get('/api/users').then(resp => resp.data),
    "DELETE_USER": [
      id => api.post('/api/users/delete', { params: { id } }).then(resp => resp.data),
      id => id
    ],
    "GET_PROFILE": [() => api.get('/api/users/profile'), id => id]
  }
});

export default actions;