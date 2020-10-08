import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'grey',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'grey',
    fontWeight: '200',
    paddingBottom: 20
  }
});
