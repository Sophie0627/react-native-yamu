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
  favoriteItem: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'grey',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
