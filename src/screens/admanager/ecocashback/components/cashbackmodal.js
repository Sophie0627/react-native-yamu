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

export default class CashbackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delayArray : [
        {title: '1 day', },
        {title: '2 days', },
        {title: '3 days', },
        {title: '4 days', },
        {title: '5 days', },
      ],
    };
  }

  renderListItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.listItem} onPress={this.props.pressDelayItem.bind(this, index)}>
        <Text style={styles.listText}>{item.title}</Text>
      </TouchableOpacity>
    )
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
              <Text style={styles.textTitle}>Set cashback delay</Text>
              <TouchableOpacity style={styles.btnClose} onPress={this.props.pressHide}>
                <Image style={{ width: 20, height: 20, alignSelf: 'flex-end', right: 10, top: 10, }} source={R.images.icon_close_white} />
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              {this.state.delayArray.map((item, index) => this.renderListItem(item, index))}
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
  listItem: {
    width: 320 * ratio,
    height: 40,
    borderTopColor: '#D8D8D8',
    borderTopWidth: 1,
    justifyContent: 'center',
  },
  listText: {
    marginLeft: 20,
    marginRight: 20,
  },
});

