import React, { Component } from 'react';
import { Text, SafeAreaView } from 'react-native';
import styles from "./styles";

import * as ActionCreators from 'myredux/actions'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import AppIntroSlider from 'react-native-app-intro-slider';
import { CommonActions } from '@react-navigation/native';

const slides = [
  {
    key: 'slide1',
    text: 'Onboarding slide 1',
  },
  {
    key: 'slide2',
    text: 'Onboarding slide 2',
  },
  {
    key: 'slide3',
    text: 'Onboarding slide 3',
  },
];

class OnBoarding extends Component {
  _renderItem = ({ item }) => (
    <SafeAreaView style={styles.view}>
      <Text style={styles.slideText}>{item.text}</Text>
    </SafeAreaView>
  );

  _onDonePress = () => {
    this.props.setSkipOnboarding(true);
    this.props.navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        { name: 'MainBottomTabNavigator' },
      ],
    }));
  }

  render() {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={this._renderItem}
        bottomButton
        buttonStyle={styles.sliderButton}
        dotStyle={styles.sliderDots}
        activeDotStyle={styles.activeDot}
        onDone={this._onDonePress}
      />
    );
  }
}

const mapStateToProps = state => ({
  skipOnboarding: state.OnboardingReducer.skipOnboarding,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);