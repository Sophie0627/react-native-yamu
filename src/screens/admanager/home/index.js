import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';

export default class AdManangerHome extends Component {
  constructor(props) {
    super(props);
    this.menuArray = [
      {menuText: 'Shopping Assistant', isSeperator: false, },
      {menuText: 'Eco Cashback', isSeperator: false, },
      {menuText: 'Yamu Widget', isSeperator: false, },
      {menuText: '', isSeperator: true, },
      {menuText: 'Advertising options', isSeperator: true, },
      {menuText: 'Wink back', isSeperator: false, },
      {menuText: 'Reach back', isSeperator: false, },
      {menuText: 'Survey', isSeperator: false, },
      {menuText: '', isSeperator: true, },
      {menuText: 'Billing', isSeperator: false, },
      {menuText: '', isSeperator: true, },
      {menuText: 'My campaigns', isSeperator: true, },
    ]
    this.campaignArray = [
      {title: 'Shopping Assistant', cashback: '5% Cashback', info: '567 Reach | 6% Conversions', },
      {title: 'Eco cashback - Sneakers', cashback: '5% Cashback', info: '567 Reach | 6% Conversions', },
      {title: 'Wink Back - Jeans', cashback: '5% Cashback', info: '567 Reach | 6% Conversions', },
      {title: 'Wink Back - Jeans', cashback: '5% Cashback', info: '567 Reach | 6% Conversions', },
    ]
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressMenuItem = (index) => {
    let screenName = ''
    switch (index) {
      case 0:
        screenName = 'AdManagerShoppingAssistant'
        break
      case 1:
        screenName = 'AdManagerEcoCashback'
        break
      case 2:
        screenName = 'AdManagerYamuWidget'
        break
      case 5:
        screenName = 'AdManagerWinkback'
        break
      case 6:
        screenName = 'AdManagerReachback'
        break
      case 7:
        screenName = 'AdManagerSurveyHome'
        break
      case 9:
        screenName = 'AdManagerBilling'
        break
      default:
        screenName = ''
        break
    }
    if (screenName !== '') {
      this.props.navigation.navigate(screenName);
    }
  }

  _onPressCampaignItem = (index) => {
  }

  renderMenuItem = (item, index) => {
    if (item.menuText === '' && item.isSeperator) {
      return (
        <View style={{height: 10, backgroundColor: '#F1F1F1'}}>
        </View>
      )
    } else if (item.menuText !== '' && item.isSeperator) {
      return (
        <View style={{...styles.menuItem, borderBottomWidth: 0,}}>
          <Text style={{...styles.menuItemText, fontWeight: 'bold',}}>{item.menuText}</Text>
        </View>
      )
    } else if (item.menuText == 'Billing') {
      return (
        <TouchableOpacity style={styles.menuItem} onPress={this._onPressMenuItem.bind(this, index)}>
          <Text style={{...styles.menuItemText, fontWeight: 'bold',}}>{item.menuText}</Text>
          <Image style={styles.menuItemArrow} source={R.images.icon_rightarrow_black} />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={styles.menuItem} onPress={this._onPressMenuItem.bind(this, index)}>
          <Text style={styles.menuItemText}>{item.menuText}</Text>
          <Image style={styles.menuItemArrow} source={R.images.icon_rightarrow_black} />
        </TouchableOpacity>
      )
    }
  }

  renderCampaignItem = (item, index) => {
    return (
      <View style={styles.campaignItem}>
        <View style={styles.campaignHeader}>
          <View style={{width: 16, height: 16, backgroundColor: '#72C500'}}></View>
        </View>
        <View style={styles.campaignContent}>
          <Text style={styles.campaignText}>{item.title}</Text>
          <Text style={styles.campaignText}>{item.cashback}</Text>
          <Text style={styles.campaignText}>{item.info}</Text>
        </View>
        <View style={styles.campaignFooterButton} onPress={this._onPressCampaignItem.bind(this, index)}>
          <TouchableOpacity style={styles.menuItemText}>
            <Text style={{textAlign: 'right', }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItemText}>
            <Text style={{textAlign: 'right', }}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItemText}>
            <Text style={{textAlign: 'right', }}>Delete</Text>
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
          <Text style={styles.headerTitle}>Your Ads Manager</Text>
        </View>
        <ScrollView style={styles.rootScrollView}>
          <View>
            {this.menuArray.map((item, index) => this.renderMenuItem(item, index))}
            <ScrollView>
              <View>
                {this.campaignArray.map((item, index) => this.renderCampaignItem(item, index))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}