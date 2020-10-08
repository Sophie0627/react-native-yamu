import React, { Component } from 'react';
import {
  SafeAreaView,
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';

import R from 'res/R';
import GlobalStyles from 'constants/globalstyles';
import Orientation from 'react-native-orientation';

const win = Dimensions.get('window');

export default class AddFavoriteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      strTitle: this.props.title,
      strUrl: this.props.url,
      screenTitle: this.props.screenTitle,
      orientation: ''
    }

    this.mTitleInput = null;
    this.mUrlInput = null;
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
    Orientation.unlockAllOrientations();

    this.getOrientation();

    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout
    }
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });


    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  _onChangeTitleText = (text) => {
    this.setState({
      strTitle: text,
    })
  }

  _onChangeUrlText = (text) => {
    this.setState({
      strUrl: text,
    })
  }

  _onPressSave = () => {
    if (this.state.strTitle.trim() == '') {
      alert('Please input valid title!')
      return
    }
    if (this.state.strUrl.trim() == '') {
      alert('Please input valid url!')
      return
    }

    this.props.pressAddFavoriteItem(this.state.strTitle, this.state.strUrl)
  }

  render() {
    return (
      (this.state.orientation == 'portrait') ? (
        <Modal
          animationType="none"
          transparent={true}
          supportedOrientations={['portrait', 'landscape']}
          visible={this.props.modalVisible}>
          <View style={styles.modalWrapper}>
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
              <View style={{ flex: 1, backgroundColor: 'lightgrey', }}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.btnCancel} onPress={this.props.pressHide}>
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={styles.titleText}>{this.state.screenTitle}</Text>
                  <TouchableOpacity style={styles.btnSave} onPress={this._onPressSave}>
                    <Text style={styles.btnText}>Save</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                  <Image style={{ width: 24, height: 24, marginLeft: 20, marginRight: 20, }} source={R.images.icon_favorites_inactive} />
                  <View style={styles.inputContainer}>
                    <TextInput
                      ref={r => (this.mTitleInput = r)}
                      style={{ flex: 1, }}
                      multiline={false}
                      keyboardType='default'
                      returnKeyType='done'
                      onChangeText={this._onChangeTitleText}
                      value={this.state.strTitle}
                    />
                    <View style={{ height: 1, backgroundColor: 'lightgrey' }}></View>
                    <TextInput
                      ref={r => (this.mSearchTextView = r)}
                      style={{ flex: 1, }}
                      multiline={false}
                      keyboardType='web-search'
                      returnKeyType='done'
                      onChangeText={this._onChangeUrlText}
                      value={this.state.strUrl}
                    />
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </Modal>)
        :
        <Modal
          animationType="none"
          transparent={true}
          supportedOrientations={['portrait', 'landscape']}
          visible={this.props.modalVisible}>
          <View style={styles.modalWrapperLandscape}>
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
              <View style={{ flex: 1, backgroundColor: 'lightgrey', }}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.btnCancel} onPress={this.props.pressHide}>
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={styles.titleText}>{this.state.screenTitle}</Text>
                  <TouchableOpacity style={styles.btnSave} onPress={this._onPressSave}>
                    <Text style={styles.btnText}>Save</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                  <Image style={{ width: 24, height: 24, marginLeft: 20, marginRight: 20, }} source={R.images.icon_favorites_inactive} />
                  <View style={styles.inputContainer}>
                    <TextInput
                      ref={r => (this.mTitleInput = r)}
                      style={{ flex: 1, }}
                      multiline={false}
                      keyboardType='default'
                      returnKeyType='done'
                      onChangeText={this._onChangeTitleText}
                      value={this.state.strTitle}
                    />
                    <View style={{ height: 1, backgroundColor: 'lightgrey' }}></View>
                    <TextInput
                      ref={r => (this.mSearchTextView = r)}
                      style={{ flex: 1, }}
                      multiline={false}
                      keyboardType='web-search'
                      returnKeyType='done'
                      onChangeText={this._onChangeUrlText}
                      value={this.state.strUrl}
                    />
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalWrapper: {
    width: win.width,
    height: win.height,
    backgroundColor: 'white',
  },
  modalWrapperLandscape: {
    width: win.height,
    height: win.width,
    backgroundColor: 'white',
  },
  modalHeader: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  btnCancel: {
    position: 'absolute',
    left: 0,
    marginLeft: 12,
  },
  btnSave: {
    position: 'absolute',
    right: 0,
    marginRight: 12,
  },
  btnText: {
    color: 'blue'
  },
  titleText: {
    position: 'absolute',
    left: win.width / 2 - 100,
    width: 200,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputWrapper: {
    height: 60,
    marginTop: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    height: 60,
  },
});

