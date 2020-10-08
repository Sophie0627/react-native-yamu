import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  settingItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftText: {
    position: 'absolute',
    left: 0,
    color: 'black',
    fontSize: 12,
    marginLeft: 12,
  },
  rightArrow: {
    position: 'absolute',
    right: 0,
    color: 'black',
    marginRight: 12,
  },
  footerWrapper: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  footerText: {
    fontSize: 14,
    color: 'black',
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: '#F1F1F1',
  },
});