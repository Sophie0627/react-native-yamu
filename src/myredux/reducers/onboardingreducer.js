import * as ActionTypes from '../actiontypes';

const initialState = {
  skipOnboarding: false,
};

export default (state = initialState, action) =>  {

  switch (action.type) {
    case ActionTypes.SKIP_ONBOARDING:
      return {
        ...state,
        skipOnboarding: action.payload
      };
    default:
      return state;
  }
}
