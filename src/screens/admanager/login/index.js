import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ActivityIndicator} from 'react-native';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class AdManangerLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strUserEmail: '',
      strPassword: '',
      loading: null,
    }

    this.mUserEmail = null;
    this.mPassword = null;
  }

  _onChangeUserName = (text) => {
    this.setState ({
      strUserEmail: text
    })
  }

  _onChangePassword = (text) => {
    this.setState ({
      strPassword: text
    })
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressLogin = async() => {
    if(this.state.strUserEmail == '') {
      alert('Please input your email!')
      return
    }

    if(this.state.strPassword == '') {
      alert('Please input your password!')
      return
    }

    this.setState({
      loading: 'process',
    });

    await auth().signInWithEmailAndPassword(this.state.strUserEmail, this.state.strPassword)
    .then(data => {
      this.setState({
        loading: null,
      });
      
      firestore().collection('users').doc(data.user.uid).get().then(r => {
        if(r.data().coutry) {
          this.props.navigation.navigate('AdManagerOnboarding');
        } else {
          alert('Login failed. It seems that you did not complete your personal info.');
        }
      }).catch(error => {
        alert(error);
      });
    })
    .catch(error => {
      this.setState({
        loading: null,
      });
      alert("Incorrect Email or Password.");
    });
  }

  _onPressForgot = () => {
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={{...styles.wrapper, position:'relative'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={this._onPressBack}>
              <Image style={styles.imgBack} source={R.images.icon_leftarrow_black} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>LOG IN</Text>
          </View>
          <View>
            <TextInput ref = {r => (this.mUserEmail = r)} onChangeText={this._onChangeUserName} value={this.state.strUserEmail} placeholder='Email' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 64,}} autoCapitalize="none"></TextInput>
            <TextInput ref = {r => (this.mCounty = r)} onChangeText={this._onChangePassword} value={this.state.strPassword} secureTextEntry={true} placeholder='Password' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 10,}}></TextInput>
            <TouchableOpacity style={styles.btnLogin} onPress={this._onPressLogin}>
              <Text style={styles.btnTitle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onPressForgot}>
              <Text style={styles.txtForgot}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          {this.state.loading &&
            <View style={{position :'absolute', alignSelf : 'center', left: '50%', top: '50%', width : 100, height: 100, marginLeft: -50, marginTop: -50,}}>
              <ActivityIndicator size='large' />
            </View>
          }
        </View>
      </SafeAreaView>
    );
  }
}