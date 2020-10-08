import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ActivityIndicator} from 'react-native';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class AdManangerSignup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strFirstName: '',
      strLastName: '',
      strEmail: '',
      strPassword: '',
      strUserId: '',
      loading: null,
    }

    this.mFirstName = null;
    this.mLastName = null;
    this.mEmail = null;
    this.mPassword = null;

  }
  
  _onChangeFirstName = (text) => {
    this.setState ({
      strFirstName: text
    })
  }

  _onChangeLasttName = (text) => {
    this.setState ({
      strLastName: text
    })
  }

  _onChangeEmail = (text) => {
    this.setState ({
      strEmail: text
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

  _onPressSignup = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(this.state.strFirstName == '') {
      alert('Please input your First Name!')
      return
    }

    if(this.state.strLastName == '') {
      alert('Please input your Last Name!')
      return
    }

    if(this.state.strFirstName == '' || reg.test(this.state.strEmail) === false) {
      alert('Please input your Valid Email!')
      return
    }

    if(this.state.strPassword == '') {
      alert('Please input your Password!')
      return
    }

    if(this.state.strPassword.length < 6) {
      alert('Your password should be longer than 6 characters.')
      return
    }

    this.setState({
      loading: 'process',
    });

    auth()
    .createUserWithEmailAndPassword(this.state.strEmail, this.state.strPassword)
    .then(data => {
      this.setState({strUserId: data.user.uid});
      console.log('User account created & signed in!');
      firestore()
        .collection('users').doc(this.state.strUserId).set({
          // user_id: this.state.strUserId,
          first_name: this.state.strFirstName,
          last_name: this.state.strLastName,
          email: this.state.strEmail,
        })
        .then(() => {
          console.log('User added!');
          this.setState({
            loading: null,
          });
        });
        global.userID = this.state.strUserId;

      this.props.navigation.navigate('AdManagerYamuAds');
    })
    .catch(error => {
      this.setState({
        loading: null,
      });
      if (error.code === 'auth/email-already-in-use') {
        alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
      } else {
        alert(error);
      }
    });
  }

  _onPressPolicy = () => {
  }

  _onPressTerms = () => {
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={{...styles.wrapper, position:'relative'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={this._onPressBack}>
              <Image style={styles.imgBack} source={R.images.icon_leftarrow_black} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>SIGN UP</Text>
          </View>
          <View>
            <View style={{alignSelf: 'center', marginTop: 30, marginBottom: 30,}}>
              <View style={{flexDirection: 'row',}}>
                <View style={styles.greenDot}></View>
                <View style={styles.dashLine}></View>
                <View style={styles.emptyDot}></View>
                <View style={styles.dashLine}></View>
                <View style={styles.emptyDot}></View>
              </View>
            </View>
            <TextInput ref = {r => (this.mFirstName = r)} onChangeText={this._onChangeFirstName} value={this.state.strFirstName} placeholder='First Name' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 30,}}></TextInput>
            <TextInput ref = {r => (this.mLastName = r)} onChangeText={this._onChangeLasttName} value={this.state.strLastName} placeholder='Last Name' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 10,}}></TextInput>
            <TextInput ref = {r => (this.mEmail = r)} onChangeText={this._onChangeEmail} value={this.state.strEmail} placeholder='Email' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 10,}} autoCapitalize="none"></TextInput>
            <TextInput ref = {r => (this.mPassword = r)} onChangeText={this._onChangePassword} value={this.state.strPassword} secureTextEntry={true} placeholder='Password' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 10,}}></TextInput>
            <TouchableOpacity style={styles.btnSignup} onPress={this._onPressSignup}>
              <Text style={styles.btnTitle}>Sign Up & Accept</Text>
            </TouchableOpacity>
            <Text style={styles.txtDescription}>By tapping “Sign Up & Accept” you are agreeing to</Text>
            <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 3,}}>
              <Text style={styles.txtPolices}>our </Text>
              <TouchableOpacity onPress={this._onPressPolicy}>
                <Text style={{...styles.txtPolices, textDecorationLine: 'underline',}}>Privacy Policy</Text>
              </TouchableOpacity>
              <Text style={styles.txtPolices}> and </Text>
              <TouchableOpacity onPress={this._onPressTerms}>
                <Text style={{...styles.txtPolices, textDecorationLine: 'underline',}}>Terms and Conditions</Text>
              </TouchableOpacity>
            </View>
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