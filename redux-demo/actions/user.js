import { createAction, createActions } from 'redux-actions';

import api from '../api';

const actions = createActions({
  USER: {
    "GET_LIST": () => api.get('/api/users').then(resp => resp.data),
    "DELETE_USER": [
      () => api.post('/api/users/delete'),
      id => id
    ]

  }
});

export default actions;