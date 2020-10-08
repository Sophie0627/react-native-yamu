import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
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
  historyItem: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#F1F1F1',
    borderTopWidth: 1,
  },
  headerItem: {
    height: 50,
    lineHeight: 50,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 18,
  },
});