import * as ActionTypes from '../actiontypes';
import FavoriteModel from 'models/favoritemodel';

const initialState = {
  arrayFavorite: [],
  arrayHistory: [],
  arrayIncognitoTab: [],
  arrayTab: [],
  searchRegion: '',
  safeSearch: '',
  autocomplete: true,
};

export default (state = initialState, action) =>  {

  switch (action.type) {
    case ActionTypes.BROWSER_FAVORITES:
      return {
        ...state,
        arrayFavorite: action.payload
      };
    case ActionTypes.BROWSER_HISTORYS:
      return {
        ...state,
        arrayHistory: action.payload
      };
    case ActionTypes.BROWSER_INCOGNITO_TABS:
      return {
        ...state,
        arrayIncognitoTab: action.payload
      };
    case ActionTypes.BROWSER_TABS:
      return {
        ...state,
        arrayTab: action.payload
      };
    case ActionTypes.BROWSER_SETTINGS_SEARCHREGION:
      return {
        ...state,
        searchRegion: action.payload
      };
    case ActionTypes.BROWSER_SETTINGS_SAFESEARCH:
      return {
        ...state,
        safeSearch: action.payload
      };
    case ActionTypes.BROWSER_SETTINGS_AUTOCOMPLETE:
      return {
        ...state,
        autocomplete: action.payload
      };
    default:
      return state;
  }
}
