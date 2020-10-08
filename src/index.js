import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from 'myredux/store';
import Screens from 'screens'

// store
const { store, persistor } = configureStore();

console.disableYellowBox = true;

export default class AppContainer extends Component {

    render() {

        // smartlook initialize
        var smartlook = require('smartlook-react-native-wrapper'); 
        smartlook.setupAndStartRecording("f2f0a8e7385803b3ce590e7eea141242c6dc97d8");
        
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Screens />
                </PersistGate>
            </Provider>
        )
    }
}

