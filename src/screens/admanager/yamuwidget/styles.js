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
  viewCode: {
    width: 268 * ratio,
    height: 140,
    alignSelf: 'center',
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  textCode: {
    height: '100%',
    color: '#979797',
  },
  chartContainer: {
    width: 200,
    height: 210,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  chartWrapper: {
    width: 144,
    height: 144,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieChart: {
    width: 132,
    height: 132,
  },
  yamuWrapper: {
    width: 200,
    height: 44,
    backgroundColor: '#72C500',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  button: {
    width: 268 * ratio,
    height: 44,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#72C500',
    marginTop: 20,
  },
});
