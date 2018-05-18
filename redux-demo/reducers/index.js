/*
Reducer 函数负责生成新的State
*/

import {
  handleActions
} from 'redux-actions';
import {
  message
} from 'antd';
// import {}

// import C from '../Constants'


const initialState = {
  list: [],
  deleteStatus: {

  },
};

export default (state = initialState, action) => {
  console.log("reducers", action.type, action);

  switch (action.type) {


    case 'USER/DELETE_USER/PENDING':
      {
        // message.success('删除成功');
        return {
          ...state,
          deleteStatus: {
            ...state.deleteStatus,
            [action.meta]: true
          },
        }
      }
    case 'USER/DELETE_USER/FULFILLED':
      {
        message.success('删除成功');
        return {
          ...state,
          deleteStatus: {
            ...state.deleteStatus,
            [action.meta]: false
          },
        }
      }
    default:
      break;
  }
  // switch (action.type) {
  //     case C.FLOW.FETCH_CONSULTATION_ONE: {
  //         const consultationStatus = action.status === C.FETCH_STATUS.PENDING;
  //         return { ...state, consultation: action.data, consultationStatus };
  //     }

  //     default:
  //         return state
  // }

  return state
}




console.log('initialState', initialState)

/*
const reducer = handleActions({

    USER: {
      GET_LIST: {
        PENDING: (state, action) => {
          console.log('sdsdsdsds', action)
          return ({
            ...state,
            list: action.playload
          });
        },
        FULFILLED: (state, action) => {
          console.log('sdsdsdsds', action)
          return ({
            ...state,
            list: action.playload
          });
        }
      },
      DELETE_USER: {
        PENDING: (state, action) => {

          // console.log('action', action)

          return {
            ...state,
            deleteStatus: {
              ...state.deleteStatus,
              [action.meta]: true
            },
          }
          // message.loading("正在处理...");
        },
        FULFILLED: (state, action) => {
          message.success('删除成功');
          return {
            ...state,
            deleteStatus: {
              ...state.deleteStatus,
              [action.meta]: false
            },
          }
        }
      }
    }
  },

  initialState);

export default reducer;
*/