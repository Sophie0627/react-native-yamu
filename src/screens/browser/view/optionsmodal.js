import React, { Component } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import R from 'res/R';
import Orientation from 'react-native-orientation';

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default class OptionsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    Orientation.unlockAllOrientations();

    this.getOrientation();

    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }

  _onPressHeaderItem = index => {
    this.props.pressHeaderItem(index)
  }

  _onPressBodyItem = index => {
    this.props.pressBodyItem(index)
  }

  _onPressCancel = () => {
    this.props.pressHide()
  }

  render() {
    return (
      (this.state.orientation == 'portrait') ? (
        <Modal
          animationType="fade"
          transparent={true}
          supportedOrientations={['portrait', 'landscape']}
          visible={this.props.modalVisible}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.contentHeader}>
                  <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 0)}>
                    <Image style={{ width: 24, height: 24, }} source={R.images.icon_favorites_inactive} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 1)}>
                    <Image style={{ width: 24, height: 24, }} source={R.images.icon_history_inactive} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 2)}>
                    <Image style={{ width: 24, height: 24, }} source={R.images.icon_incognito_inactive} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 3)}>
                    <View style={styles.tabsView}>
                      <Text>{this.props.tabCount > 0 ? this.props.tabCount : ''}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 4)}>
                    <Text style={{ fontSize: 36, marginTop: -5 }}>···</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.contentBody}>
                  <TouchableOpacity style={{ ...styles.bodyItem, marginTop: 10, }} onPress={this._onPressBodyItem.bind(this, 0)}>
                    <View style={{ ...styles.tabsView, marginLeft: 20, }}></View>
                    <Text style={styles.bodyText}>Add Tab</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bodyItem} onPress={this._onPressBodyItem.bind(this, 1)}>
                    <Image style={{ width: 24, height: 24, marginLeft: 20, }} source={R.images.icon_favorites_inactive} />
                    <Text style={styles.bodyText}>Add Favorite</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ ...styles.bodyItem, marginBottom: 10, }} onPress={this._onPressBodyItem.bind(this, 2)}>
                    <Image style={{ width: 17, height: 24, marginLeft: 23, }} source={R.images.icon_share} />
                    <Text style={styles.bodyText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.btnCancel} onPress={this._onPressCancel}>
                <Text style={styles.textCancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>)
        :
        <Modal
          animationType="fade"
          transparent={true}
          supportedOrientations={['portrait', 'landscape']}
          visible={this.props.modalVisible}>
          <View style={styles.modalWrapperLandscape}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.contentHeader}>
                  <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 0)}>
                    <Image style={{ width: 24, height: 24, }} source={R.images.icon_favorites_inactive} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 1)}>
                    <Image style={{ width: 24, height: 24, }} source={R.images.icon_history_inactive} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 2)}>
                    <Image style={{ width: 24, height: 24, }} source={R.images.icon_incognito_inactive} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 3)}>
                    <View style={styles.tabsView}>
                      <Text>{this.props.tabCount > 0 ? this.props.tabCount : ''}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 4)}>
                    <Text style={{ fontSize: 36, marginTop: -5 }}>···</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.contentBody}>
                  <TouchableOpacity style={{ ...styles.bodyItem, marginTop: 10, }} onPress={this._onPressBodyItem.bind(this, 0)}>
                    <View style={{ ...styles.tabsView, marginLeft: 20, }}></View>
                    <Text style={styles.bodyText}>Add Tab</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bodyItem} onPress={this._onPressBodyItem.bind(this, 1)}>
                    <Image style={{ width: 24, height: 24, marginLeft: 20, }} source={R.images.icon_favorites_inactive} />
                    <Text style={styles.bodyText}>Add Favorite</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ ...styles.bodyItem, marginBottom: 10, }} onPress={this._onPressBodyItem.bind(this, 2)}>
                    <Image style={{ width: 17, height: 24, marginLeft: 23, }} source={R.images.icon_share} />
                    <Text style={styles.bodyText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.btnCancel} onPress={this._onPressCancel}>
                <Text style={styles.textCancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalWrapper: {
    width: win.width,
    height: win.height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalWrapperLandscape: {
    width: win.height,
    height: win.width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: 320 * ratio,
    borderRadius: 10,
    marginBottom: 30,
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  btnCancel: {
    width: '100%',
    height: 50,
    backgroundColor: '#72C500',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCancel: {
    color: 'white',
    fontSize: 14,
  },
  contentHeader: {
    height: 60,
    flexDirection: 'row',
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsView: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBody: {
    width: '100%',
    flexDirection: 'column',
    borderTopColor: '#D8D8D8',
    borderTopWidth: 1,
  },
  bodyItem: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bodyText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 24,
  },
});

