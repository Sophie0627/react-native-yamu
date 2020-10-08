import React, { Component } from 'react';
import {
  Platform,
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import R from 'res/R'

import Orientation from 'react-native-orientation';

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default class HowWorksModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      orientation: ''
    }
    this.mScroll = null;
  }

  getOrientation = () => {
    // if (this.refs.rootView) {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.setState({ orientation: 'portrait' });
    }
    else {
      this.setState({ orientation: 'landscape' });
    }
    // }
  }

  componentDidMount() {
    Orientation.unlockAllOrientations();

    this.getOrientation();

    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout
    }
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });


    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  _onPressNext = () => {
    if (this.state.selectedIndex == 3) {
      this.props.pressHide()
    } else {
      var interval = 320 * ratio;
      var scrollTo = (this.state.selectedIndex + 1) * interval;
      this.mScroll.scrollTo({ x: scrollTo, y: 0, animated: true });
    }
  }

  _onMomentumScrollEnd = (e) => {
    // console.log(state)
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    this.setState({
      selectedIndex: pageNum,
    })
  }

  render() {
    return (
      (this.state.orientation == 'portrait') ? (
        <Modal
          animationType="fade"
          transparent={true}
          supportedOrientations={['portrait', 'landscape']}
          visible={this.props.modalVisible}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.textTitle}>This is how it works</Text>
                <TouchableOpacity style={styles.btnClose} onPress={this.props.pressHide}>
                  <Image style={{ width: 20, height: 20, alignSelf: 'flex-end', right: 10, top: 10, }} source={R.images.icon_close_white} />
                </TouchableOpacity>
              </View>
              <View style={styles.scrollWrapper}>
                <ScrollView
                  style={styles.scrollView}
                  horizontal={true} pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={this._onMomentumScrollEnd}
                  ref={r => (this.mScroll = r)}
                >
                  <View style={styles.slideView}>
                    <Text style={styles.slideText}>Text1 : Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                  </View>
                  <View style={styles.slideView}>
                    <Text style={styles.slideText}>Text2 : Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                  </View>
                  <View style={styles.slideView}>
                    <Text style={styles.slideText}>Text3 : Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                  </View>
                  <View style={styles.slideView}>
                    <Text style={styles.slideText}>Text4 : Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                  </View>
                </ScrollView>
                <View style={styles.dotWrapper}>
                  <View style={this.state.selectedIndex == 0 ? styles.activeDot : styles.inactiveDot}></View>
                  <View style={this.state.selectedIndex == 1 ? styles.activeDot : styles.inactiveDot}></View>
                  <View style={this.state.selectedIndex == 2 ? styles.activeDot : styles.inactiveDot}></View>
                  <View style={this.state.selectedIndex == 3 ? styles.activeDot : styles.inactiveDot}></View>
                </View>
              </View>
              <TouchableOpacity style={styles.btnNext} onPress={this._onPressNext}>
                <Text style={styles.textNext}>{this.state.selectedIndex == 3 ? 'Done' : 'Next'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>)
        : <Modal
          animationType="fade"
          transparent={true}
          supportedOrientations={['portrait', 'landscape']}
          visible={this.props.modalVisible}>
          <View style={styles.modalWrapperLandscape}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.textTitle}>This is how it works</Text>
                <TouchableOpacity style={styles.btnClose} onPress={this.props.pressHide}>
                  <Image style={{ width: 20, height: 20, alignSelf: 'flex-end', right: 10, top: 10, }} source={R.images.icon_close_white} />
                </TouchableOpacity>
              </View>
              <View style={styles.scrollWrapper}>
                <ScrollView
                  style={styles.scrollView}
                  horizontal={true} pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={this._onMomentumScrollEnd}
                  ref={r => (this.mScroll = r)}
                >
                  <View style={styles.slideView}>
                    <Text style={styles.slideText}>Text1 : Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                  </View>
                  <View style={styles.slideView}>
                    <Text style={styles.slideText}>Text2 : Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                  </View>
                  <View style={styles.slideView}>
                    <Text style={styles.slideText}>Text3 : Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                  </View>
                  <View style={styles.slideView}>
                    <Text style={styles.slideText}>Text4 : Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                  </View>
                </ScrollView>
                <View style={styles.dotWrapper}>
                  <View style={this.state.selectedIndex == 0 ? styles.activeDot : styles.inactiveDot}></View>
                  <View style={this.state.selectedIndex == 1 ? styles.activeDot : styles.inactiveDot}></View>
                  <View style={this.state.selectedIndex == 2 ? styles.activeDot : styles.inactiveDot}></View>
                  <View style={this.state.selectedIndex == 3 ? styles.activeDot : styles.inactiveDot}></View>
                </View>
              </View>
              <TouchableOpacity style={styles.btnNext} onPress={this._onPressNext}>
                <Text style={styles.textNext}>{this.state.selectedIndex == 3 ? 'Done' : 'Next'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalWrapper: {
    width: win.width,
    height: win.height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalWrapperLandscape: {
    width: win.height,
    height: win.width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: 320 * ratio,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    width: 320 * ratio,
    height: 60,
    backgroundColor: '#72C500',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollWrapper: {
    width: 320 * ratio,
  },
  scrollView: {
  },
  slideView: {
    width: 320 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideText: {
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 48,
    marginRight: 48,
    textAlign: 'center',
  },
  dotWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 30,
  },
  activeDot: {
    backgroundColor: '#72C500',
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: 8
  },
  inactiveDot: {
    backgroundColor: '#D8D8D8',
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: 8
  },
  textTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnClose: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 40,
  },
  btnNext: {
    backgroundColor: '#72C500',
    width: 120,
    marginBottom: 30,
    borderRadius: 5,
    alignItems: 'center'
  },
  textNext: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 12,
    paddingBottom: 12,
    color: 'white',
  },
});

