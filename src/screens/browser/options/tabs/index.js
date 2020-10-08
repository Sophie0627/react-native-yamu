import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Grid from 'react-native-grid-component';

import { isYamuPartners } from 'constants/globalconstants';

import R from 'res/R';
import styles from './styles';

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayTab: this.props.arrayTab,
    };
  }

  _onLoadData = (arrayTab) => {
    this.setState({
      arrayTab: arrayTab,
    });
  }

  _onDeleteTabItem = (index) => {
    this.props.deleteTabItem(index)
  }

  _onPressTabItem = (item, index) => {
    this.props.pressTabItem(index, item.url)
  }

  _renderItem = (item, index) => (
    <View style={{...styles.gridItem, ...styles.gridEmptyItem, }} key={index}>
      <View style={styles.gridItemHeader}>
        <Text numberOfLines={1} style={styles.headerTitle}>{item.title}</Text>
        {isYamuPartners(item.url) ? (
          <Image style={{width: 20, height: 20, marginLeft: 3, marginRight: 3, }} source={R.images.img_yamu_logo} />
        ) : null}
        <TouchableOpacity style={{paddingLeft: 3, paddingRight: 3, }} onPress={this._onDeleteTabItem.bind(this, index)}>
          <Image style={{width: 24, height: 24, }} source={R.images.icon_input_delete} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.gridItemContent} onPress={this._onPressTabItem.bind(this, item, index)}>
        <Image style={{width: '100%', height: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }} resizeMode={'cover'} source={{uri: item.image}} />
      </TouchableOpacity>
    </View>
  );

  _renderPlaceholder = i => <View style={styles.gridEmptyItem} key={i} />;

  render() {
    return (
      <View style={styles.wrapper}>
        <Grid
          style={styles.gridList}
          renderItem={this._renderItem}
          renderPlaceholder={this._renderPlaceholder}
          data={this.state.arrayTab}
          numColumns={2}
        />
        <View style={styles.footerWrapper}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 12, }} onPress={this.props.pressClearAll}>
            <Text style={styles.footerText}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{position: 'absolute', left: (win.width / 2) - 12, }} onPress={this.props.addTabItem}>
            <Image style={{ width: 24, height: 24, }} source={R.images.icon_add_black}/>
          </TouchableOpacity>
          <TouchableOpacity style={{position: 'absolute', right: 0, marginRight: 12, }} onPress={this.props.pressDone}>
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}