import React, { Component } from 'react';
import { connect } from 'react-redux';

// action
import { navigateToScreen } from 'myredux/actions';

import YamuView from '../yamuview';

class BrowserView extends Component {

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.navigateToScreen('BrowserView');
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const { searchTerm, } = this.props.route.params;
    return (
      <YamuView searchTerm={searchTerm} navigation={this.props.navigation} isIncognito={false}></YamuView>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentScreen: state.ScreensReducer.currentScreen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigateToScreen: screen => {
      dispatch(navigateToScreen(screen));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowserView)
