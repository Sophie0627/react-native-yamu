import React, { Component } from 'react';
import {
  Platform,
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import R from 'res/R'

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default class ApiModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.textTitle}>Log in to your API</Text>
              <TouchableOpacity style={styles.btnClose} onPress={this.props.pressHide}>
                <Image style={{ width: 20, height: 20, alignSelf: 'flex-end', right: 10, top: 10, }} source={R.images.icon_close_white} />
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              <TouchableOpacity style={styles.btnGoogle} onPress={this.props.pressGoogle}>
                <Image style={styles.imgGoogle} source={R.images.icon_google} />
                <Text style={styles.txtGoogle}>Sign in with Google</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: 'center',
  },
  modalContainer: {
    width: 320 * ratio,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    width: 320 * ratio,
    height: 60,
    backgroundColor: '#72C500',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    width: 320 * ratio,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnClose: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 40,
  },
  btnGoogle: {
    width: 270,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  imgGoogle: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  txtGoogle: {
    color: '#979797',
    fontSize: 16,
  },
});

