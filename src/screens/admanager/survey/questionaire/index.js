import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, } from 'react-native';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';

export default class AdManangerSurveyQuestionaire extends Component {
  constructor(props) {
    super(props);
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressLaunch = () => {
    this.props.navigation.navigate('AdManagerSurveyFinal', { isHot: false });
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.homeHeader}>
          <Text style={styles.headerTitle}>Survey{'\n'}Questionaire</Text>
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
          <View style={styles.viewQuestionaire}>
            <Text style={styles.txtQuestionaire}>What do you think about{'\n'}Adidas Superstars?</Text>
            <View style={styles.viewResponds}>
              <Text style={{color: '#979797',}}>User responds here</Text>
            </View>
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
