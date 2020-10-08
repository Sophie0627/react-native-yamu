import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from 'constants/globalstyles';
import { arrayBrowserOptionsTitle } from 'constants/globalconstants';

import R from 'res/R';
import styles from './styles';

import Favorites from './favorites';
import History from './history';
import Incognito from './incognito';
import Tabs from './tabs';
import Settings from './settings';

// action
import { navigateToScreen, setBrowserFavorites, setBrowserHistorys, setBrowserTabs } from 'myredux/actions';
import { setBrowserIncognitoTabs, setBrowserSettingsSearchRegion, setBrowserSettingsSafeSearch, setBrowserSettingsAutocomplete,  } from 'myredux/actions';

import FavoriteModel from 'models/favoritemodel';

import AddFavoriteModal from '../components/addfavoritemodal';
import SelectionModal from './components/selectionmodal';

class BrowserOptions extends Component {

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.navigateToScreen('BrowserOptions');
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  constructor(props) {
    super(props);

    const { selectedIndex } = this.props.route.params;
    this.state = {
      selectedIndex: selectedIndex,
      showAddFavoriteModal: false,
      selectedFavoriteIndex: 0,
      selectedFavoriteTitle: '',
      selectedFavoriteUrl: '',
      addOrEdit: true,
      showSelectionModal: false,
    };

    this.webView = null;
    this.mFavoriteView = null;
    this.mHistoryView = null;
    this.mIncognitoView = null;
    this.mTabView = null;

    this.isSearchRegion = true;
  }

  _onPressHeaderItem = index => {
    this.setState({
      selectedIndex: index,
    });
  }

  _onPressDone = () => {
    this.props.navigation.goBack()
  }

  _onShowAddFavoriteModal = () => {
    this.setState({
      showAddFavoriteModal: true,
      addOrEdit: true,
    })
  }

  _onPressFavoriteItem = (index) => {
    this.props.route.params.onGoBackFromOptions('url', this.props.arrayFavorite[index].url);
    this.props.navigation.goBack()
  }

  _onEditFavoriteItem = (index) => {
    this.setState({
      showAddFavoriteModal: true,
      addOrEdit: false,
      selectedFavoriteIndex: index,
      selectedFavoriteTitle: this.props.arrayFavorite[index].title,
      selectedFavoriteUrl: this.props.arrayFavorite[index].url,
    })
  }

  _onDeleteFavoriteItem = (index) => {
    const newFavoriteArray = [...this.props.arrayFavorite];
    newFavoriteArray.splice(index, 1);
    this.props.setBrowserFavorites(newFavoriteArray)

    this.mFavoriteView._onLoadData(newFavoriteArray)
  }

  _onAddFavoriteItem = (title, url) => {
    const newFavorite = new FavoriteModel()
    newFavorite.title = title
    newFavorite.url = url

    let newFavoriteArray = [...this.props.arrayFavorite];
    if (this.state.addOrEdit) {
      newFavoriteArray = [...newFavoriteArray, newFavorite];
    } else {
      newFavoriteArray[this.state.selectedFavoriteIndex].title = title
      newFavoriteArray[this.state.selectedFavoriteIndex].url = url
    }
    this.props.setBrowserFavorites(newFavoriteArray)

    this.setState({
      showAddFavoriteModal: false,
    });

    this.mFavoriteView._onLoadData(newFavoriteArray)
  }

  hideModal = () => {
    this.setState({
      showAddFavoriteModal: false,
      showSelectionModal: false,
    });
  };

  _onPressHistoryItem = (index, url) => {
    this.props.route.params.onGoBackFromOptions('url', url);
    this.props.navigation.goBack()
  }

  _onPressHistoryClearAll = () => {
    this.props.setBrowserHistorys([])
    this.mHistoryView._onLoadData([])
  };

  _onPressTabItem = (index, url, isIncognito) => {
    global.selectedTabIndex = index
    if (isIncognito)
      this.props.navigation.push('BrowserIncognitoView', { searchTerm: url, });
    else
      this.props.navigation.push('BrowserView', { searchTerm: url, });
  }

  _onAddTabItem = (isIncognito) => {
    global.selectedTabIndex = 0
    global.addTab = true
    if (isIncognito)
      this.props.navigation.push('BrowserIncognitoView', { searchTerm: '', });
    else
      this.props.navigation.push('BrowserView', { searchTerm: '', });
  }

