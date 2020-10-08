import { StyleSheet, Dimensions } from "react-native";

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default StyleSheet.create({
  rootWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  homeHeader: {
    width: '100%',
    height: 70,
    backgroundColor: '#72C500',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    position: 'absolute',
    left: (win.width / 2) - 100,
    width: 200,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  imgBack: {
    marginLeft: 20,
    width: 13,
    height: 24,
  },
  adContent: {
    width: 350 * ratio,
    marginTop: 20,
    backgroundColor: 'white',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    alignItems: 'center',
  },
  adEarn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginLeft: 25,
    marginTop: 32,
    padding: 5,
    backgroundColor: '#72C500',
    alignItems: 'center',
    borderRadius: 5,
  },
  adImage: {
    width: 240 * ratio,
    height: 240 * ratio,
    backgroundColor: 'lightgray',
    marginTop: 10,
  },
  txtHot: {
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 40,
  },
});
