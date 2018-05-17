/*
Reducer 函数负责生成新的State
*/

// import C from '../Constants'

const initialState = {
  // consultation: {},
  // consultationStatus: false,

}

export default (state = initialState, action) => {
  // console.log("Test", action.type, action);

  switch (action.type) {
    case 'FETCH_THING':
      console.log('FETCH_THING', action)
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