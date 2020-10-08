import React, { Component } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, View, Image } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { ProgressView } from "@react-native-community/progress-view";
import { connect } from 'react-redux';

import axios from 'axios';

import GlobalStyles from 'constants/globalstyles';
import { getGoogleSuggestAPI } from 'constants/globalconstants';
import { SEACH_SUGGESTION_FAVORITE, SEACH_SUGGESTION_HISTORY, SEACH_SUGGESTION_GOOGLE } from 'constants/globalconstants';

import styles from './styles';
import R from 'res/R';

// dialog
import SignalDeleteModal from './signaldeletemodal';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: this.props.searchText == null ? '' : this.props.searchText,
      searchUrl: '',
      isSearchUrl: false,
      suggestions: [],
      signals: [],
      progressStep: this.props.progressStep,
      isSearchOrSignal: true,
      isEditing: false,
      showSignalDeleteModal: false,
    };

    this.nSignalToDelete = 0;
    this.searchHistory = [];

    this.arrSignals = [
      { signalText: 'holiday cornwall 2 persons...', isNew: true },
      { signalText: 'denimpants blue size 36 < £60', isNew: false },
      { signalText: 'adidas superstar UK 8,5', isNew: true },
      { signalText: 'flight to london August 2020', isNew: false },
      { signalText: 'supreme hat boxlogo white', isNew: false },
      { signalText: 'nike shorts XL > £20', isNew: false },
    ];
    this.lastRequestId = null;

    // text input
    this.searchTextInput = null;
  }

  /*static getDerivedStateFromProps(props, state) {
    if (props.searchText != null && props.searchText != state.searchText) {
      if(props.searchText.includes('http://') || props.searchText.includes('https://')) {
        if(props.searchText.includes('.google.')) {
          return { isSearchUrl: false };
        }

        console.log("[SearchBar] getDerivedStateFromProps() -> props.searchText: " + props.searchText);
        return { searchUrl: props.searchText, isSearchUrl: true };
      }
      
      return { searchText: props.searchText, isSearchUrl: false };
    }
  }*/

  componentDidMount() {
    if (global.addTab) {
      this.searchTextInput.focus()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.searchText != nextProps.searchText) {
      if (nextProps.searchText.includes('http://') || nextProps.searchText.includes('https://')) {
        if (nextProps.searchText.includes('.google.')) {
          this.setState({ isSearchUrl: false });
        } else {
          this.setState({ searchUrl: nextProps.searchText, isSearchUrl: true });
        }
      } else {
        this.setState({ searchText: nextProps.searchText, isSearchUrl: false });
      }
    }

    return true;
  }

  // methods
  reset = () => {
    this.setState({
      searchText: '',
      suggestions: [],
      signals: [],
      isSearchLoading: false,
      isSearchOrSignal: true,
      showSignalDeleteModal: false,
    })
    this.searchTextInput.blur()
  }

  search = (searchText) => {
    //console.log("[SearchBar] search() -> searchText: " + searchText);

    if (this.searchHistory.length > 0) {
      let bFlag = false;
      for (let i = 0; i < this.searchHistory.length; i++) {
        if (this.searchHistory[i].searchKey.toLowerCase() === searchText.toLowerCase()) {
          bFlag = true;
          break;
        }
      }
      if (!bFlag) {
        if (this.searchHistory.length > 4) {
          this.searchHistory.splice(0, 1);
        }
        this.searchHistory.push({ searchKey: searchText, isSearched: true });
      }
    } else {
      this.searchHistory.push({ searchKey: searchText, isSearched: true });
    }

    //this.reset();

    // call onSearch
    if (this.props.onSearch != null) {
      this.props.onSearch(searchText);
    }
  }

  // suggestions
  loadSuggestions(searchText) {
    if (searchText === '') {
      this.setState({
        isSearchLoading: false,
        suggestions: [],
      })
      return;
    }

    var bFlag = this.props.autocomplete === undefined ? true : this.props.autocomplete
    if (!bFlag) {
      this.setState({
        isSearchLoading: false,
        suggestions: [],
      })
      return;
    }

    this.setState({
      isSearchLoading: true,
    });

    var suggestions = [];

    // favorites
    var favorites = [...this.props.arrayFavorite];
    favorites.forEach(favorite => {
      var matched = false;

      if (favorite.url.toLowerCase().includes(searchText.toLowerCase())) {
        matched = true;
      }
      if (favorite.title.toLowerCase().includes(searchText.toLowerCase())) {
        matched = true;
      }

      if (!matched) {
        return true;
      }

      if (this.isExistSuggestion(favorite.url, suggestions)) {
        return true;
      }

      this.addSuggestion(SEACH_SUGGESTION_FAVORITE, favorite.url, suggestions);
    });

    // previous urls
    var historyUrls = [...this.props.arrayHistory];
    historyUrls.forEach(history => {
      var matched = false;

      if (history.url.toLowerCase().includes(searchText.toLowerCase())) {
        matched = true;
      }
      if (history.title.toLowerCase().includes(searchText.toLowerCase())) {
        matched = true;
      }

      if (!matched) {
        return true;
      }

      if (this.isExistSuggestion(history.url, suggestions)) {
        return true;
      }

      this.addSuggestion(SEACH_SUGGESTION_HISTORY, history.url, suggestions);
    });

    // google suggestions
    if (this.lastRequestId !== null) {
      this.lastRequestId = null;
    }

    this.lastRequestId = axios.get(getGoogleSuggestAPI(this.props.searchRegion) + encodeURIComponent(searchText))
      .then(res => {
        const json = res.data;
        const results = json.length > 1 ? json[1] : [];
        results.forEach(result => {
          if (this.isExistSuggestion(result, suggestions)) {
            return;
          }

          this.addSuggestion(SEACH_SUGGESTION_GOOGLE, result, suggestions);
        });

        this.setState({
          isSearchLoading: false,
          suggestions: suggestions,
        })
      }).catch(err => {
        this.setState({
          isSearchLoading: false,
        })
      })
  }

  isExistSuggestion(suggest, suggestions) {
    var exist = false;
    suggestions.forEach(element => {
      if (element.searchKey.toLowerCase() == suggest.toLowerCase()) {
        exist = true;
        return false;
      }
    });

    return exist;
  }

  isSearchedSuggestion(suggest) {
    var isSearched = false;
    this.searchHistory.forEach(element => {
      if (element.searchKey.toLowerCase() == suggest.toLowerCase()) {
        exist = true;
        return false;
      }
    });

    return isSearched;
  }

  addSuggestion(type, suggest, suggestions) {
    var isUrl = false;
    if (suggest.toLowerCase().includes("http://") || suggest.toLowerCase().includes("https://")) {
      isUrl = true;
    }

    var isSearched = this.isSearchedSuggestion(suggest);

    const newSuggest = { searchKey: suggest, type: type, isUrl: isUrl, isSearched: isSearched };
    suggestions.push(newSuggest);
  }

  addSignal(text, signals) {
    if (text == null || text == '') {
      return;
    }

    if (text.includes('http://') || text.includes('https://')) {
      return;
    }

    var exist = false;
    signals.forEach(signal => {
      if (text.toLowerCase() == signal.signalText.toLowerCase()) {
        exist = true;
        return false;
      }
    });

    if (!exist) {
      signals.push({ signalText: text, isNew: false });
    }
  }

  hideModal = () => {
    this.setState({
      showSignalDeleteModal: false,
    });
  };

  // events
  _onPressSearch = () => {
    this.setState({
      suggestions: [],
    });

    this.search(this.state.searchText);
  };

  _onPressReload = () => {
    this.setState({
      suggestions: [],
    });

    if (this.props.onReload != null) {
      this.props.onReload();
    }
  };

  _onPressSignal = (event) => {
    this.searchTextInput.blur();

    var signalText = this.state.searchText;
    this.addSignal(signalText, this.arrSignals);

    this.setState({
      signals: this.state.signals.length > 0 ? [] : this.arrSignals,
      isSearchOrSignal: false,
    });
  };

  _onSearchSubmit = (event) => {
    //console.log("[SearchBar] _onSearchSubmit()");
    this.setState({
      suggestions: [],
    });

    this.search(this.state.searchText);
  };

  _onTextInputTextChanged = (text) => {
    this.onSearchTextChanged(text);
  }

  _onTextInputFocused = () => {
    if (this.state.searchText === '') {
      this.setState({
        suggestions: (this.props.autocomplete === undefined || this.props.autocomplete) ? this.searchHistory : [],
        isSearchOrSignal: true,
        isEditing: true,
        signals: [],
      });
    } else {
      this.setState({
        isSearchOrSignal: true,
        isEditing: true,
        signals: [],
      });

      this.loadSuggestions(this.state.searchText);
    }
  }

  _onTextInputEditEnded = () => {
    this.setState({ isEditing: false, suggestions: [] });
  }

  _onDeleteTextInput = () => {
    this.searchTextInput.clear();
    this.onSearchTextChanged('');
  }

  onSearchTextChanged(text) {

    this.setState({
      searchText: text,
      searchUrl: text,
      isSearchOrSignal: true,
      signals: [],
    });

    this.loadSuggestions(text);
  }

  _onPressDeleteReason = (index) => {
    this.setState({
      showSignalDeleteModal: false,
    });

    this.arrSignals.splice(this.nSignalToDelete, 1)
  };


  render() {
    var searchTextInputValue = this.state.isSearchUrl ? this.state.searchUrl : this.state.searchText;
    //console.log("[SearchBar] render() -> searchTextInputValue: " + searchTextInputValue);

    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea, { zIndex: 100 }}>
        <View style={this.props.isIncognito ? { ...styles.searchBarWrapper, backgroundColor: 'black', } : styles.searchBarWrapper}>
          <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center' }}>
            <Autocomplete
              style={{ zIndex: 100 }}
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={styles.containerStyle}
              inputContainerStyle={this.props.isIncognito ? { ...styles.inputContainerStyle, backgroundColor: 'black' } : styles.inputContainerStyle}
              listContainerStyle={styles.listContainerStyle}
              listStyle={this.props.isIncognito ? { ...styles.listStyle, backgroundColor: 'lightgrey' } : styles.listStyle}
              data={this.state.isSearchOrSignal ? this.state.suggestions : this.state.signals}
              renderTextInput={() => (
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  {this.props.isIncognito ? (
                    <Image style={{ width: 24, height: 24, marginRight: 10, }} source={R.images.icon_incognito_white} />
                  ) : null}
                  <TextInput
                    ref={r => (this.searchTextInput = r)}
                    style={this.props.isIncognito ? { ...styles.textInput, color: 'white' } : styles.textInput}
                    placeholder='Search powered by Google'
                    placeholderTextColor='black'
                    multiline={false}
                    keyboardType='web-search'
                    returnKeyType='search'
                    onSubmitEditing={this._onSearchSubmit}
                    onChangeText={this._onTextInputTextChanged}
                    onFocus={this._onTextInputFocused}
                    selectTextOnFocus={true}
                    onEndEditing={this._onTextInputEditEnded}
                    value={this.state.isSearchUrl ? this.state.searchUrl : this.state.searchText}
                  />
                </View>
              )}
              renderItem={({ item, index }) => (
                this.state.isSearchOrSignal ? (

                  <TouchableOpacity id={index} style={styles.searchItemViewWrapper} onPress={() => {
                    this.setState({ searchText: item.searchKey, suggestions: [] });
                    this.search(item.searchKey);
                  }
                  }>
                    <Image style={styles.itemSearchImage} source={item.type == SEACH_SUGGESTION_FAVORITE ? R.images.icon_favorites_inactive : (item.isUrl ? R.images.icon_globe_black : R.images.icon_search_black)} />
                    <Text style={styles.itemSearchText}>{item.searchKey}</Text>
                    <Image style={styles.itemUpArrowImage} source={R.images.icon_uparrow_black} />
                    {/* {item.isSearched ? (
                      <Image style={styles.itemUpArrowImage} source={R.images.icon_uparrow_black} />
                    ) : null} */}
                  </TouchableOpacity>

                ) : (

                    <View id={index} style={styles.signalItemViewWrapper}>
                      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => {
                        //this.reset();

                        //if(this.props.onSearch != null) {
                        //    this.props.onSearch("https://www2.hm.com/en_ca/productpage.0875914001.html");
                        //}

                        if (this.props.onSignal != null) {
                          this.props.onSignal();
                        }
                      }
                      }>
                        <Text style={styles.itemSignalText}>{item.signalText}</Text>
                        <View style={item.isNew ? styles.newSignalViewWrapper : styles.oldSignalViewWrapper}>
                          <Text style={item.isNew ? styles.showNewSignalText : styles.hideNewSignalText}>New Offer!</Text>
                          <TouchableOpacity style={styles.itemDeleteWrapper} onPress={() => {
                            this.setState({ signals: [], showSignalDeleteModal: true, });
                            this.nSignalToDelete = index;
                          }
                          }>
                            <Image style={styles.itemDeleteImage} source={R.images.icon_close_white} />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
              )}
            />
          </View>
          {(this.state.isEditing && searchTextInputValue != '') ? (
            <TouchableOpacity style={styles.btnSearch} onPress={this._onDeleteTextInput}>
              {this.props.isIncognito ?
                <Image style={{ width: 22, height: 22, resizeMode: 'contain', }} source={R.images.icon_input_delete_white} />
                :
                <Image style={{ width: 22, height: 22, resizeMode: 'contain', }} source={R.images.icon_input_delete} />}
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={styles.btnSignal} onPress={this._onPressSignal} >
            <Image style={{ width: 24, height: 24, resizeMode: 'cover', }} source={R.images.icon_signal_white} />
          </TouchableOpacity>
          {(this.props.progressStep) ? (
            <View style={styles.progressBar}>
              <ProgressView progress={this.props.progressStep} progressTintColor="#648FEB" />
            </View>
          ) : null}

        </View>
        {this.state.showSignalDeleteModal ? (
          <SignalDeleteModal
            modalVisible={this.state.showSignalDeleteModal}
            pressHide={() => this.hideModal()}
            pressNotInterest={() => this._onPressDeleteReason(0)}
            pressAlreadyBought={() => this._onPressDeleteReason(1)}
            pressOtherReason={() => this._onPressDeleteReason(2)}
          />
        ) : null}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  //console.log("[searchBar] mapStateToProps -> currentScreen: " + state.currentScreen);

  return {
    arrayFavorite: state.BrowserReducer.arrayFavorite,
    arrayHistory: state.BrowserReducer.arrayHistory,
  };
}

export default connect(mapStateToProps, null)(SearchBar)