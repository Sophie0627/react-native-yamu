import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';

export default class AdManangerWinkback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cashbackArray : [],
      cashbackTextValue: '5% Cashback',
      heartArray : [],
      heartTextValue: '5 Hearts',
      budgetArray : [],
      budgetTextValue: 'Daily',
      urlArray : [
        {title: 'www.adidas.com', isAdd: false, },
        {title: 'www.jdsports.com', isAdd: false, },
        {title: '', isAdd: true, },
      ],
    };
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressApply = () => {
  }

  _onPressCashbackDown = () => {
    this.setState({
      heartArray: [],
      budgetArray: [],
    })
    if (this.state.cashbackArray.length > 0) {
      this.setState({
        cashbackArray: [],
      })
    } else {
      this.setState({
        cashbackArray: [
          {title: '5% Cashback', },
          {title: '10% Cashback', },
          {title: '15% Cashback', },
          {title: '20% Cashback', },
          {title: '25% Cashback', },
        ],
      })
    }
  }

  _onPressHeartDown = () => {
    this.setState({
      cashbackArray: [],
      budgetArray: [],
    })
    if (this.state.heartArray.length > 0) {
      this.setState({
        heartArray: [],
      })
    } else {
      this.setState({
        heartArray: [
          {title: '5 Hearts', },
          {title: '10 Hearts', },
          {title: '15 Hearts', },
          {title: '20 Hearts', },
          {title: '25 Hearts', },
        ],
      })
    }
  }

  _onPressBudgetDown = () => {
    this.setState({
      cashbackArray: [],
      heartArray: [],
    })
    if (this.state.budgetArray.length > 0) {
      this.setState({
        budgetArray: [],
      })
    } else {
      this.setState({
        budgetArray: [
          {title: 'Daily', },
          {title: 'Weekly', },
          {title: 'Monthly', },
          {title: 'Yearly', },
        ],
      })
    }
  }

  renderURLListItem = (item, index) => {
    if (index == this.state.urlArray.length-1) {
      return (
        <TouchableOpacity style={{marginLeft: 56, height: 55, justifyContent: 'center',}}>
          <Image style={{width: 24, height: 24, }} source={R.images.icon_add_black} />
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={styles.urlListItem}>
          <Text style={styles.urlListText}>{item.title}</Text>
          <TouchableOpacity style={styles.urlListFooterButton}>
            <Image style={{width: 14, height: 14, }} source={R.images.icon_close_black} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.homeHeader}>
          <TouchableOpacity onPress={this._onPressBack}>
            <Image style={styles.imgBack} source={R.images.icon_leftarrow_black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Wink back ad</Text>
        </View>
        <ScrollView style={styles.rootScrollView}>
          <View>
            <Text style={{marginTop: 24, marginBottom: 20, alignSelf: 'center', textAlign: 'center',}}>"Wink back" to consumers on your{'\n'}competitors site and make them{'\n'}a cashback offer they cannot refuse!</Text>
            <Autocomplete
              style={{ zIndex: 100 }} 
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              listContainerStyle={styles.listContainerStyle}
              listStyle={styles.listStyle}
              data={this.state.cashbackArray}
              renderTextInput={() => (
                <View style={{flexDirection: 'row',}}>
                  <View style={styles.viewHeart}>
                    <Image style={styles.imgHeart} source={R.images.icon_heart_white} />
                  </View>
                  <TextInput editable={false} style={styles.textInput} value={this.state.cashbackTextValue}>
                  </TextInput>
                  <TouchableOpacity style={{alignSelf: 'center', marginRight: 12,}} onPress={this._onPressCashbackDown}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                </View>
              )}
              renderItem={({ item, index }) => (
                  <TouchableOpacity id={index} style={styles.dropdownItem} onPress={() => {
                      this.setState({ cashbackTextValue: item.title, cashbackArray: [] });
                    }
                  }>
                    <Text style={{marginLeft: 10,}}>{item.title}</Text>
                  </TouchableOpacity>
                )
              }
            />
            <TouchableOpacity style={styles.button} onPress={this._onPressApply}>
              <Text style={{color: 'white'}}>Apply cashback</Text>
            </TouchableOpacity>
            <View style={{...styles.viewMenu, marginTop: 20, }}>
              <Text>Instant Karma!</Text>
            </View>
            <Text style={{marginTop: 24, marginBottom: 20, alignSelf: 'center', textAlign: 'center',}}>Offer a little instant heart payment{'\n'}for each click through</Text>
            <Autocomplete
              style={{ zIndex: 100 }} 
              containerStyle={styles.containerStyle}
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
            <Text style={{marginTop: 24, marginLeft: 12, marginRight: 12, alignSelf: 'center',}}>Optional keyword targeting</Text>
            <View style={styles.viewDelay}>
              <Text>#trainers #runningshoes #fashion</Text>
            </View>
            <View style={{...styles.viewMenu, marginBottom: 20, }}>
              <Text>Add competitor website URLs below</Text>
            </View>
            {this.state.urlArray.map((item, index) => this.renderURLListItem(item, index))}
            <View style={{...styles.viewMenu, marginBottom: 20, }}>
              <Text>Campaign settings</Text>
            </View>
            <Text style={{alignSelf: 'center', marginBottom: 20, fontSize: 14,}}>Your budget up to</Text>
            <View style={styles.budgetWrapper}>
              <Autocomplete
                style={{ zIndex: 100 }} 
                containerStyle={{...styles.containerStyle, width: 0, flex: 1, }}
                inputContainerStyle={{...styles.inputContainerStyle, height: 40,}}
                listContainerStyle={styles.listContainerStyle}
                listStyle={styles.listStyle}
                data={this.state.budgetArray}
                renderTextInput={() => (
                  <View style={{flexDirection: 'row',}}>
                    <TextInput editable={false} style={{...styles.textInput, height: 40, marginLeft: 10, marginRight: 2,}} value={this.state.budgetTextValue}>
                    </TextInput>
                    <TouchableOpacity style={{alignSelf: 'center', marginRight: 12, }} onPress={this._onPressBudgetDown}>
                      <Image style={{width: 13, height: 10,}} source={R.images.icon_downarrow_fullblack}/>
                    </TouchableOpacity>
                  </View>
                )}
                renderItem={({ item, index }) => (
                    <TouchableOpacity id={index} style={styles.dropdownItem} onPress={() => {
                        this.setState({ budgetTextValue: item.title, budgetArray: [] });
                      }
                    }>
                      <Text style={{marginLeft: 10,}}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                }
              />
              <View style={styles.budgetItemWrapper}>
                <Text style={{flex: 1, marginLeft: 10, color: 'black', }}>£10.00</Text>
                <Text style={{marginLeft: 10, marginRight: 10, color: 'black', }}>GBP</Text>
              </View>
            </View>
            <Text style={{alignSelf: 'center', marginTop: 10, marginBottom: 10, fontSize: 12,}}>Actual amount may vary</Text>
            <TouchableOpacity style={styles.selectedViewTag}>
              <Text style={styles.selectedTxtTag}>Preview campaign</Text>
            </TouchableOpacity>
            <View style={styles.viewFooter}>
              <TouchableOpacity style={styles.btnLaunch} onPress={this._onPressLaunch}>
                <Text style={{color: 'white'}}>Launch Wink Back Ad</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
