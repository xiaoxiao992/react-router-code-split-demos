/*
Reducer 函数负责生成新的State
*/

import { handleActions } from 'redux-actions';
import { message } from 'antd';


const initialState = {
  appInfo: {},
};

// export default {
//   namespace: 'app',
//   reducers: (state = initialState, action) => {
//     switch (action.type) {

//       case 'USER/DELETE_USER/PENDING': {

//         // message.success('删除成功');
//         return {
//           ...state,
//           deleteStatus: {
//             ...state.deleteStatus,
//             [action.meta]: true
//           },
//         }
//       }
//       case 'USER/DELETE_USER/FULFILLED': {
//         message.success('删除成功');
//         console.log('USER/DELETE_USER/PENDING', action, state)
//         return {
//           ...state,
//           deleteStatus: {
//             ...state.deleteStatus,
//             [action.meta]: false
//           },
//         }
//       }
//       default:
//         break;
//     }
//     // switch (action.type) {
//     //     case C.FLOW.FETCH_CONSULTATION_ONE: {
//     //         const consultationStatus = action.status === C.FETCH_STATUS.PENDING;
//     //         return { ...state, consultation: action.data, consultationStatus };
//     //     }

//     //     default:
//     //         return state
//     // }

//     return state
//   }


// }

// export default (state = initialState, action) => {
//   // console.log("reducers", action.type, action);

//   switch (action.type) {

//     case 'USER/DELETE_USER/PENDING': {
//       // message.success('删除成功');
//       return {
//         ...state,
//         deleteStatus: {
//           ...state.deleteStatus,
//           [action.meta]: true
//         },
//       }
//     }
//     case 'USER/DELETE_USER/FULFILLED': {
//       message.success('删除成功');
//       return {
//         ...state,
//         deleteStatus: {
//           ...state.deleteStatus,
//           [action.meta]: false
//         },
//       }
//     }
//     default:
//       break;
//   }
//   // switch (action.type) {
//   //     case C.FLOW.FETCH_CONSULTATION_ONE: {
//   //         const consultationStatus = action.status === C.FETCH_STATUS.PENDING;
//   //         return { ...state, consultation: action.data, consultationStatus };
//   //     }

//   //     default:
//   //         return state
//   // }

//   return state
// }




// console.log('initialState', initialState)


const reducer = {
  namespace: "app",
  reducers: handleActions({

    APP: {
      GET_INFO: {
        PENDING: (state, action) => {
          console.log('APP/GET_INFO/PENDING', action)
          return ({
            ...state,
            // appInfo: action.playload.data
          });
        },
        FULFILLED: (state, action) => {
          console.log('APP/GET_INFO/FULFILLED', action)
          return ({
            ...state,
            appInfo: action.playload.data
          });
        }
      },

    }
  }, initialState)
}

export default reducer;
