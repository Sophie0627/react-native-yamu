import { StyleSheet, Dimensions } from "react-native";

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#72C500',
    alignItems: 'center',
  },
  viewLogout: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
    padding: 5,
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 8,
  },
  imgBack: {
    marginLeft: 20,
    width: 13,
    height: 24,
  },
  headerTitle: {
    position: 'absolute',
    left: win.width / 2 - 100,
    width: 200,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  greenDot: {
    backgroundColor: '#72C500',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dashLine: {
    alignSelf: 'center',
    backgroundColor: '#D8D8D8',
    width: 30,
    height: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  emptyDot: {
    borderColor: '#72C500',
    borderWidth: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  btnStart: {
    width: 270 * ratio,
    height: 40,
    marginTop: 10,
    backgroundColor: '#72C500',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnTitle: {
    color: 'white',
  },
  textInput: {
    width: 270 * ratio,
    height: 40,
    backgroundColor: '#F1F1F1',
    alignSelf: 'center',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
  },
  txtTitle: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#1D1D1B'
  },
});
