import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';

export default class AdManangerReachback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cashbackArray : [],
      cashbackTextValue: '5% Cashback',
      heartArray : [],
      heartTextValue: '5 Hearts',
      budgetArray : [],
      budgetTextValue: 'Daily',
      untilArray : [],
      untilTextValue: '22 Jul 2020',
      urlValue: '',
    };
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressApply = () => {
  }

  _onPressHeartDown = () => {
    this.setState({
      cashbackArray: [],
      budgetArray: [],
      untilArray : [],
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

  _onPressCashbackDown = () => {
    this.setState({
      heartArray: [],
      budgetArray: [],
      untilArray: [],
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

  _onPressBudgetDown = () => {
    this.setState({
      cashbackArray: [],
      heartArray: [],
      untilArray: [],
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

  _onPressUntilDown = () => {
    this.setState({
      cashbackArray: [],
      heartArray: [],
      budgetArray: [],
    })
    if (this.state.untilArray.length > 0) {
      this.setState({
        untilArray: [],
      })
    } else {
      this.setState({
        untilArray: [
          {title: '22 Jul 2020', },
          {title: '23 Jul 2020', },
          {title: '24 Jul 2020', },
          {title: '25 Jul 2020', },
          {title: '26 Jul 2020', },
        ],
      })
    }
  }
  
  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.homeHeader}>
          <TouchableOpacity onPress={this._onPressBack}>
            <Image style={styles.imgBack} source={R.images.icon_leftarrow_black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reach Back Ad</Text>
        </View>
        <ScrollView style={styles.rootScrollView}>
          <View>
            <Text style={{marginTop: 24, marginBottom: 20, marginLeft: 40, marginRight: 40, textAlign: 'center',}}>“Reach Back“ to consumers with products{'\n'}and services that people have signalled{'\n'}their interest in.</Text>
            <Autocomplete
              style={{ zIndex: 100, }} 
              containerStyle={{...styles.containerStyle, zIndex: 200}}
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
            <View style={{...styles.viewMenu, marginTop: 20,}}>
              <Text>Instant Karma!</Text>
            </View>
            <Text style={{marginTop: 24, marginBottom: 24, alignSelf: 'center', textAlign: 'center', }}>Minimum 5 hearts per true view applies.{'\n'}Improve response by increasing hearts!</Text>
            <Autocomplete
              style={{ zIndex: 100, }} 
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
            <View style={{...styles.viewMenu, marginTop: 20, marginBottom: 24}}>
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
            <TouchableOpacity style={{...styles.btnApply, marginTop: 50,}} onPress={this._onPressLaunch}>
              <Text style={{color: 'white'}}>Save changes</Text>
            </TouchableOpacity>
            <View style={{...styles.viewMenu, marginTop: 20, }}>
              <Text>Upload media</Text>
            </View>
            <TouchableOpacity style={styles.viewUpload}>
              <Image style={styles.imgUpload} source={R.images.icon_upload_black} />
            </TouchableOpacity>
            <Text style={{alignSelf: 'center', }}>Add your campaign url</Text>
            <View style={styles.viewUrl}>
              <TextInput style={{width: '100%', paddingLeft: 10, paddingRight: 10, }} value={this.state.urlValue} onChangeText={(value) => this.setState({urlValue : value,})}></TextInput>
            </View>
            <View style={{...styles.viewMenu, marginTop: 20, marginBottom: 20, }}>
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
                <Text style={{flex: 1, marginLeft: 10, color: 'black', }}>£100.00</Text>
                <Text style={{marginLeft: 10, marginRight: 10, color: 'black', }}>GBP</Text>
              </View>
            </View>
            <Text style={{alignSelf: 'center', marginTop: 10, marginBottom: 10, fontSize: 12,}}>Actual amount may vary</Text>
            <Text style={{alignSelf: 'center', marginTop: 15, marginBottom: 10, fontSize: 14,}}>Run this campaign until</Text>
            <Autocomplete
              style={{ zIndex: 100 }} 
              containerStyle={{...styles.containerStyle, zIndex: 200}}
              inputContainerStyle={styles.inputContainerStyle}
              listContainerStyle={styles.listContainerStyle}
              listStyle={styles.listStyle}
              data={this.state.untilArray}
              renderTextInput={() => (
                <View style={{flexDirection: 'row',}}>
                  <TextInput editable={false} style={styles.textInput} value={this.state.untilTextValue}>
                  </TextInput>
                  <TouchableOpacity style={{alignSelf: 'center', marginRight: 12,}} onPress={this._onPressUntilDown}>
                    <Image style={styles.imgDown} source={R.images.icon_downarrow_fullblack} />
                  </TouchableOpacity>
                </View>
              )}
              renderItem={({ item, index }) => (
                  <TouchableOpacity id={index} style={styles.dropdownItem} onPress={() => {
                      this.setState({ untilTextValue: item.title, untilArray: [] });
                    }
                  }>
                    <Text style={{marginLeft: 10,}}>{item.title}</Text>
                  </TouchableOpacity>
                )
              }
            />
            <Text style={{alignSelf: 'center', textAlign: 'center', marginTop: 15, fontSize: 14,}}>You will spend a total of £10.00.{'\n'}This campaign will run for 5 days,{'\n'}ending Jul 22, 2020.</Text>
            <TouchableOpacity style={styles.selectedViewTag}>
              <Text style={styles.selectedTxtTag}>Preview campaign</Text>
            </TouchableOpacity>
            <View style={styles.viewFooter}>
              <TouchableOpacity style={styles.btnApply} onPress={this._onPressLaunch}>
                <Text style={{color: 'white'}}>Launch reach back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
