import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, View, Image, Text, Keyboard, Dimensions } from 'react-native';
import { connect } from 'react-redux';


import GlobalStyles from 'constants/globalstyles';

import HowWorksModal from './howworksmodal';
import R from 'res/R';
import styles from './styles';


// action
import { navigateToScreen } from 'myredux/actions';

// searchbar
import SearchBar from '../components/searchbar';

// Landscape orientation
import Orientation from 'react-native-orientation';

class BrowserHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showHowWorksModal: false,
      screenPressed: false,
      orientation: ''
    };


  }

  getOrientation = () => {
    // if (this.refs.rootView) {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.setState({ orientation: 'portrait' });
    }
    else {
      this.setState({ orientation: 'landscape' });
    }
    // }
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.navigateToScreen('BrowserHome');
    });
    Orientation.unlockAllOrientations();

    this.getOrientation();

    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  // methods
  navigateToSearchResult = (searchText) => {
    global.selectedTabIndex = -1
    global.addTab = false
    var lastExtension= searchText.substring(searchText.length - 4, searchText.length);

    if (!searchText.toLowerCase().includes("http://") && !searchText.toLowerCase().includes("https://")) {
      if (lastExtension === '.com' || lastExtension === '.net' || lastExtension === '.org') {
        var searchURL = 'http://' + searchText;
      } else {
        var searchURL = searchText;
      }
    } else {
      var searchURL = searchText;
    }

    this.props.navigation.navigate('BrowserView', { searchTerm: searchURL });
  }

  navigateToOffersScreen = () => {
    this.props.navigation.navigate('Offers');
  }

  hideModal = () => {
    this.setState({
      showHowWorksModal: false,
    });
  };

  // events
  _onPressScreen = () => {
    //console.log("[BrowserHome] _onPressScreen()");

    Keyboard.dismiss();
  }

  _onPressHowWorks = () => {
    this.setState({
      showHowWorksModal: true,
    })
  }

  _onPressIllustration = () => {
    this.props.navigation.navigate('AdManagerLoginWith');
  };

  render() {
    // (this.state.screenOrientation === 'PORTRAIT' ? alert('This is PORTRAIT') : alert('This is Landscape'))
    // (this.state.orientation == 'portrait') ? alert('This is PORTRAIT') : alert('This is Landscape')
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <TouchableWithoutFeedback onPress={this._onPressScreen}>
          <View style={styles.rootViewWrapper} >
            <View style={{ flex: 57 }}></View>
            <Image style={styles.imageBrowserLogo} source={R.images.img_yamu_logo} />
            <View style={{ flex: 41 }}></View>
            <SearchBar onSearch={this.navigateToSearchResult} onSignal={this.navigateToOffersScreen} searchRegion={this.props.searchRegion} autocomplete={this.props.autocomplete} screenPressed={this.state.screenPressed} />
            <TouchableOpacity style={styles.howWorkViewWrapper} onPress={this._onPressHowWorks}>
              <Text style={{ textDecorationLine: 'underline', fontSize: 12, color: '#979797' }}>
                How does it work?
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 74 }}></View>

            {(this.state.orientation == 'portrait') ? (
              <Image style={styles.imageInfo} source={R.images.img_results} />
            ) : <Image style={styles.imageInfo} />}

            <View style={{ flex: 26 }}></View>

            {(this.state.orientation == 'portrait') ? (
              <TouchableOpacity onPress={this._onPressIllustration}>
                <View style={styles.illustrationViewWrapper}><Text>Illustration</Text></View>
              </TouchableOpacity>
            ) : <View style={{ ...styles.illustrationViewWrapper, display: 'none' }}><Text>Illustration</Text></View>}

          </View>
        </TouchableWithoutFeedback>
        {this.state.showHowWorksModal ? (
          <HowWorksModal
            modalVisible={this.state.showHowWorksModal}
            pressHide={() => this.hideModal()}
          />
        ) : null}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  //console.log("[BrowserHome] mapStateToProps -> currentScreen: " + state.currentScreen);

  return {
    currentScreen: state.ScreensReducer.currentScreen,
    searchRegion: state.BrowserReducer.searchRegion,
    safeSearch: state.BrowserReducer.safeSearch,
    autocomplete: state.BrowserReducer.autocomplete,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigateToScreen: screen => {
      //console.log("[BrowserHome] mapDispatchToProps -> screen: " + screen);
      dispatch(navigateToScreen(screen));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowserHome)
