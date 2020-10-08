import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from "./styles";
import { CommonActions } from '@react-navigation/native';
import { connect } from "react-redux";

class Splash extends Component {
  componentWillMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [
          { name: this.props.skipOnboarding ? 'OnBoarding' : 'OnBoarding' },
        ],
      }));
    }, 3000);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Splash Screen</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  skipOnboarding: state.OnboardingReducer.skipOnboarding,
});

export default connect(mapStateToProps)(Splash);

