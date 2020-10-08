import { createStore, applyMiddleware } from 'redux';

// initial state
const initialState = {
    currentScreen: ''
};

// actions
export const NAVIGATE_TO_SCREEN = 'NAVIGATE_TO_SCREEN';
export function navigateToScreen(screen) {
    //console.log("[store] navigateToScreen -> screen: " + screen);
    return { type: NAVIGATE_TO_SCREEN, screen } ;
}

// reducer
function screensReducer(state = initialState, action) {
    if(action.type === NAVIGATE_TO_SCREEN) {
        state.currentScreen = action.screen;
        //console.log("[store] screensReducer -> state: " + state.currentScreen);
    }

    return state;
}

// store
export const screensStore = createStore(screensReducer);