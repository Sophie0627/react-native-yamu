import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';
import { TextInput } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class AdManangerYamuAds2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strCounty: '',
      strPostalCode: '',
      strLocation: '',
      strCategory: '',
      strCurrency: '',
      loading: null,
    }

    this.mCounty = null;
    this.mPostalCode = null;
    this.mLocation = null;
    this.mCategory = null;
    this.mCurrency = null;
  }

  _onChangeCountry = (text) => {
    this.setState ({
      strCounty: text
    })
  }

  _onChangePostalCode = (text) => {
    this.setState ({
      strPostalCode: text
    })
  }

  _onChangeLocation = (text) => {
    this.setState ({
      strLocation: text
    })
  }

  _onChangeCategory = (text) => {
    this.setState ({
      strCategory: text
    })
  }

  _onChangeCurrency = (text) => {
    this.setState ({
      strCurrency: text
    })
  }
  
  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressStart = () => {
    if(this.state.strCounty == '') {
      alert('Please input your country!')
      return
    }

    if(this.state.strPostalCode == '') {
      alert('Please input your postal code!')
      return
    }

    if(this.state.strLocation == '') {
      alert('Please input your location!')
      return
    }

    if(this.state.strCategory == '') {
      alert('Please input your category!')
      return
    }

    if(this.state.strCurrency == '') {
      alert('Please input your currency!')
      return
    }

    this.setState({
      loading: 'process',
    });

    firestore().collection('users').doc(global.userID).set({
      coutry: this.state.strCounty,
      postal_code: this.state.strPostalCode,
      location: this.state.strLocation,
      category: this.state.strCategory,
      currency: this.state.strCurrency,
    }, {merge: true})
    .then(() => {
      console.log('User added!');
      this.setState({
        loading: null,
      });
      this.props.navigation.navigate('AdManagerOnboarding');
    });
    this.setState({
      loading: null,
    });
  }

  _signOutUser = async () => {
    try {
        await auth().signOut();
        this.props.navigation.navigate('AdManagerLoginWith');
    } catch (e) {
        console.log(e);
    }
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={{...styles.wrapper, position:'relative'}}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>YAMU ADS</Text>
            <TouchableOpacity style={styles.viewLogout} onPress={this._signOutUser}>
              <Text style={{color: 'white',}}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={{alignSelf: 'center', marginTop: 30, }}>
              <View style={{flexDirection: 'row',}}>
                <View style={styles.greenDot}></View>
                <View style={styles.dashLine}></View>
                <View style={styles.greenDot}></View>
                <View style={styles.dashLine}></View>
                <View style={styles.greenDot}></View>
              </View>
            </View>
            <Text style={{...styles.txtTitle, marginTop: 24, fontSize: 18,}}>We need some extra{'\n'}information</Text>
            <Text style={{...styles.txtTitle, marginTop: 20, fontSize: 14,}}>Where do you do your business</Text>
            <TextInput ref = {r => (this.mCounty = r)} onChangeText={this._onChangeCountry} value={this.state.strCounty} placeholder='Country' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 30,}}></TextInput>
            <TextInput ref = {r => (this.mPostalCode = r)} onChangeText={this._onChangePostalCode} value={this.state.strPostalCode} placeholder='Postal Code' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 10,}}></TextInput>
            <TextInput ref = {r => (this.mLocation = r)} onChangeText={this._onChangeLocation} value={this.state.strLocation} placeholder='Location within this area' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 10,}}></TextInput>
            <TextInput ref = {r => (this.mCategory = r)} onChangeText={this._onChangeCategory} value={this.state.strCategory} placeholder='Category' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 10,}}></TextInput>
            <Text style={{...styles.txtTitle, marginTop: 24, fontSize: 14,}}>What currency do you use?</Text>
            <TextInput ref = {r => (this.mCurrency = r)} onChangeText={this._onChangeCurrency} value={this.state.strCurrency} placeholder='GBP' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 20, marginBottom: 22, }}></TextInput>
            <TouchableOpacity style={styles.btnStart} onPress={this._onPressStart}>
              <Text style={styles.btnTitle}>Get started!</Text>
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