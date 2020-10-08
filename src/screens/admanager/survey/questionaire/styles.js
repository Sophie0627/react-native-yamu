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
    width: 20,
    height: 16,
  },
  imgClose: {
    marginRight: 20,
    width: 14,
    height: 14,
  },
  viewSurveyImage: {
    width: 333 * ratio,
    height: 333 * ratio,
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surveyImage: {
    width: 333 * ratio,
    height: 333 * ratio,
  },
  txtQuestionaire: {
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  viewQuestionaire: {
    width: 288 * ratio,
    height: 150,
    alignItems: 'center',
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
    shadowOpacity: 0.5
  },
  txtQuestionaire: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  viewResponds: {
    width: 248 * ratio,
    height: 56,
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgNot: {
    marginLeft: 10,
    marginRight: 10,
  },
  viewFooter: {
    width: '100%',
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(114,197,0,0.2)',
  },
  btnLaunch: {
    width: 250,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#72C500',
  },
  questionaireWrapper: {
    width: 250,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#72C500',
  },
});
