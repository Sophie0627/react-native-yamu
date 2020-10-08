import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PieChart } from 'react-native-svg-charts'

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';

export default class AdManangerYamuWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressApply = () => {
  }

  render() {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))

    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.homeHeader}>
          <TouchableOpacity onPress={this._onPressBack}>
            <Image style={styles.imgBack} source={R.images.icon_leftarrow_black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Yamu Widget</Text>
        </View>
        <ScrollView style={styles.rootScrollView}>
          <View>
            <Text style={{marginTop: 30, marginBottom: 35, textAlign: 'center',}}>Add this widget to your social icons{'\n'}on your website to show your{'\n'}support to your users!</Text>
            <View style={styles.chartContainer}>
              <View style={{flex: 1,}}></View>
              <View style={styles.chartWrapper}>
                <PieChart style={styles.pieChart} data={pieData} />
              </View>
              <View style={{flex: 1,}}></View>
              <View style={styles.yamuWrapper}>
                <Text style={{color: 'white', fontSize: 18,}}>Yamu</Text>
              </View>
            </View>
            <View style={{...styles.viewCode, marginTop: 20,}}>
              <Text style={styles.textCode}>{"<"}code{">"}{"\n"}Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.{"\n"}{"<"}/code{">"}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={this._onPressApply}>
              <Text style={{color: 'white'}}>Copy code</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
