import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewImage: {
    width: 188,
    height: 188,
    backgroundColor: '#D8D8D8',
    borderRadius: 94,
    alignSelf: 'center',
    marginTop: 80,
  },
  txtTitle: {
    alignSelf: 'center',
    fontSize: 18,
    textAlign: 'center',
  },
  btnNext: {
    width: 200,
    height: 40,
    marginTop: 42,
    backgroundColor: '#72C500',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnTitle: {
    color: 'white',
  },
  scrollWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  dotWrapper: {
    flexDirection: 'row',
    marginTop: 45,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#72C500',
    margin: 8,
  },
  inactiveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'black',
    margin: 8,
  },
});
