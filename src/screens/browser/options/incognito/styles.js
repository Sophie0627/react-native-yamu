import { StyleSheet, Dimensions } from "react-native";

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#979797',
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 35,
    marginBottom: 35,
  },
  contentText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    marginLeft: 30,
    marginRight: 30,
  },
  footerWrapper: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'black',
    backgroundColor: '#979797'
  },
  footerText: {
    fontSize: 14,
    color: 'black',
  },
  gridList: {
    flex: 1,
    backgroundColor: '#979797',
  },
  gridItem: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#D8D8D8',
    borderWidth: 1,
  },
  gridEmptyItem: {
    flex: 1,
    height: 220 * ratio,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  gridItemHeader: {
    flexDirection: 'row',
    height: 30 * ratio,
    backgroundColor: '#F1F1F1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    marginLeft: 8,
  },
  gridItemContent: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});