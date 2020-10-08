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
  },
  headerTitle: {
    position: 'absolute',
    left: (win.width / 2) - 100,
    width: 200,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  viewMenu: {
    height: 40,
    backgroundColor: 'rgba(114,197,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCountry: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
  },
  viewMethod: {
    height: 58,
    justifyContent: 'center',
  },
  viewUrl: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewFooter: {
    height: 78,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(114,197,0,0.2)',
  },
  btnApply: {
    width: 250,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#72C500',
  },
});
