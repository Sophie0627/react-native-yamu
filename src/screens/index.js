import 'react-native-gesture-handler';

import * as React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';

// store
import configureStore from 'myredux/store';
const { store } = configureStore();

//Screens
import BrowserHome from 'screens/browser/home';
import BrowserView from 'screens/browser/view/normal';
import BrowserIncognitoView from 'screens/browser/view/incognito';
import BrowserOptions from 'screens/browser/options';

import Projects from 'screens/projects';
import Offers from 'screens/offers';
import Profile from 'screens/profile';

import AdManagerLoginWith from 'screens/admanager/loginwith'
import AdManagerLogin from 'screens/admanager/login'
import AdManagerSignup from 'screens/admanager/signup'
import AdManagerYamuAds from 'screens/admanager/yamuads'
import AdManagerYamuAds2 from 'screens/admanager/yamuads2'
import AdManagerOnboarding from 'screens/admanager/onboarding'
import AdManagerHome from 'screens/admanager/home'
import AdManagerShoppingAssistant from 'screens/admanager/shoppingassistant'
import AdManagerEcoCashback from 'screens/admanager/ecocashback'
import AdManagerYamuWidget from 'screens/admanager/yamuwidget'
import AdManagerWinkback from 'screens/admanager/winkback'
import AdManagerReachback from 'screens/admanager/reachback'
import AdManagerSurveyHome from 'screens/admanager/survey/home'
import AdManagerSurveyHot from 'screens/admanager/survey/hot'
import AdManagerSurveyQuestionaire from 'screens/admanager/survey/questionaire'
import AdManagerSurveyFinal from 'screens/admanager/survey/final'
import AdManagerBilling from 'screens/admanager/billing'

import R from 'res/R'

const BrowserStack = createStackNavigator();
const MainBottomTab = createBottomTabNavigator();

function MainBottomTabNavigator() {
  var ScreenWidth = Dimensions.get('window').width;
  var ScreenHeight = Dimensions.get('window').height;
  if (ScreenWidth < ScreenHeight) {
    return (
      <MainBottomTab.Navigator
        initialRouteName="BrowserHome"
        headerMode="none"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName, titleName;
            if (route.name === 'BrowserHome') {
              iconName = focused ? R.images.icon_tab_browser_active : R.images.icon_tab_browser_inactive;
              titleName = 'Browser'
            } else if (route.name === 'Projects') {
              iconName = focused ? R.images.icon_tab_projects_active : R.images.icon_tab_projects_inactive;
              titleName = 'Projects'
            } else if (route.name === 'Offers') {
              iconName = focused ? R.images.icon_tab_offers_active : R.images.icon_tab_offers_inactive;
              titleName = 'Offers'
            } else if (route.name === 'Profile') {
              iconName = focused ? R.images.icon_tab_profile_active : R.images.icon_tab_profile_inactive;
              titleName = 'Profile'
            }

            return <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ width: 30, height: 30, marginTop: 20, resizeMode: 'contain', }}
                source={iconName} />
              <Text style={{ fontSize: 10, marginTop: 2, marginBottom: 10, textAlign: 'center', width: 50 }}>{titleName}</Text>
            </View>;
          },
        })}

        tabBarOptions={{
          showLabel: false,
          style: { height: 64 * Dimensions.get('window').height / 667 }
        }}
      >
        <MainBottomTab.Screen name="BrowserHome" component={BrowserHome} />
        <MainBottomTab.Screen name="Projects" component={Projects} />
        <MainBottomTab.Screen name="Offers" component={Offers} />
        <MainBottomTab.Screen name="Profile" component={Profile} />
      </MainBottomTab.Navigator>
    );
  } else {
    return (
      <MainBottomTab.Navigator
        initialRouteName="BrowserHome"
        headerMode="none"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName, titleName;
            if (route.name === 'BrowserHome') {
              iconName = focused ? R.images.icon_tab_browser_active : R.images.icon_tab_browser_inactive;
              titleName = 'Browser'
            } else if (route.name === 'Projects') {
              iconName = focused ? R.images.icon_tab_projects_active : R.images.icon_tab_projects_inactive;
              titleName = 'Projects'
            } else if (route.name === 'Offers') {
              iconName = focused ? R.images.icon_tab_offers_active : R.images.icon_tab_offers_inactive;
              titleName = 'Offers'
            } else if (route.name === 'Profile') {
              iconName = focused ? R.images.icon_tab_profile_active : R.images.icon_tab_profile_inactive;
              titleName = 'Profile'
            }

            return <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ width: 30, height: 30, marginTop: 20, resizeMode: 'contain', }}
                source={iconName} />
              <Text style={{ fontSize: 10, marginTop: 2, marginBottom: 10, textAlign: 'center', width: 50 }}>{titleName}</Text>
            </View>;
          },
        })}

        tabBarOptions={{
          showLabel: false,
          style: { height: 64 * Dimensions.get('window').width / 667 }
        }}
      >
        <MainBottomTab.Screen name="BrowserHome" component={BrowserHome} />
        <MainBottomTab.Screen name="Projects" component={Projects} />
        <MainBottomTab.Screen name="Offers" component={Offers} />
        <MainBottomTab.Screen name="Profile" component={Profile} />
      </MainBottomTab.Navigator>
    );
  }

}

