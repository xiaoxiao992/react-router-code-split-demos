import { createAction, createActions } from 'redux-actions';

import api from '../api';

const actions = createActions({
  POST: {
    "GET_LIST": () => api.get('/api/users').then(resp => resp.data),
  }
});

export default actions;