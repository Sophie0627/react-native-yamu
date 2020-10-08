import * as ActionTypes from '../actiontypes';

const initialState = {
  currentScreen: ''
};

export default (state = initialState, action) =>  {

  switch (action.type) {
    case ActionTypes.NAVIGATE_TO_SCREEN:
      return {
        ...state,
        currentScreen: action.payload
      };
    default:
      return state;
  }
}
