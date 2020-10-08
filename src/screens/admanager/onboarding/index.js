import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';

const win = Dimensions.get('window');

export default class AdManangerOnboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      descriptionArray : [
        {title: 'Better\nuser data', description: 'Our users tell you directly\nwhat they like and what they\nare looking to buy', },
        {title: 'Lower bounce\nrates', description: 'Our Yamu personal assistant\ninstantly matches your products\nwith the needs of our users ', },
        {title: 'Get them\nback!', description: '“Wink back” to consumers that\ncheck out a competitor. Say goodbye\nto 80% of wasted advertising', },
        {title: 'Make the world\na greener place', description: 'Free real-time eco widget\nto show how your advertising spend\nis funding environmental projects', },
      ],
    }
    this.mScroll = null;
  }

  _onPressNext = () => {
    if (this.state.selectedIndex == 3) {
      this.props.navigation.navigate('AdManagerHome');
    } else {
      var interval = win.width;
      var scrollTo = (this.state.selectedIndex + 1) * interval;
      this.mScroll.scrollTo({ x: scrollTo, y: 0, animated: true });
    }
  }

  _onMomentumScrollEnd = (e) => {
    // console.log(state)
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    this.setState({
      selectedIndex: pageNum,
    })
  }

  renderListItem = (item, index) => {
    return (
      <View style={{width: win.width}}>
        <View style={styles.viewImage}></View>
        <Text style={{...styles.txtTitle, fontWeight: 'bold', marginTop: 40,}}>{item.title}</Text>
        <Text style={{...styles.txtTitle, marginTop: 20,}}>{item.description}</Text>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.wrapper}>
          <View style={styles.scrollWrapper}>
            <ScrollView
              style={styles.scrollView}
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={this._onMomentumScrollEnd}
              ref={r => (this.mScroll = r)}
            >
              {this.state.descriptionArray.map((item, index) => this.renderListItem(item, index))}
            </ScrollView>
            <View style={styles.dotWrapper}>
              <View style={this.state.selectedIndex == 0 ? styles.activeDot : styles.inactiveDot}></View>
              <View style={this.state.selectedIndex == 1 ? styles.activeDot : styles.inactiveDot}></View>
              <View style={this.state.selectedIndex == 2 ? styles.activeDot : styles.inactiveDot}></View>
              <View style={this.state.selectedIndex == 3 ? styles.activeDot : styles.inactiveDot}></View>
            </View>
          </View>
          <TouchableOpacity style={styles.btnNext} onPress={this._onPressNext}>
            <Text style={styles.btnTitle}>{this.state.selectedIndex == 3 ? 'Start' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}