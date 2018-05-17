/*
Reducer 函数负责生成新的State
*/

// import C from '../Constants'

const initialState = {
  // consultation: {},
  // consultationStatus: false,

}

export default (state = initialState, action) => {
  console.log("reducers", action.type, action);

  switch (action.type) {
    case 'user/list':
      return {
        type: 'user/list1',
        payload: () => new Promise((resolve, reject) => {

          setTimeout(resolve, 900, [
            { name: 'admin', age: 18 },
            { name: 'xiaohua', age: 20 }
          ]);

        })
      }


      break;

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