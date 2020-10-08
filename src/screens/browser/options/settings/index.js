import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { Svg, Polyline } from 'react-native-svg';

import styles from './styles';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    var bEnable = this.props.autocomplete
    if (this.props.autocomplete === undefined)
      bEnable = true

    this.state = {
      isEnabled: bEnable,
    };
  }

  _onPressSearchRegion = () => {
    this.props.pressSearchRegion()
  };

  _onPressSafeSearch = () => {
    this.props.pressSafeSearch()
  };

  _toggleSwitch = () => {
    this.props.pressAutocomplete(!this.state.isEnabled)
    this.setState({
      isEnabled: !this.state.isEnabled,
    })
  };

  _onPressClearAppData = () => {
    this.props.pressClearAppData()
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.settingItem} onPress={this._onPressSearchRegion}>
          <Text style={styles.leftText}>Search region</Text>
          <Svg style={styles.rightArrow} width='20' height='20'>
            <Polyline points='2,0 17,10 2,20' stroke={'black'} strokeWidth='1'/>
          </Svg>
        </TouchableOpacity>
        <View style={styles.seperator}></View>
        <TouchableOpacity style={styles.settingItem} onPress={this._onPressSafeSearch}>
          <Text style={styles.leftText}>Safe search</Text>
          <Svg style={styles.rightArrow} width='20' height='20'>
            <Polyline points='2,0 17,10 2,20' stroke={'black'} strokeWidth='1'/>
          </Svg>
        </TouchableOpacity>
        <View style={styles.seperator}></View>
        <View style={styles.settingItem}>
          <Text style={styles.leftText}>Autocomplete</Text>
          <Switch
            style={styles.rightArrow}
            trackColor={{ false: "#767577", true: "#72C500" }}
            thumbColor={this.state.isEnabled ? "white" : "white"}
            ios_backgroundColor="#f1f1f1"
            onValueChange={this._toggleSwitch}
            value={this.state.isEnabled}
          />
        </View>
        <View style={styles.seperator}></View>
        <TouchableOpacity style={styles.settingItem} onPress={this._onPressClearAppData}>
          <Text style={styles.leftText}>Clear app data</Text>
          <Svg style={styles.rightArrow} width='20' height='20'>
            <Polyline points='2,0 17,10 2,20' stroke={'black'} strokeWidth='1'/>
          </Svg>
        </TouchableOpacity>
        <View style={{flex: 1,}}></View>
        <View style={styles.footerWrapper}>
          <TouchableOpacity style={{position: 'absolute', right: 0, marginRight: 12, }} onPress={this.props.pressDone}>
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}