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
    marginTop: 20,
    width: 13,
    height: 24,
  },
  imgYamuLogo: {
    alignSelf: 'center',
    marginTop: 50,
    width: 110,
    height: 110,
  },
  txtTitle: {
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 18,
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
  btnRegister: {
    width: 270 * ratio,
    height: 40,
    marginTop: 20,
    backgroundColor: '#1D1D1B',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnTitle: {
    color: 'white',
  },
  btnSocialWrapper: {
    flexDirection: 'row',
    width: 270 * ratio,
    height: 40,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 6,
  },
});
