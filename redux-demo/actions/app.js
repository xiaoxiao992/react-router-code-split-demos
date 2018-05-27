import { createAction, createActions } from 'redux-actions';

import api from '../api';

const actions = createActions({
  APP: {
    "GET_APP_INFO": () => api.get('/api/appinfo').then(resp => resp),
  }
});

export default actions;