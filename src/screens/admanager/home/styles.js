import { StyleSheet, Dimensions } from "react-native";

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default StyleSheet.create({
  rootScrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeHeader: {
    width: '100%',
    height: 70,
    backgroundColor: '#72C500',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imgBack: {
    marginLeft: 20,
    width: 13,
    height: 24,
    display: 'none',
  },
  headerTitle: {
    position: 'absolute',
    left: (win.width / 2) - 100,
    width: 200,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    height: 40,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  menuItemText: {
    flex: 1,
    marginLeft: 10,
  },
  menuItemArrow: {
    marginRight: 12,
    width: 13,
    height: 24,
  },
  campaignItem: {
    flexDirection: 'row',
    height: 80,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  campaignHeader: {
    width: 64,
    height: 64,
    marginLeft: 12,
    backgroundColor: '#D8D8D8'
  },
  campaignContent: {
    flex: 1,
    width: 64,
    height: 64,
    marginLeft: 8,
    marginRight: 8,
    flexDirection: 'column',
  },
  campaignText: {
    flex: 1,
  },
  campaignFooterButton: {
    height:64,
    marginRight: 15,
  },
});
