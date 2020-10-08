import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';
import { TextInput } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ActionSheet from 'react-native-custom-actionsheet';

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ 'Cancel', 'Library', 'Camera']
const title = 'Which one do you like?'

export default class AdManangerYamuAds extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strBusinessName: '',
      strPhoneNumber: '',
      strCompanyURL: '',
      photo: '',
      strPhotoURL: '',
      loading: null,
      selected: '',
    }

    this.mBusinessName = null;
    this.mPhoneNumber = null;
    this.mCompanyURL = null;
  }

  _onChangeBusinessName = (text) => {
    this.setState ({
      strBusinessName: text
    })
  }

  _onChangePhoneNumber = (text) => {
    this.setState ({
      strPhoneNumber: text
    })
  }

  _onChangeCompanyURL = (text) => {
    this.setState ({
      strCompanyURL: text
    })
  }

  _onPressImageUploadFromLibrary = () => { 
    const options = {
      noData: true
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log("response", response);
      if (response.uri) {
        this.setState({
          photo: response
        })
      }
    });
  }

  _onPressImageUploadFromCamera = () => { 
    const options = {
      noData: true
    };

    ImagePicker.launchCamera(options, response => {
      console.log("response", response);
      if (response.uri) {
        this.setState({
          photo: response
        })
      }
    });
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressNext = async() => {

    if(this.state.photo == '') {
      alert('Please upload your logo!')
      return
    }

    if(this.state.strBusinessName == '') {
      alert('Please input your business name!')
      return
    }

    if(this.state.strPhoneNumber == '') {
      alert('Please input your phone number!')
      return
    }

    if(this.state.strCompanyURL == '') {
      alert('Please input your company url!')
      return
    }

    this.setState({
      loading: 'process',
    });

    await this._uploadImage(this.state.photo.uri);

    firestore().collection('users').doc(global.userID).set({
        logo_url: this.state.strPhotoURL,
        business_name: this.state.strBusinessName,
        phone_number: this.state.strPhoneNumber,
        company_url: this.state.strCompanyURL,
      }, {merge: true})
      .then(() => {
        console.log('User added!');
        this.setState({
          loading: null,
        });
        this.props.navigation.navigate('AdManagerYamuAds2');
      });
      this.setState({
        loading: null,
      });  
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  }

  getActionSheetRef = ref => {
    this.ActionSheet = ref;
  }

  handlePress = (index) => {
    if ( index == 1 ) {
      this._onPressImageUploadFromLibrary();
    } else if ( index == 2 ) {
      this._onPressImageUploadFromCamera();
    }
  }

  _uploadImage = async(uri) => {
    const imageRef = storage().ref("users/" + global.userID + ".png");
    await imageRef.putFile(uri, { contentType: 'users/png'}).catch((error) => { throw error })
    const url = await imageRef.getDownloadURL().catch((error) => { throw error });
    this.setState ({
      strPhotoURL: url
    })
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
    const { photo } = this.state;
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
            <View style={{alignSelf: 'center', marginTop: 30, marginBottom: 30,}}>
              <View style={{flexDirection: 'row',}}>
                <View style={styles.greenDot}></View>
                <View style={styles.dashLine}></View>
                <View style={styles.greenDot}></View>
                <View style={styles.dashLine}></View>
                <View style={styles.emptyDot}></View>
              </View>
            </View>
            {photo
              ?
              <TouchableOpacity style={styles.uploadContainer} onPress={this.showActionSheet}>
                <Image style={styles.uploadContainer} source={{ uri: photo.uri }} />       
              </TouchableOpacity>        
              :
              <TouchableOpacity style={styles.uploadContainer} onPress={this.showActionSheet}>
              <Image style={styles.imgUpload} source={R.images.icon_upload_black} />
                <View style={styles.uploadFooter}>
                  <Text style={{color: 'white',}}>Edit</Text>
                </View>
              </TouchableOpacity>
            }
            <Text style={styles.txtUpload}>Upload your Logo</Text>
            <TextInput ref = {r => (this.mBusinessName = r)} onChangeText={this._onChangeBusinessName} value={this.state.strBusinessName} placeholder='Business Name' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 30,}}></TextInput>
            <TextInput ref = {r => (this.mPhoneNumber = r)} onChangeText={this._onChangePhoneNumber} value={this.state.strPhoneNumber} placeholder='Phone Number' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 10,}}></TextInput>
            <TextInput ref = {r => (this.mCompanyURL = r)} onChangeText={this._onChangeCompanyURL} value={this.state.strCompanyURL} placeholder='Company URL' placeholderTextColor={'#979797'} style={{...styles.textInput, marginTop: 10,}}></TextInput>
            <Text style={styles.txtDescription}>By clicking „Next“, I represent and warrant{'\n'}that I am authorized to submit this request{'\n'}on behalf of Business</Text>
            <TouchableOpacity style={styles.btnNext} onPress={this._onPressNext}>
              <Text style={styles.btnTitle}>Next</Text>
            </TouchableOpacity>
          </View>
          {this.state.loading &&
            <View style={{position :'absolute', alignSelf : 'center', left: '50%', top: '50%', width : 100, height: 100, marginLeft: -50, marginTop: -50,}}>
              <ActivityIndicator size='large' />
            </View>
          }
          <ActionSheet
          ref={this.getActionSheetRef}
          title={title}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
        />
        </View>
      </SafeAreaView>
    );
  }
}