import { StyleSheet, Dimensions } from "react-native";

const win = Dimensions.get('window');

export default StyleSheet.create({
  rootWrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 15
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 20,
    marginVertical: 15,
  },
  titleLeft: {
    width: 100,
    alignSelf: 'flex-start'
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  titleTextDisabled: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'lightgray'
  },
  titleMenu: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    width: 100,
    paddingRight: 12
  },
  titleTop: {
    flexDirection: 'row',
    width: '100%',
    height: 20,
    textAlign: 'center',
    // marginVertical: 15,
  },
  progressStyle: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    position: 'absolute',
    bottom: 1,
  },
  webview: {
    flex: 1,
    width: '100%',
    marginTop: 5
  },
  webviewError: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 12,
    justifyContent: "center"
  },
  webviewErrorLogo: {
    width: 64,
    height: 64,
    alignSelf: 'center',
  },
  webviewErrorTitle: {
    width: "100%",
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  webviewErrorDescription: {
    width: "100%",
    textAlign: 'center'
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuBarItem: {
  },
  menuBarItemYamuAssist: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15
  },
  menuBarItemYamuAssistDisabled: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 15
  }
});
