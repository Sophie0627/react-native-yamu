import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, View, Image, Text, TouchableOpacity, Share, Keyboard, createRef, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Svg, Polyline } from 'react-native-svg';
import { connect } from 'react-redux';
import ViewShot, { captureRef } from "react-native-view-shot";
import RNFetchBlob from 'rn-fetch-blob'

import GlobalStyles from 'constants/globalstyles';
import { getGoogleSearchAPI, } from 'constants/globalconstants';


// models
import FavoriteModel from 'models/favoritemodel';
import HistoryModel from 'models/historymodel';
import TabModel from 'models/tabmodel';

// dialogs
import OptionsModal from './optionsmodal';
import AddFavoriteModal from '../components/addfavoritemodal';

// action
import { setBrowserFavorites, setBrowserHistorys, setBrowserIncognitoTabs, setBrowserTabs } from 'myredux/actions';

// searchbar
import SearchBar from '../components/searchbar';

// inject
import injectWebViewJsForUtility from './inject/utility';
import { injectWebViewJsForGoogle, injectWebViewJsForGoogleResult } from './inject/google';
import injectWebViewJsForYamu from './inject/yamu';
import injectYamuToggleMenu from './inject/yamu/togglemenu';
import jsOnPortrait from './inject/yamu/common';


import R from 'res/R';
import styles from './yamuviewstyles';
import Orientation from 'react-native-orientation';

class YamuView extends Component {

  constructor(props) {
    super(props);

    const searchTerm = this.props.searchTerm;
    var pathArray = searchTerm.split('/');
    var protocol = pathArray[0];
    var isHttp = protocol.toLowerCase() === "http:" || protocol.toLowerCase() === "https:"


    this.state = {
      url: isHttp ? searchTerm : getGoogleSearchAPI(this.props.searchRegion, this.props.safeSearch) + encodeURIComponent(searchTerm),
      searchText: searchTerm,
      isInGoogle: true,
      canBackward: false,
      canForward: false,
      isLoading: false,
      loadingStep: 0,
      showOptionsModal: false,
      showAddFavoriteModal: false,
      scrollDirection: 'up',
      urlIncludeGoogle: false,
      orientation: ''
    };

    this.webView = null;
    this.searchBar = React.createRef();
    this.currentTitle = '';
    this.currentUrl = '';
    this.scrollPosition = 0;

  }


