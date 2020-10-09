import React, { Component } from 'react';
import axios from 'axios';

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
import t from 'tcomb-form-native';

const win = Dimensions.get('window');
const ratio = win.width / 375;

const Form = t.form.Form;

const ShopifyInfo = t.struct({
    apikey: t.String,
    password: t.String,
    hostname: t.String,
});

const options = {
    fields: {
        apikey: {
            error: 'Enter API Key of your site'
        },
        password: {
            error: 'Enter Password of your site'
        },
        hostname: {
            error: 'Enter hostname of your site'
        },
    }
}

export default class ShopifyApiModal extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
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
              <Text style={styles.textTitle}>Enter your Shopify Site Infomation</Text>
              <TouchableOpacity style={styles.btnClose} onPress={this.props.pressHide}>
                <Image style={{ width: 20, height: 20, alignSelf: 'flex-end', right: 10, top: 10, }} source={R.images.icon_close_white} />
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              <View style={styles.formContainer}>
                  <Form type={ShopifyInfo} ref={c => this._form = c} options={options} />
              </View>
              <TouchableOpacity style={styles.btnLaunch} onPress={this.handleSubmit}>
                <Text style={{color: 'white'}}>Integrate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop: 25, marginBottom: 30,}} onPress={this.props.pressHide}>
                <Text style={{color: '#979797', textDecorationLine: 'underline',}}>No, I don’t want to integrate</Text>
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
  formContainer: {
    width: '85%',
    justifyContent: "center",
    marginTop: 30,
    padding: 10,
    backgroundColor: '#ffffff',
  },
});

