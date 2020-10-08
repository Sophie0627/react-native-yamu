import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import Grid from 'react-native-grid-component';

import { isYamuPartners } from 'constants/globalconstants';

import R from 'res/R';
import styles from './styles';

const win = Dimensions.get('window');

export default class Incognito extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayIncognitoTab: this.props.arrayIncognitoTab,
    };
  }

  _onLoadData = (arrayIncognitoTab) => {
    this.setState({
      arrayIncognitoTab: arrayIncognitoTab,
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
        {(this.state.arrayIncognitoTab === undefined || this.state.arrayIncognitoTab.length < 1) ? (
          <View style={styles.contentWrapper}>
            <Image style={{width: 48, height: 48, marginTop: 32, }} source={R.images.icon_incognito_white} />
            <Text style={styles.titleText}>You will browse {"\n"}incognito.{"\n"}What does that mean?</Text>
            <Text style={styles.contentText}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</Text>
          </View>
        ) : (
          <Grid
            style={styles.gridList}
            renderItem={this._renderItem}
            renderPlaceholder={this._renderPlaceholder}
            data={this.state.arrayIncognitoTab}
            numColumns={2}
          />
        )}
        <View style={styles.footerWrapper}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 12, }} onPress={this.props.pressClearAll}>
            <Text style={styles.footerText}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{position: 'absolute', left: (win.width / 2) - 12, }} onPress={this.props.addTabItem}>
            <Image style={{ width: 24, height: 24, }} source={R.images.icon_add_black} />
          </TouchableOpacity>
          <TouchableOpacity style={{position: 'absolute', right: 0, marginRight: 12, }} onPress={this.props.pressDone}>
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}