  _onDeleteTabItem = (index, isIncognito) => {
    global.selectedTabIndex = -1
    let newTabArray;
    if (isIncognito)
      newTabArray = [...this.props.arrayIncognitoTab];
    else
      newTabArray = [...this.props.arrayTab];
    newTabArray.splice(index, 1);
    if (isIncognito) {
      this.props.setBrowserIncognitoTabs(newTabArray)
      this.mIncognitoView._onLoadData(newTabArray)
    } else {
      this.props.setBrowserTabs(newTabArray)
      this.mTabView._onLoadData(newTabArray)
    }
  }

  _onPressTabClearAll = (isIncognito) => {
    global.selectedTabIndex = -1
    if (isIncognito) {
      this.props.setBrowserIncognitoTabs([])
      this.mIncognitoView._onLoadData([])
    } else {
      this.props.setBrowserTabs([])
      this.mTabView._onLoadData([])
    }
  };

  _onPressSearchRegion = () => {
    this.isSearchRegion = true
    this.setState({
      showSelectionModal: true,
    });
  }

  _onPressSafeSearch = () => {
    this.isSearchRegion = false
    this.setState({
      showSelectionModal: true,
    });
  }
  
  _onPressAutocomplete = (bEnable) => {
    this.props.setBrowserSettingsAutocomplete(bEnable)
  }

