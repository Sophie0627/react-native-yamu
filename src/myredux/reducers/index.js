import { combineReducers } from 'redux';
import OnboardingReducer from './onboardingreducer';
import ScreensReducer from './screensreducer';
import BrowserReducer from './browserreducer';

const reducers = combineReducers({
    OnboardingReducer,
    ScreensReducer,
    BrowserReducer,
});

export default reducers;
