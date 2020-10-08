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
  },
  headerTitle: {
    position: 'absolute',
    left: (win.width / 2) - 100,
    width: 200,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  providerItem: {
    flexDirection: 'row',
    height: 40,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  providerItemText: {
    flex: 1,
    marginLeft: 10,
  },
  providerItemArrow: {
    marginRight: 12,
  },
  manualDescrption: {
    marginLeft: 12,
    marginTop: 20,
  },
  btnDownload: {
    width: 200,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#72C500',
    marginTop: 24,
    marginBottom: 18,
  },
  viewUpload: {
    width: 100,
    height: 100,
    marginTop: 24,
    marginBottom: 30,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewFooter: {
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(114,197,0,0.2)',
  },
  btnLaunch: {
    width: 250,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#72C500',
  },
  imgUpload: {
    width: 30,
    height: 30,
  },
  failedText: {
    color: '#FF4600',
    textAlign: 'center',
    marginTop: 20,
  },
  failedImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4600',
  },
  successText: {
    color: '#72C500',
    textAlign: 'center',
    marginTop: 20,
  },
  successImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#72C500',
  },
  viewUploadCatalog: {
    height: 40,
    backgroundColor: '#72C500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtUploadCatalog: {
    color: 'white',
    fontSize: 14,
  },
  viewUploadContainer: {
    backgroundColor: 'rgba(114,197,0,0.2)',
  },
});
