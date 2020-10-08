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

import R from 'res/R';

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default class SignalDeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    }
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
              <Text style={styles.textTitle}>Delete this signal?</Text>
              <TouchableOpacity style={styles.btnClose} onPress={this.props.pressHide}>
                <Image style={{ width: 20, height: 20, alignSelf: 'flex-end', right: 10, top: 10, }} source={R.images.icon_close_white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.textWhy}>Please tell us why...</Text>
            <TouchableOpacity style={styles.btnReason} onPress={this.props.pressNotInterest}>
              <Text style={styles.textReason}>Not interested anymore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnReason} onPress={this.props.pressAlreadyBought}>
              <Text style={styles.textReason}>Already bought it</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnReason} onPress={this.props.pressOtherReason}>
              <Text style={styles.textReason}>Other reason</Text>
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
    justifyContent: 'center',
  },
  modalContainer: {
    width: 320 * ratio,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    paddingBottom: 30,
  },
  modalHeader: {
    width: '100%',
    height: 60,
    backgroundColor: '#72C500',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  textWhy: {
    marginTop: 24,
    marginBottom: 32,
    fontSize: 14,
  },
  btnReason: {
    backgroundColor: '#72C500',
    width: 180,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  textReason: {
    paddingTop: 12,
    paddingBottom: 12,
    color: 'white',
  },
});
