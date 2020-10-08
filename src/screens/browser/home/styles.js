import { StyleSheet, Dimensions } from "react-native";

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default StyleSheet.create({
  rootViewWrapper: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  imageBrowserLogo: {
    width: 122 * ratio,
    height: 122 * ratio,
    alignSelf: 'center',
  },
  howWorkViewWrapper: {
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 12,
  },
  imageInfo: {
    width: 356 * ratio,
    height: 40 * ratio,
    marginLeft: 12,
    resizeMode: 'contain',
  },
  illustrationViewWrapper: {
    width: win.width,
    height: 160 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1'
  },
});