  getOrientation = () => {
    // if (this.refs.rootView) {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.setState({ orientation: 'portrait' });
    }
    else {
      this.setState({ orientation: 'landscape' });
    }
    // }
  }

  componentDidMount() {

    Orientation.unlockAllOrientations();

    this.getOrientation();

    Dimensions.addEventListener('change', () => {
      this.getOrientation();

      if (this.state.orientation == "portrait") {
        // this.webView.injectJavaScript(jsOnPortrait());
      }
    });
  }

  // methods
  search = (searchText) => {
    var url = searchText;
    var lastExtension= searchText.substring(searchText.length - 4, searchText.length);

    if (!searchText.toLowerCase().includes("http://") && !searchText.toLowerCase().includes("https://")) {
      if (lastExtension === '.com' || lastExtension === '.net' || lastExtension === '.org') {
        var url = 'http://' + searchText;
      } else {
        url = getGoogleSearchAPI(this.props.searchRegion, this.props.safeSearch) + encodeURIComponent(searchText);
      }
    }

    if (url != this.state.url) {
      this.setState({ url: url });
    } else {
      this.reload();
    }
  }

  navigateToOffersScreen = () => {
    this.props.navigation.navigate('Offers');
  }

  reload = () => {
    if (this.webView != null) {
      this.webView.reload();
    }
  }

  _navigationWith(searchTerm) {
    var pathArray = searchTerm.split('/');
    var protocol = pathArray[0];
    var isHttp = protocol.toLowerCase() === "http:" || protocol.toLowerCase() === "https:"
    this.setState({
      url: isHttp ? searchTerm : getGoogleSearchAPI(this.props.searchRegion, this.props.safeSearch) + encodeURIComponent(searchTerm),
      suggestions: [],
      searchText: '',
    })
  }

  addHistory(title, url) {
    // check if already added
    let historyArray = [...this.props.arrayHistory];
    if (historyArray.length > 0) {
      if (historyArray[historyArray.length - 1].url == url) {
        return;
      }
    }
    if (title === undefined || title == '')
      return;

    const newHistory = new HistoryModel();
    newHistory.title = title;
    newHistory.url = url;
    newHistory.created = new Date();

    let newHistoryArray = [...this.props.arrayHistory, newHistory];
    this.props.setBrowserHistorys(newHistoryArray);
  }

  addFavorite(title, url) {
    // check if already added
    // let favoriteArray = [...this.props.arrayFavorite];
    // if(favoriteArray.length > 0) {
    //   if(favoriteArray[favoriteArray.length - 1].url == url) {
    //     return;
    //   }
    // }

    const newFavorite = new FavoriteModel();
    newFavorite.title = title;
    newFavorite.url = url;

    let newFavoriteArray = [...this.props.arrayFavorite];
    newFavoriteArray = [...newFavoriteArray, newFavorite];
    this.props.setBrowserFavorites(newFavoriteArray);
  }

  addTab(title, url, image) {
    let newTabArray = this.props.isIncognito ? [...this.props.arrayIncognitoTab] : [...this.props.arrayTab];
    if (global.selectedTabIndex == 0 && global.addTab) {
      const newTab = new TabModel()
      newTab.title = title
      newTab.url = url
      newTab.image = image
      newTabArray = [newTab, ...newTabArray];
      global.addTab = false
    } else {
      newTabArray[global.selectedTabIndex].title = title
      newTabArray[global.selectedTabIndex].url = url
      newTabArray[global.selectedTabIndex].image = image
    }
    this.props.isIncognito ? this.props.setBrowserIncognitoTabs(newTabArray) : this.props.setBrowserTabs(newTabArray);
  }

  hideModal = () => {
    this.setState({
      showAddFavoriteModal: false,
      showOptionsModal: false,
    });
  };

  _onGoBackFromOptions = (type, data) => {
    if (type === 'url') {
      this._navigationWith(data)
    }
  }

  // events
  _onPressScreen = () => {
    //console.log("[BrowserHome] _onPressScreen()");

    Keyboard.dismiss();
  }

  // web view events
  _onLoadStart = e => {
    const { nativeEvent } = e;

    // if not google, add Yamu UI
    if (nativeEvent.url.includes('.google.')) {
      this.webView.injectJavaScript(injectWebViewJsForGoogle());
    } else {
      this.webView.injectJavaScript(injectWebViewJsForYamu());
    }

    if (global.selectedTabIndex != -1 && global.addTab) { // add tab
      this.addTab(this.currentTitle, this.currentUrl, '')
    }
  };

  _onLoadProgress = e => {
    const { nativeEvent } = e;

    // if not google, add Yamu UI
    if (nativeEvent.url.includes('.google.')) {
      this.webView.injectJavaScript(injectWebViewJsForGoogle());

      this.setState({
        urlIncludeGoogle: false
      });
    } else {
      this.webView.injectJavaScript(injectWebViewJsForYamu());

      this.setState({
        urlIncludeGoogle: true
      });
    }

    this.setState({
      loadingStep: e.nativeEvent.progress == 1 ? 0 : e.nativeEvent.progress,
    });

    if (e.nativeEvent.progress == 1) {
      if (!this.props.isIncognito) { // add history
        this.addHistory(this.currentTitle, this.currentUrl);
      }

      if (global.selectedTabIndex != -1) { // add tab
        captureRef(this.refs.viewShot, { format: 'png', quality: 0.1 }).then(res => {
          RNFetchBlob.fs.readFile(res, 'base64').then((base64data) => {
            let base64Image = `data:image/png;base64,${base64data}`;
            this.addTab(this.currentTitle, this.currentUrl, base64Image)
          })
        }).catch(error => {
          console.log(error, 'this is error');
        })
      }
    }
  }

  _onLoadEnd = e => {
    const { nativeEvent } = e;

    // utility
    this.webView.injectJavaScript(injectWebViewJsForUtility());

    // if google, inject google result
    if (nativeEvent.url.includes('.google.')) {
      this.webView.injectJavaScript(injectWebViewJsForGoogleResult());
    } else {

    }

  };

  _onLoadError = e => {
    console.log("[YamuView] _onLoadError()");

    this.setState({
      loadingStep: 0,
    });
  }

  _renderLoadError = e => {
    return (
      <View style={styles.webviewError}>
        <Image style={styles.webviewErrorLogo} source={R.images.icon_badmood_red} />
        <Text style={styles.webviewErrorTitle}>This site can't be reached</Text>
        <Text style={styles.webviewErrorDescription}>The server could not be found or could not be reached for now. Please try again.</Text>
      </View>
    );
  };

  _onWebViewNavigationStateChanged(webViewState) {
    //console.log("[YamuView] _onWebViewNavigationStateChanged() -> url: " + webViewState.url);
    this.setState({
      searchText: webViewState.url,
      isInGoogle: webViewState.url.includes('.google.') ? true : false,
      canBackward: webViewState.canGoBack,
      canForward: webViewState.canGoForward
    });

    this.currentUrl = webViewState.url;
  }

  _onWebViewMessage = e => {
    var messagedata = JSON.parse(e.nativeEvent.data);
    
    if (messagedata == 'signup-click') {
      this.props.navigation.navigate('AdManagerLoginWith');
    }

    this.currentTitle = messagedata.title;

    this.setState({
      scrollDirection: messagedata.scrolling,
    });
    //console.log("[YamuView] _onWebViewMessage() -> currentTitle: " + this.currentTitle);
  }

  _onWebViewScroll = e => {
    // const { nativeEvent } = e;
    var currentScrollPosition = e.nativeEvent.contentOffset.y;
    this.setState({
      scrollDirection: 'up',
    });
    if ((this.scrollPosition > currentScrollPosition) || (currentScrollPosition == 0)) {
      this.setState({
        scrollDirection: 'up',
      });
      this.webView.injectJavaScript(injectYamuToggleMenu("up"));
    } else {
      this.setState({
        scrollDirection: 'down',
      });
      this.webView.injectJavaScript(injectYamuToggleMenu("down"));
    }

    this.scrollPosition = currentScrollPosition;

  }

  // menu handlers
  _onGoBackward = () => {
    if (this.webView != null) {
      this.webView.goBack();
    }
  }

  _onGoForward = () => {
    if (this.webView != null) {
      this.webView.goForward();
    }
  }

  _onShowYamuAssistant = () => {
    //console.log("[YamuView] _onShowYamuAssistant()");
    if (this.webView != null) {
      this.webView.postMessage("showYamuAssist");
    }
  }

  _onShowOptionsModal = () => {
    this.setState({
      showOptionsModal: true,
    });
  }

  _onAddFavoriteItem = (title, url) => {
    this.addFavorite(title, url);

    this.setState({
      showAddFavoriteModal: false,
    });
  }

  _pressHeaderItem = index => {
    this.props.navigation.push('BrowserOptions', { selectedIndex: index, onGoBackFromOptions: (type, data) => this._onGoBackFromOptions(type, data), });
    this.setState({
      showOptionsModal: false,
    });
  };

  _pressBodyItem = index => {
    if (index == 0) { //Add Tab
      this.setState({
        showOptionsModal: false,
      })
      global.selectedTabIndex = 0
      global.addTab = true
      this.props.navigation.push('BrowserView', { searchTerm: '', });
    } else if (index == 1) { //Add Favorite
      this.setState({
        showAddFavoriteModal: true,
        showOptionsModal: false,
      })
    } else if (index == 2) { //Share
      Share.share(
        {
          message: this.currentUrl,
          // title: this.currentUrl,
          url: this.currentUrl
        },
        {
          tintColor: 0x056ecf,
          excludedActivityTypes: [
            "com.apple.UIKit.activity.PostToFacebook",
            "com.apple.UIKit.activity.PostToTwitter",
            "com.apple.UIKit.activity.PostToWeibo",
            "com.apple.UIKit.activity.Message",
            "com.apple.UIKit.activity.Mail",
            "com.apple.UIKit.activity.Print",
            "com.apple.UIKit.activity.CopyToPasteboard",
            "com.apple.UIKit.activity.AssignToContact",
            "com.apple.UIKit.activity.SaveToCameraRoll",
            "com.apple.UIKit.activity.AddToReadingList",
            "com.apple.UIKit.activity.PostToFlickr",
            "com.apple.UIKit.activity.PostToVimeo",
            "com.apple.UIKit.activity.PostToTencentWeibo",
            "com.apple.UIKit.activity.AirDrop",
            "com.apple.UIKit.activity.OpenInIBooks",
            "com.apple.UIKit.activity.MarkupAsPDF",
            "com.apple.reminders.RemindersEditorExtension", //Reminders
            "com.apple.mobilenotes.SharingExtension", // Notes
            "com.apple.mobileslideshow.StreamShareService", // iCloud Photo Sharing - This also does nothing :{

            // Not supported
            "com.linkedin.LinkedIn.ShareExtension", //LinkedIn
            "pinterest.ShareExtension", //Pinterest
            "com.google.GooglePlus.ShareExtension", //Google +
            "com.tumblr.tumblr.Share-With-Tumblr", //Tumblr
            "wefwef.YammerShare", //Yammer
            "com.hootsuite.hootsuite.HootsuiteShareExt", //HootSuite
            "net.naan.TwitterFonPro.ShareExtension-Pro", //Echofon
            "com.hootsuite.hootsuite.HootsuiteShareExt", //HootSuite
            "net.whatsapp.WhatsApp.ShareExtension" //WhatsApp
          ]
        }
      );
    }
  };


  render() {

    //console.log("[YamuView] render()");
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <TouchableWithoutFeedback onPress={this._onPressScreen}>
          <View style={styles.rootWrapper}>
            {
              (this.state.scrollDirection == 'up' || this.scrollPosition == 0) ? (
                <SearchBar ref={(input) => { this.searchBar = input; }} searchText={this.state.searchText} progressStep={this.state.loadingStep} onSearch={this.search} onSignal={this.navigateToOffersScreen} onReload={this.reload} searchRegion={this.props.searchRegion} autocomplete={this.props.autocomplete} isIncognito={this.props.isIncognito} />
              )
                :
                (
                  <Text style={styles.titleTop}>{this.currentTitle}</Text>
                )
            }
            <ViewShot style={{ flex: 1, }} ref="viewShot" options={{ format: "jpg", quality: 0.5 }}>
              <WebView
                ref={r => (this.webView = r)}
                useWebKit={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: this.state.url }}
                style={styles.webview}
                onLoad={this._onLoad}
                onLoadProgress={this._onLoadProgress}
                onLoadStart={this._onLoadStart}
                onLoadEnd={this._onLoadEnd}
                onNavigationStateChange={this._onWebViewNavigationStateChanged.bind(this)}
                onError={this._onLoadError}
                renderError={this._renderLoadError}
                onScroll={this._onWebViewScroll}
                onMessage={this._onWebViewMessage}
                incognito={this.props.isIncognito}
                scrollEnabled={true}
              />
            </ViewShot>
            {(this.state.scrollDirection == 'up' || this.scrollPosition == 0) ? (
              <View style={styles.menuBar}>
                <TouchableOpacity style={styles.menuBarItem} disabled={this.state.canBackward ? false : true} onPress={this._onGoBackward}>
                  <Svg width='20' height='20'>
                    <Polyline points='18,0 3,10 18,20' stroke={this.state.canBackward ? 'black' : 'lightgray'} strokeWidth='1' />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBarItem} disabled={this.state.canForward ? false : true} onPress={this._onGoForward}>
                  <Svg width='20' height='20'>
                    <Polyline points='2,0 17,10 2,20' stroke={this.state.canForward ? 'black' : 'lightgray'} strokeWidth='1' />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBarItemYamuAssist} onPress={() => { this.props.navigation.navigate('BrowserHome') }}>
                  <Text style={styles.titleText}>Y</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBarItem, { width: 25, height: 25, borderColor: 'black', borderWidth: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center', }} onPress={this._pressHeaderItem.bind(this, 3)}>
                  <Text>{this.props.arrayTab.length > 0 ? this.props.arrayTab.length : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBarItem} onPress={this._onShowOptionsModal}>
                  <Text style={styles.titleText}>...</Text>
                </TouchableOpacity>
              </View>
            ) :
              (
                null
              )
            }
          </View>
        </TouchableWithoutFeedback>
        {this.state.showOptionsModal ? (
          <OptionsModal
            modalVisible={this.state.showOptionsModal}
            tabCount={this.props.arrayTab.length}
            isIncognito={this.props.isIncognito}
            pressHide={() => this.hideModal()}
            pressHeaderItem={index => this._pressHeaderItem(index)}
            pressBodyItem={index => this._pressBodyItem(index)}
          />
        ) : null}
        {this.state.showAddFavoriteModal ? (
          <AddFavoriteModal
            modalVisible={this.state.showAddFavoriteModal}
            title={this.currentTitle}
            url={this.currentUrl}
            screenTitle='Add Favorite'
            pressAddFavoriteItem={(title, url) => this._onAddFavoriteItem(title, url)}
            pressHide={() => this.hideModal()}
          />
        ) : null}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(YamuView)