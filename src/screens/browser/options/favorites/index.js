import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';

import { isYamuPartners } from 'constants/globalconstants';

import R from 'res/R'
import styles from './styles';

const win = Dimensions.get('window');

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFavorite: 0,
      arrayFavorite: this.props.arrayFavorite,
      bEdit: false,
    };
  }

  _onLoadData = (arrayFavorite) => {
    this.setState({
      arrayFavorite: arrayFavorite,
    });
  }

  _onPressEditFavorite = () => {
    this.setState({
      bEdit: !this.state.bEdit,
    });

    // this.props.setBrowserFavorites([])
  }

  _onPressFavoriteItem = (index) => {
    this.state.bEdit ? this.props.editFavoriteItem(index) : this.props.pressFavoriteItem(index)
  }

  _onPressDeleteFavoriteItem = (index) => {
    this.props.deleteFavoriteItem(index)
  }

  renderItem = ({item, index}) => (
    <TouchableOpacity style={styles.favoriteItem} onPress={this._onPressFavoriteItem.bind(this, index)}>
      {this.state.bEdit ? (
      <TouchableOpacity style={{marginLeft: 12, }} onPress={this._onPressDeleteFavoriteItem.bind(this, index)}>
        <Text style={{color: 'red', }}>Delete</Text>
      </TouchableOpacity>
      ) : null}
      <Image style={{ width: 24, height: 24, marginLeft: 20, marginRight: 20, }} source={R.images.icon_favorites_inactive} />
      <View style={{flex: 1, marginRight: 16, }}>
        <Text numberOfLines={1} style={{color: 'black', fontSize: 14, }}>{item.title}</Text>
        <Text numberOfLines={1} style={{color: '#979797', fontSize: 12, marginTop: 5, }}>{item.url}</Text>
      </View>
      {isYamuPartners(item.url) ? (
        <Image style={{ width: 24, height: 24, marginRight: 16}} source={R.images.img_yamu_logo} />
      ) : null}
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={styles.wrapper}>
        <FlatList
          style={{flex: 1, }}
          data={this.state.arrayFavorite}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => (
              <View style={{height: 1, backgroundColor: 'lightgrey'}} />
            )
          }
        />
        <View style={styles.footerWrapper}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 12, }} onPress={this._onPressEditFavorite}>
            <Text style={styles.footerText}>{this.state.bEdit ? 'Done Editing' : 'Edit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{position: 'absolute', left: (win.width / 2) - 12, }} onPress={this.props.showAddFavoriteModal}>
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