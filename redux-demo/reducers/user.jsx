/*
Reducer 函数负责生成新的State
*/

import { handleActions } from 'redux-actions';
import { message } from 'antd';


const initialState = {
  list: [],
  listLoading: false,
  deleteStatus: {},
  profile: {},
  profileLoading: false,
};


export default {
  namespace: "user",
  reducers: handleActions({

    USER: {
      GET_LIST: {
        PENDING: (state, action) => {
          console.log('USER/GET_LIST/PENDING', action)
          return ({
            ...state,
            listLoading: true,
            // appInfo: action.playload
          });
        },
        FULFILLED: (state, action) => {
          console.log('USER/GET_LIST/FULFILLED', action)
          return ({
            ...state,
            listLoading: false,
            list: action.playload
          });
        }
      },
      GET_PROFILE: {
        PENDING: (state, action) => {
          console.log('USER/GET_PROFILE/PENDING', action)
          return ({
            ...state,
            profileLoading: true,
            // profile: action.playload
          });
        },
        FULFILLED: (state, action) => {
          console.log('USER/GET_PROFILE/FULFILLED', action)
          return ({
            ...state,
            profileLoading: false,
            profile: action.playload
          });
        }
      }
    },

  }, initialState)
}