import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';

export default class AdManangerBilling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlValue: '',
    };
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressLaunch = () => {
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.homeHeader}>
          <TouchableOpacity onPress={this._onPressBack}>
            <Image style={styles.imgBack} source={R.images.icon_leftarrow_black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Billing</Text>
        </View>
        <ScrollView style={styles.rootScrollView}>
          <View>
            <View style={styles.viewMenu}>
              <Text>Select payment method</Text>
            </View>
            <View style={styles.viewCountry}>
              <Text style={{marginLeft: 20,}}>Billing Country</Text>
              <View style={{flex: 1,}}></View>
              <TouchableOpacity>
                <Text style={{marginRight: 20, color: '#979797'}}>United Kingdom {'>'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewMenu}>
              <Text>Add a payment method to your ad account</Text>
            </View>
            <TouchableOpacity style={{...styles.viewMethod, borderBottomColor: '#D8D8D8', borderBottomWidth: 1,}}>
              <Text style={{marginLeft: 20,}}>Credit or Debit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewMethod}>
              <Text style={{marginLeft: 20,}}>Paypal</Text>
            </TouchableOpacity>
            <View style={{...styles.viewMenu, flexDirection: 'row', marginBottom: 35,}}>
              <Text>Your payment info is stored securely.</Text>
              <TouchableOpacity>
                <Text style={{marginLeft: 5, textDecorationLine: 'underline',}}>Learn more</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewMenu}>
              <Text>Cashback reclaim</Text>
            </View>
            <Text style={{marginLeft: 20, marginTop: 20,}}>Order Number</Text>
            <View style={styles.viewUrl}>
              <TextInput style={{width: '100%', paddingLeft: 10, paddingRight: 10, }} value={this.state.urlValue} onChangeText={(value) => this.setState({urlValue : value,})}></TextInput>
            </View>
            <TouchableOpacity style={styles.btnApply} onPress={this._onPressLaunch}>
              <Text style={{color: 'white'}}>Claim back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
