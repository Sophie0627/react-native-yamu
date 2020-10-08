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
  FlatList,
} from 'react-native';

import R from 'res/R'
import GlobalStyles from 'constants/globalstyles';
import { COUNTRY_LIST, SAFE_MODE } from 'constants/globalconstants';
import Orientation from 'react-native-orientation';

const win = Dimensions.get('window');
const ratio = win.width / 375;


export default class SelectionModal extends Component {
  constructor(props) {
    super(props);

    let code = ''
    if (this.props.data === undefined || this.props.data === '') {
      code = this.props.type ? 'US' : 'Moderate';
    } else {
      code = this.props.data
    }
    this.state = {
      selectedCode: code,
      orientation: ''
    }
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

  _onPressItem = (index) => {
    this.setState({
      selectedCode: this.props.type ? COUNTRY_LIST[index].code : SAFE_MODE[index].code,
    })
  }

  renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.item} onPress={this._onPressItem.bind(this, index)}>
      <Text numberOfLines={1} style={styles.itemText}>{item.name}</Text>
      {this.state.selectedCode.toLowerCase() === item.code.toLowerCase() ? (
        <Image style={{ width: 24, height: 24, marginRight: 16 }} source={R.images.icon_favorites_inactive} />
      ) : null}
    </TouchableOpacity>
  )

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
              <View style={{ flex: 1, backgroundColor: 'white', }}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.btnCancel} onPress={this.props.pressHide}>
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={styles.titleText}>{this.props.type ? 'Search region' : 'Safe search'}</Text>
                  <TouchableOpacity style={styles.btnSave} onPress={this.props.pressSave.bind(this, this.state.selectedCode)}>
                    <Text style={styles.btnText}>Save</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  style={{ flex: 1, }}
                  data={this.props.type ? COUNTRY_LIST : SAFE_MODE}
                  renderItem={this.renderItem}
                  ItemSeparatorComponent={() => (
                    <View style={styles.itemSeperator} />
                  )
                  }
                />
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
              <View style={{ flex: 1, backgroundColor: 'white', }}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.btnCancel} onPress={this.props.pressHide}>
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={styles.titleText}>{this.props.type ? 'Search region' : 'Safe search'}</Text>
                  <TouchableOpacity style={styles.btnSave} onPress={this.props.pressSave.bind(this, this.state.selectedCode)}>
                    <Text style={styles.btnText}>Save</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  style={{ flex: 1, }}
                  data={this.props.type ? COUNTRY_LIST : SAFE_MODE}
                  renderItem={this.renderItem}
                  ItemSeparatorComponent={() => (
                    <View style={styles.itemSeperator} />
                  )
                  }
                />
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
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
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
    color: 'black'
  },
  titleText: {
    position: 'absolute',
    left: win.width / 2 - 100,
    width: 200,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    marginLeft: 16,
  },
  itemSeperator: {
    height: 1,
    backgroundColor: '#F1F1F1',
    marginLeft: 16,
  },
});

