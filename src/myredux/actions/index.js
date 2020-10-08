import * as ActionTypes from '../actiontypes';

export const setSkipOnboarding = (bool) => {
    return {
        type: ActionTypes.SKIP_ONBOARDING,
        payload: bool
    }
};

export const navigateToScreen = (screen) => {
    return {
        type: ActionTypes.NAVIGATE_TO_SCREEN,
        payload: screen
    }
};

export const setBrowserFavorites = (arrayFavorite) => {
    return {
        type: ActionTypes.BROWSER_FAVORITES,
        payload: arrayFavorite
    }
};

export const setBrowserHistorys = (arrayHistory) => {
    return {
        type: ActionTypes.BROWSER_HISTORYS,
        payload: arrayHistory
    }
};

export const setBrowserIncognitoTabs = (arrayIncognitoTab) => {
    return {
        type: ActionTypes.BROWSER_INCOGNITO_TABS,
        payload: arrayIncognitoTab
    }
};

export const setBrowserTabs = (arrayTab) => {
    return {
        type: ActionTypes.BROWSER_TABS,
        payload: arrayTab
    }
};

export const setBrowserSettingsSearchRegion = (searchRegion) => {
    return {
        type: ActionTypes.BROWSER_SETTINGS_SEARCHREGION,
        payload: searchRegion
    }
};

export const setBrowserSettingsSafeSearch = (safeSearch) => {
    return {
        type: ActionTypes.BROWSER_SETTINGS_SAFESEARCH,
        payload: safeSearch
    }
};

export const setBrowserSettingsAutocomplete = (autocomplete) => {
    return {
        type: ActionTypes.BROWSER_SETTINGS_AUTOCOMPLETE,
        payload: autocomplete
    }
};