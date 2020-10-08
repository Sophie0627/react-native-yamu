import { StyleSheet, Dimensions } from "react-native";

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default StyleSheet.create({
  rootWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleBar: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#72C500',
  },
  titleText: {
    fontSize: 14,
    color: 'white',
    marginTop: 16,
    marginBottom: 16,
  },
  tabBarWrapper: {
    flexDirection: 'row',
    width: 350 * ratio,
    height: 40,
    backgroundColor: '#F1F1F1',
    marginBottom: 12,
    borderRadius: 10,
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seperator: {
    width: 1,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: '#D8D8D8',
  },
  tabsView: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    width: 24,
    height: 24,
  },
  bodyWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  moreText: {
    fontSize: 36,
    marginTop: -5,
  },

});
