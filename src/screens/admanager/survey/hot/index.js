import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, } from 'react-native';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';

import Slider from '@react-native-community/slider';

export default class AdManangerSurveyHot extends Component {
  constructor(props) {
    super(props);
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressLaunch = () => {
    this.props.navigation.navigate('AdManagerSurveyFinal', { isHot: true });
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.homeHeader}>
          <Text style={styles.headerTitle}>Survey{'\n'}Hot or Not</Text>
        </View>
        <View style={styles.rootWrapper}>
          <View style={{flexDirection: 'row', marginTop: 15,}}>
            <TouchableOpacity onPress={this._onPressBack}>
              <Image style={styles.imgBack} source={R.images.icon_leftarrow_back} />
            </TouchableOpacity>
            <View style={{flex: 1,}}></View>
            <TouchableOpacity onPress={this._onPressBack}>
              <Image style={styles.imgClose} source={R.images.icon_close_black} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewSurveyImage}>
            <Image style={styles.surveyImage} source={R.images.img_product} />
          </View>
          <Text style={styles.txtHot}>Hot or not?</Text>
          <View style={styles.viewHot}>
            <Image style={styles.imgNot} source={R.images.img_nothot} />
            <Slider
              style={{flex: 1, height: 40, }}
              step={1}
              minimumValue={0}
              maximumValue={100}
              // value={this.state.age}
              // onValueChange={val => this.setState({ age: val })}
              // onSlidingComplete={ val => this.getVal(val)}
            />
            <Image style={styles.imgHot} source={R.images.img_hot} />
          </View>
          <View style={{flex: 1,}}></View>
          <View style={styles.viewFooter}>
            <TouchableOpacity style={styles.btnLaunch} onPress={this._onPressLaunch}>
              <Text style={{color: 'white'}}>Launch</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
