import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';

export default class AdManangerSurveyHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyArray : [
        {title: 'Adidas', type: 0, isActive: true, },
        {title: 'Sneakers', type: 1, isActive: false, },
      ],
      heartArray : [],
      heartTextValue: '10 Hearts',
      urlValue: '',
    };
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressHot = () => {
    this.props.navigation.navigate('AdManagerSurveyHot');
  }

  _onPressQuestionaire = () => {
    this.props.navigation.navigate('AdManagerSurveyQuestionaire');
  }

  _onPressSurveyItemEdit = (index) => {
  }

  _onPressSurveyItemActive = (index) => {
    let tempArray = [...this.state.surveyArray]
    tempArray[index].isActive = !tempArray[index].isActive
    this.setState({
      surveyArray: tempArray,
    });
  }

  _onPressHeartDown = () => {
    if (this.state.heartArray.length > 0) {
      this.setState({
        heartArray: [],
      })
    } else {
      this.setState({
        heartArray: [
          {title: '10 Hearts', },
          {title: '20 Hearts', },
          {title: '30 Hearts', },
          {title: '40 Hearts', },
          {title: '50 Hearts', },
        ],
      })
    }
  }

  _onPressLaunch = () => {
  }

  renderSurveyItem = (item, index) => {
    return (
      <View style={styles.surveyItem}>
        <View style={styles.surveyHeader}>
        </View>
        <View style={styles.surveyContent}>
          <Text style={styles.surveyText}>{item.title}</Text>
          <Text style={styles.surveyText}>{item.type == 0 ? 'Hot or Not?' : 'Top Question'}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
            <View style={item.isActive ? styles.activeDot : styles.deactiveDot}></View>
            <Text style={{flex: 1, fontSize: 10,}}>{item.isActive ? 'Active' : 'Inactive'}</Text>
          </View>
        </View>
        <View style={styles.surveyFooterButton}>
          <TouchableOpacity onPress={this._onPressSurveyItemEdit.bind(this, index)}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <Text style={{marginLeft: 5, marginRight: 5,}}>|</Text>
          <TouchableOpacity onPress={this._onPressSurveyItemActive.bind(this, index)}>
            <Text>{item.isActive ? 'De-activate' : 'Activate'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.homeHeader}>
          <TouchableOpacity onPress={this._onPressBack}>
            <Image style={styles.imgBack} source={R.images.icon_leftarrow_black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Survey</Text>
        </View>
        <ScrollView style={styles.rootScrollView}>
          <View>
            <Text style={{marginTop: 24, alignSelf: 'center', textAlign: 'center', marginBottom: 20, }}>Get instant intelligence to help{'\n'}bring the right products to market{'\n'}or create your own instant poll.</Text>
            <Autocomplete
              style={{ zIndex: 100 }} 
              containerStyle={{...styles.containerStyle, zIndex: 100}}
              inputContainerStyle={styles.inputContainerStyle}
              listContainerStyle={styles.listContainerStyle}
              listStyle={styles.listStyle}
              data={this.state.heartArray}
              renderTextInput={() => (
                <View style={{flexDirection: 'row',}}>
                  <View style={styles.viewHeart}>
                    <Image style={styles.imgHeart} source={R.images.icon_heart_white} />
                  </View>
                  <TextInput editable={false} style={styles.textInput} value={this.state.heartTextValue}>
                  </TextInput>
                  <TouchableOpacity style={{alignSelf: 'center', marginRight: 12,}} onPress={this._onPressHeartDown}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                </View>
              )}
              renderItem={({ item, index }) => (
                  <TouchableOpacity id={index} style={styles.dropdownItem} onPress={() => {
                      this.setState({ heartTextValue: item.title, heartArray: [] });
                    }
                  }>
                    <Text style={{marginLeft: 10,}}>{item.title}</Text>
                  </TouchableOpacity>
                )
              }
            />
            <TouchableOpacity style={{...styles.button, marginTop: 20, marginBottom: 20,}} onPress={this._onPressApply}>
              <Text style={{color: 'white'}}>Apply hearts</Text>
            </TouchableOpacity>
            <View style={styles.viewMenu}>
              <Text>Choose a style</Text>
            </View>
            <TouchableOpacity style={{...styles.button, marginTop: 20}} onPress={this._onPressHot}>
              <Text style={{color: 'white'}}>Hot or Not</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 15, marginBottom: 15,}} onPress={this._onPressHot}>
              <Text style={{alignSelf: 'center', textDecorationLine: 'underline',}}>Preview</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this._onPressQuestionaire}>
              <Text style={{color: 'white'}}>Burning Question</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 15, marginBottom: 15,}} onPress={this._onPressQuestionaire}>
              <Text style={{alignSelf: 'center', textDecorationLine: 'underline',}}>Preview</Text>
            </TouchableOpacity>
            <View style={{...styles.viewMenu, marginBottom: 24,}}>
              <Text>Additional options</Text>
            </View>
            <View style={styles.viewAdditional}>
              <Text style={styles.textAdditional}>Location:</Text>
              <View style={styles.addiContent}>
                <Text>London SW 1TW</Text>
                <TouchableOpacity>
                  <Image style={styles.addiClose} source={R.images.icon_input_delete} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={styles.textAddmore}>+ Add more</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewAdditional}>
              <Text style={styles.textAdditional}>Interest:</Text>
              <View style={styles.addiContent}>
                <Text>Sneakers</Text>
                <TouchableOpacity>
                  <Image style={styles.addiClose} source={R.images.icon_input_delete} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={styles.textAddmore}>+ Add more</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewAdditional}>
              <Text style={styles.textAdditional}>Age range:</Text>
              <View style={styles.addiContent}>
                <Text>16-20</Text>
                <TouchableOpacity>
                  <Image style={styles.addiClose} source={R.images.icon_input_delete} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={styles.textAddmore}>+ Add more</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewAdditional}>
              <Text style={styles.textAdditional}>Sex:</Text>
              <View style={styles.addiContent}>
                <Text>Male</Text>
                <TouchableOpacity>
                  <Image style={styles.addiClose} source={R.images.icon_input_delete} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={styles.textAddmore}>+ Add more</Text>
              </TouchableOpacity>
            </View>
            <Text style={{marginTop: 24, marginLeft: 12, marginRight: 12, alignSelf: 'center',}}>Optional keyword targeting</Text>
            <View style={styles.viewDelay}>
              <Text>#trainers #runningshoes #fashion</Text>
            </View>
            <TouchableOpacity style={{...styles.button, marginTop: 10, marginBottom: 20,}} onPress={this._onPressLaunch}>
              <Text style={{color: 'white'}}>Save changes</Text>
            </TouchableOpacity>
            <View style={styles.viewMenu}>
              <Text>Upload media</Text>
            </View>
            <View style={styles.viewUpload}>
              <Image style={styles.imgUpload} source={R.images.icon_upload_black} />
            </View>
            <Text style={{alignSelf: 'center', }}>Add your campaign url</Text>
            <View style={styles.viewUrl}>
              <TextInput style={{width: '100%', paddingLeft: 10, paddingRight: 10, }} value={this.state.urlValue} onChangeText={(value) => this.setState({urlValue : value,})}></TextInput>
            </View>
            <View style={{...styles.viewMenu, marginTop: 20, marginBottom: 20, }}>
              <Text>Campaign settings</Text>
            </View>
            <Text style={{marginLeft: 15, marginBottom: 20, fontSize: 14,}}>Campaign budget</Text>
            <View style={styles.budgetWrapper}>
              <View style={styles.budgetItemWrapper}>
                <Text style={{flex: 1, marginLeft: 10, color: 'black', }}>Total budget</Text>
              </View>
              <View style={styles.budgetItemWrapper}>
                <Text style={{flex: 1, marginLeft: 10, color: 'black', }}>£100.00</Text>
                <Text style={{marginLeft: 10, marginRight: 10, color: 'black', }}>GBP</Text>
              </View>
            </View>
            <Text style={{alignSelf: 'center', textAlign: 'center', marginTop: 30, fontSize: 14,}}>The campaign will run until the budget{'\n'}is consumed and estimate you will get{'\n'}"xxxx" responses.</Text>
            <View style={{...styles.viewMenu, marginTop: 30,}}>
              <Text>My current surveys</Text>
            </View>
            {this.state.surveyArray.map((item, index) => this.renderSurveyItem(item, index))}
            <View style={styles.viewFooter}>
              <TouchableOpacity style={styles.btnApply} onPress={this._onPressLaunch}>
                <Text style={{color: 'white'}}>Launch survey</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
