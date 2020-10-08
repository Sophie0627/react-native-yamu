import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';

export default class AdManangerLoginWith extends Component {

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressLogin = () => {
    this.props.navigation.navigate('AdManagerLogin');
  }

  _onPressRegister = () => {
    this.props.navigation.navigate('AdManagerSignup');
  }

  _onPressFacebook = () => {
  }

  _onPressTwitter = () => {
  }

  _onPressApple = () => {
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={this._onPressBack}>
            <Image style={styles.imgBack} source={R.images.icon_leftarrow_black} />
          </TouchableOpacity>
          <View>
            <Image style={styles.imgYamuLogo} source={R.images.img_yamu_logo} />
            <Text style={styles.txtTitle}>Join the Yamu revolution!</Text>
            <TouchableOpacity style={{...styles.btnSocialWrapper, marginTop: 50,}} onPress={this._onPressFacebook}>
              <Image style={{width: 20, height: 20, marginLeft: 15,}} source={R.images.icon_add_black} />
              <Text style={{flex: 1, textAlign: 'center', }}>Log in with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSocialWrapper} onPress={this._onPressTwitter}>
              <Image style={{width: 20, height: 20, marginLeft: 15,}} source={R.images.icon_add_black} />
              <Text style={{flex: 1, textAlign: 'center', }}>Log in with Twitter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSocialWrapper} onPress={this._onPressApple}>
              <Image style={{width: 20, height: 20, marginLeft: 15,}} source={R.images.icon_add_black} />
              <Text style={{flex: 1, textAlign: 'center', }}>Log in with Apple</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 18, alignSelf: 'center', marginTop: 20, }}>or</Text>
            <TouchableOpacity style={styles.btnRegister} onPress={this._onPressRegister}>
              <Text style={styles.btnTitle}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLogin} onPress={this._onPressLogin}>
              <Text style={styles.btnTitle}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}