import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Moment from 'moment';

import { isYamuPartners } from 'constants/globalconstants';

import R from 'res/R';
import styles from './styles';

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arraySortedHistory: this.addHeaderItems(this.sortByDate(this.props.arrayHistory)),
    };
  }

  sortByDate = (array) => {
    console.log(array)
    if (array == null) return []
    let sortedArray = array.sort( (a, b) =>
      b.created - a.created
    );
    return sortedArray
  }

  addHeaderItems = (array) => {
    var newArray = [];

    if (array.length == 0) return []

    var dateToAdd = "";
    for (let i = 0; i < array.length; i ++) {
      var currentDate = Moment(array[i].created).format('YYYY/MM/DD')
      let today = Moment(new Date()).format('YYYY/MM/DD')
      if (dateToAdd !== currentDate) {
        let str = Moment(array[i].created).format('dddd, DD MMMM YYYY')
        newArray.push({"title": today === currentDate ? 'Today - ' + str : str, "url": "", "created": new Date(), "header": true});
        dateToAdd = currentDate
      }
      newArray.push({...array[i], "header": false});
    }
    return newArray
  }

  _onLoadData = (arrayHistory) => {
    this.setState({
      arraySortedHistory: this.addHeaderItems(this.sortByDate(arrayHistory)),
    });
  }

  _onPressHistoryItem = (index) => {
    this.props.pressHistoryItem(index, this.state.arraySortedHistory[index].url)
  }

  renderItem = ({item, index}) => {
    if (item.header) {
      return (
        <Text numberOfLines={1} style={styles.headerItem}>{item.title}</Text>
      );
    } else {
      return (
        <TouchableOpacity style={styles.historyItem} onPress={this._onPressHistoryItem.bind(this, index)}>
          <View style={{flex: 1, marginLeft: 16, }}>
            <Text numberOfLines={1} style={{color: 'black', fontSize: 14, }}>{item.title}</Text>
            <Text numberOfLines={1} style={{color: '#979797', fontSize: 12, marginTop: 5, }}>{item.url}</Text>
          </View>
          {isYamuPartners(item.url) ? (
            <Image style={{ width: 24, height: 24, marginRight: 16}} source={R.images.img_yamu_logo} />
          ) : null}
          <Text numberOfLines={1} style={{color: '#979797', fontSize: 14, marginRight: 16, }}>{Moment(item.created).format('LT')}</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    Moment.locale('en');
    return (
      <View style={styles.wrapper}>
        <FlatList
          style={{flex: 1, }}
          data={this.state.arraySortedHistory}
          renderItem={this.renderItem}
        />
        <View style={styles.footerWrapper}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 12, }} onPress={this.props.pressClearAll}>
            <Text style={styles.footerText}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{position: 'absolute', right: 0, marginRight: 12, }} onPress={this.props.pressDone}>
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}