  _clearAllData = () => {
    this.props.setBrowserFavorites([])
    this.props.setBrowserHistorys([])
    this.props.setBrowserIncognitoTabs([])
    this.props.setBrowserTabs([])
    Alert.alert(
      "Done",
      "All local data removed",
      [
        {
          text: "Okay",
          onPress: () => console.log("okay Pressed"),
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
  }

  _onPressClearAppData = () => {
    Alert.alert(
      "Clear all data?",
      "You can't undo this",
      [
        {
          text: "Don't clear",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Clear all",
          onPress: this._clearAllData,
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  }

  _onSaveCode = (selectedCode) => {
    if (this.isSearchRegion) {
      this.props.setBrowserSettingsSearchRegion(selectedCode)
    } else {
      this.props.setBrowserSettingsSafeSearch(selectedCode)
    }
    this.setState({
      showSelectionModal: false,
    });
  }

  _renderSwitch(index) {
    switch(index) {
      case 0:
        return (
          <Favorites
            ref={r => {this.mFavoriteView = r}}
            arrayFavorite={this.props.arrayFavorite}
            style={styles.bodyWrapper}
            pressDone={() => this._onPressDone()}
            pressFavoriteItem={(index) => this._onPressFavoriteItem(index)}
            showAddFavoriteModal={() => this._onShowAddFavoriteModal()}
            editFavoriteItem={(index) => this._onEditFavoriteItem(index)}
            deleteFavoriteItem={(index) => this._onDeleteFavoriteItem(index)}
          />
        );
      case 1:
        return (
          <History
            ref={r => {this.mHistoryView = r}}
            arrayHistory={this.props.arrayHistory}
            style={styles.bodyWrapper}
            pressDone={() => this._onPressDone()}
            pressHistoryItem={(index, url) => this._onPressHistoryItem(index, url)}
            pressClearAll={() => this._onPressHistoryClearAll()}
          />
        );
      case 2:
        return (
          <Incognito
            ref={r => {this.mIncognitoView = r}}
            arrayIncognitoTab={this.props.arrayIncognitoTab}
            style={styles.bodyWrapper}
            pressDone={() => this._onPressDone()}
            pressTabItem={(index, url) => this._onPressTabItem(index, url, true)}
            addTabItem={() => this._onAddTabItem(true)}
            deleteTabItem={(index) => this._onDeleteTabItem(index, true)}
            pressClearAll={() => this._onPressTabClearAll(true)}
          />
        );
      case 3:
        return (
          <Tabs
            ref={r => {this.mTabView = r}}
            arrayTab={this.props.arrayTab}
            style={styles.bodyWrapper}
            pressDone={() => this._onPressDone()}
            pressTabItem={(index, url) => this._onPressTabItem(index, url, false)}
            addTabItem={() => this._onAddTabItem(false)}
            deleteTabItem={(index) => this._onDeleteTabItem(index, false)}
            pressClearAll={() => this._onPressTabClearAll(false)}
          />
        );
      case 4:
        return (
          <Settings
            style={styles.bodyWrapper}
            autocomplete={this.props.autocomplete}
            pressDone={() => this._onPressDone()}
            pressSearchRegion={() => this._onPressSearchRegion()}
            pressSafeSearch={() => this._onPressSafeSearch()}
            pressAutocomplete={(bEnable) => this._onPressAutocomplete(bEnable)}
            pressClearAppData={() => this._onPressClearAppData()}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.rootWrapper}>
          <View style={this.state.selectedIndex == 2 ? {...styles.titleBar, backgroundColor: 'rgba(0,0,0,0.5)',} : styles.titleBar}>
            <Text style={styles.titleText}>{arrayBrowserOptionsTitle[this.state.selectedIndex]}</Text>
            <View style={styles.tabBarWrapper}>
              <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 0)}>
                <Image style={styles.tabItem} source={this.state.selectedIndex==0 ? R.images.icon_favorites_active : R.images.icon_favorites_inactive} />
              </TouchableOpacity>
              <View style={styles.seperator}></View>
              <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 1)}>
                <Image style={styles.tabItem} source={this.state.selectedIndex==1 ? R.images.icon_history_active : R.images.icon_history_inactive} />
              </TouchableOpacity>
              <View style={styles.seperator}></View>
              <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 2)}>
                <Image style={styles.tabItem} source={this.state.selectedIndex==2 ? R.images.icon_incognito_active : R.images.icon_incognito_inactive} />
              </TouchableOpacity>
              <View style={styles.seperator}></View>
              <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 3)}>
                <View style={this.state.selectedIndex==3 ? {...styles.tabsView, borderColor: '#72C500'} : {...styles.tabsView, borderColor: 'black'}}>
                  <Text style={this.state.selectedIndex==3 ? {color: '#72C500'} : {color: 'black'}}>{this.props.arrayTab.length > 0 ? this.props.arrayTab.length: ''}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.seperator}></View>
              <TouchableOpacity style={styles.headerItem} onPress={this._onPressHeaderItem.bind(this, 4)}>
                <Text style={this.state.selectedIndex==4 ? {...styles.moreText, color: '#72C500'} : {...styles.moreText, color: 'black'}}>···</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this._renderSwitch(this.state.selectedIndex)}
          {this.state.showAddFavoriteModal ? (
            <AddFavoriteModal
              modalVisible={this.state.showAddFavoriteModal}
              title={this.state.addOrEdit ? 'Title': this.state.selectedFavoriteTitle }
              url={this.state.addOrEdit ? 'https://google.com' : this.state.selectedFavoriteUrl }
              screenTitle={this.state.addOrEdit ? 'Add Favorite' : 'Edit Favorite'}
              pressAddFavoriteItem={(title, url) => this._onAddFavoriteItem(title, url)}
              pressHide={() => this.hideModal()}
            />
          ) : null}
          {this.state.showSelectionModal ? (
            <SelectionModal
              modalVisible={this.state.showSelectionModal}
              type={this.isSearchRegion}
              data={this.isSearchRegion ? this.props.searchRegion : this.props.safeSearch}
              pressSave={(selectedCode) => this._onSaveCode(selectedCode)}
              pressHide={() => this.hideModal()}
            />
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentScreen: state.ScreensReducer.currentScreen,
    arrayFavorite: state.BrowserReducer.arrayFavorite,
    arrayHistory: state.BrowserReducer.arrayHistory,
    arrayIncognitoTab: state.BrowserReducer.arrayIncognitoTab,
    arrayTab: state.BrowserReducer.arrayTab,
    searchRegion: state.BrowserReducer.searchRegion,
    safeSearch: state.BrowserReducer.safeSearch,
    autocomplete: state.BrowserReducer.autocomplete,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigateToScreen: screen => {
      dispatch(navigateToScreen(screen));
    },
    setBrowserFavorites: arrayFavorite => {
      dispatch(setBrowserFavorites(arrayFavorite));
    },
    setBrowserHistorys: arrayHistory => {
      dispatch(setBrowserHistorys(arrayHistory));
    },
    setBrowserIncognitoTabs: arrayIncognitoTab => {
      dispatch(setBrowserIncognitoTabs(arrayIncognitoTab));
    },
    setBrowserTabs: arrayTab => {
      dispatch(setBrowserTabs(arrayTab));
    },
    setBrowserSettingsSearchRegion: searchRegion => {
      dispatch(setBrowserSettingsSearchRegion(searchRegion));
    },
    setBrowserSettingsSafeSearch: safeSearch => {
      dispatch(setBrowserSettingsSafeSearch(safeSearch));
    },
    setBrowserSettingsAutocomplete: autocomplete => {
      dispatch(setBrowserSettingsAutocomplete(autocomplete));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowserOptions)
