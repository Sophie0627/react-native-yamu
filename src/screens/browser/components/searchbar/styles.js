import { StyleSheet, Dimensions } from "react-native";

const win = Dimensions.get('window');

export default StyleSheet.create({
  searchBarWrapper: {
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    borderColor: '#72C500',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: '#F2F8E6',
    zIndex: 100,
  },
  containerStyle: {
    backgroundColor: 'white'
  },
  inputContainerStyle: {
    borderWidth: 0,
    backgroundColor: '#F2F8E6'
  },
  listContainerStyle: {
  },
  listStyle: {
    // width: '100%',
    marginLeft: -13,
    marginRight: -43,
    marginTop: 5,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'white',
  },
  searchItemViewWrapper: {
    flexDirection: 'row',
    height: 40,
    // marginRight: -23,
    alignItems: 'center',
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1
  },
  signalItemViewWrapper: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1,
    backgroundColor: '#72C500'
  },
  itemSearchImage: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginRight: 10,
    resizeMode: 'contain',
  },
  itemUpArrowImage: {
    width: 12,
    height: 12,
    marginLeft: 5,
    marginRight: 10,
    resizeMode: 'contain',
  },
  itemSearchText: {
    flex: 1,
    fontSize: 15,
    color: 'black',
  },
  itemSignalText: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    color: 'white'
  },
  newSignalViewWrapper: {
    height: 38,
    flexDirection: 'row',
    backgroundColor: 'rgba(82,141,1,0.5)',
    alignItems: 'center',
    color: 'white',
  },
  oldSignalViewWrapper: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#72C500',
  },
  showNewSignalText: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white',
  },
  hideNewSignalText: {
    marginLeft: 10,
    marginRight: 10,
    color: '#72C500',
  },
  itemDeleteWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDeleteImage: {
    width: 33,
    height: 13,
  },
  btnSearch: {
    alignSelf: 'center',
    marginRight: 20,
    // paddingRight: 50,
  },
  btnSignal: {
    width: 42,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#72C500',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  progressBar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: win.width,
    height: win.height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    color: 'black',
    height: 32,
    marginRight: 5
  },
});
