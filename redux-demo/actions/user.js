import { createAction, createActions } from 'redux-actions';

import api from '../api';

const actions = createActions({
  USER: {
    "GET_LIST": () => api.get('/api/users'),
    "DELETE_USER": [() => api.post('/api/users/delete'), id => id],
    "GET_PROFILE": [() => api.get('/api/users/profile'), id => id]
  }
});

export default actions;