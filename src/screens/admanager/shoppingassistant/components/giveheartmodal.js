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

export default class GiveHeartModal extends Component {
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
              <Text style={styles.textTitle}>Give a little back!</Text>
              <TouchableOpacity style={styles.btnClose} onPress={this.props.pressHide}>
                <Image style={{ width: 20, height: 20, alignSelf: 'flex-end', right: 10, top: 10, }} source={R.images.icon_close_white} />
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>Upgrade to a full heart reward{'\n'}to help your customers{'\n'}with their eco projects!</Text>
              <View style={styles.viewHeart}>
                <Image style={{width: 43, height: 36,}} source={R.images.icon_heart_half} />
                <Image style={{width: 42, height: 16, marginLeft: 20, marginRight: 20,}} source={R.images.icon_rightarrowmark_black} />
                <Image style={{width: 43, height: 36,}} source={R.images.icon_heart_full} />
              </View>
              <TouchableOpacity style={styles.btnLaunch} onPress={this.props.pressGive}>
                <Text style={{color: 'white'}}>Let's do it</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop: 25, marginBottom: 30,}} onPress={this.props.pressHide}>
                <Text style={{color: '#979797', textDecorationLine: 'underline',}}>No, I don’t want to upgrade</Text>
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
  contentTitle: {
    textAlign: 'center',
    marginTop: 40,
  },
  viewHeart: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  btnLaunch: {
    width: 114,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#FF4600',
    marginTop: 44,
  },
});