function BrowserStackNavigator() {
  return (
    <BrowserStack.Navigator
      initialRouteName="MainBottomTabNavigator"
      headerMode="none"
    >
      <BrowserStack.Screen name="MainBottomTabNavigator" component={MainBottomTabNavigator} />
      <BrowserStack.Screen name="BrowserView" component={BrowserView} />
      <BrowserStack.Screen name="BrowserIncognitoView" component={BrowserIncognitoView} />
      <BrowserStack.Screen name="BrowserOptions" component={BrowserOptions} />
      <BrowserStack.Screen name="AdManagerLoginWith" component={AdManagerLoginWith} />
      <BrowserStack.Screen name="AdManagerLogin" component={AdManagerLogin} />
      <BrowserStack.Screen name="AdManagerSignup" component={AdManagerSignup} />
      <BrowserStack.Screen name="AdManagerYamuAds" component={AdManagerYamuAds} />
      <BrowserStack.Screen name="AdManagerYamuAds2" component={AdManagerYamuAds2} />
      <BrowserStack.Screen name="AdManagerOnboarding" component={AdManagerOnboarding} />
      <BrowserStack.Screen name="AdManagerHome" component={AdManagerHome} />
      <BrowserStack.Screen name="AdManagerShoppingAssistant" component={AdManagerShoppingAssistant} />
      <BrowserStack.Screen name="AdManagerEcoCashback" component={AdManagerEcoCashback} />
      <BrowserStack.Screen name="AdManagerYamuWidget" component={AdManagerYamuWidget} />
      <BrowserStack.Screen name="AdManagerWinkback" component={AdManagerWinkback} />
      <BrowserStack.Screen name="AdManagerReachback" component={AdManagerReachback} />
      <BrowserStack.Screen name="AdManagerSurveyHome" component={AdManagerSurveyHome} />
      <BrowserStack.Screen name="AdManagerSurveyHot" component={AdManagerSurveyHot} />
      <BrowserStack.Screen name="AdManagerSurveyQuestionaire" component={AdManagerSurveyQuestionaire} />
      <BrowserStack.Screen name="AdManagerSurveyFinal" component={AdManagerSurveyFinal} />
      <BrowserStack.Screen name="AdManagerBilling" component={AdManagerBilling} />
    </BrowserStack.Navigator>
  );
}

class Screens extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hideMainBottomTabNavigator: false
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.onStoreChanged());
  }

  componentDidUpdate(prevProps) {
    //console.log("[Screens] componentDidUpdate -> hideMainBottomTabNavigator: " + this.props.hideMainBottomTabNavigator);
    if (this.props.hideMainBottomTabNavigator !== prevProps.hideMainBottomTabNavigator) {
      this.setState({
        hideMainBottomTabNavigator: this.props.hideMainBottomTabNavigator
      });
    }
  }

  onStoreChanged() {
    //console.log("[Screens] onStoreChanged -> currentScreen: " + screensStore.getState().currentScreen);

    /*let hideMainBottomTabNavigator = false;
    if(screensStore.getState().currentScreen === 'BrowserView') {
      hideMainBottomTabNavigator = true;
    }

    if(this.state.hideMainBottomTabNavigator != hideMainBottomTabNavigator) {
      this.setState({
        hideMainBottomTabNavigator: hideMainBottomTabNavigator
      });
    }*/
  }

  render() {
    return (
      <NavigationContainer>
        <BrowserStackNavigator />
      </NavigationContainer>
    );
  }
}

function mapStateToProps(state) {
  //console.log("[Screens] mapStateToProps -> currentScreen: " + state.currentScreen);

  return {
    hideMainBottomTabNavigator: state.currentScreen === 'BrowserHome' ? false : true
  }
}

export default connect(mapStateToProps)(Screens)