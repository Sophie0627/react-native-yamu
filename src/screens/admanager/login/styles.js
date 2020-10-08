import { StyleSheet, Dimensions } from "react-native";

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgBack: {
    marginLeft: 20,
    width: 13,
    height: 24,
  },
  btnLogin: {
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
  txtForgot: {
    textDecorationLine: 'underline',
    marginTop: 15,
    alignSelf: 'center',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#72C500',
    alignItems: 'center',
  },
  headerTitle: {
    position: 'absolute',
    left: win.width / 2 - 100,
    width: 200,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});
