import React, { Component } from 'react';
import {
  ScrollView,
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import R from 'res/R'

const win = Dimensions.get('window');
const ratio = win.width / 375;

export default class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedHeartIndex: 0,
      limitArray : [],
      textValue : '£50 per month',
      heartArray : [[
        {count: 5, p: 5, },
        {count: 10, p: 10, },
        {count: 20, p: 20, },
      ], [
        {count: 40, p: 40, },
        {count: 80, p: 80, },
        {count: 160, p: 160, },
      ]],
    }
    this.mScroll = null;
  }

  _onPressDown = () => {
    if (this.state.limitArray.length > 0) {
      this.setState({
        limitArray: [],
      })
    } else {
      this.setState({
        limitArray: [
          {title: '£50 per month', },
          {title: '£100 per month', },
          {title: '£200 per month', },
          {title: '£400 per month', },
          {title: '£800 per month', },
        ],
      })
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

  _onPressHeartItem = (index) => {
    this.setState({
      selectedHeartIndex: index,
    })
  }

  renderHeartItem = (item, pageIndex, heartIndex) => {
    return (
      <TouchableOpacity style={this.state.selectedHeartIndex == (pageIndex*3)+(heartIndex+1)-1 ? styles.selectedHeartItem : styles.heartItem} onPress={this._onPressHeartItem.bind(this, (pageIndex*3)+(heartIndex+1)-1)}>
        <View style={styles.itemHeader}>
          <View>
            <View>
              <Image style={{ width: 38, height: 32, }} source={R.images.icon_heart_white}/>
              <View style={styles.viewHeartCount}>
                <Image style={{ width: 34, height: 28, }} source={R.images.icon_heart_full}/>
              </View>
              <View style={styles.viewHeartCount}>
                <Text style={styles.txtHeartCount}>{item[heartIndex].count}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.txtHeartP}>{item[heartIndex].p}p</Text>
        </View>
        <View style={this.state.selectedHeartIndex == (pageIndex*3)+(heartIndex+1)-1 ? styles.selectedItemFooter : styles.itemFooter}>
          <Text style={this.state.selectedHeartIndex == (pageIndex*3)+(heartIndex+1)-1 ? styles.selectedItemPriceText : styles.itemPriceText}>per{'\n'}Assistant{'\n'}visit</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderHeartItems = (item, pageIndex) => {
    return (
      <View style={styles.itemsWrapper}>
        <View style={{flex: 1,}}></View>
        {this.renderHeartItem(item, pageIndex, 0)}
        <View style={{flex: 1,}}></View>
        {this.renderHeartItem(item, pageIndex, 1)}
        <View style={{flex: 1,}}></View>
        {this.renderHeartItem(item, pageIndex, 2)}
        <View style={{flex: 1,}}></View>
      </View>
    )
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.textTitle}>Upgrade to full hearts!</Text>
              <TouchableOpacity style={styles.btnClose} onPress={this.props.pressHide}>
                <Image style={{ width: 20, height: 20, alignSelf: 'flex-end', right: 10, top: 10, }} source={R.images.icon_close_white} />
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>Empower customer loyalty{'\n'}to support their eco projects</Text>
              <View style={styles.scrollWrapper}>
                <ScrollView
                  horizontal={true}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={this._onMomentumScrollEnd}
                  ref={r => (this.mScroll = r)}
                >
                  {this.state.heartArray.map((item, pageIndex) => this.renderHeartItems(item, pageIndex))}
                </ScrollView>
              </View>
              <View style={styles.dotWrapper}>
                <View style={this.state.selectedIndex == 0 ? styles.activeDot : styles.inactiveDot}></View>
                <View style={this.state.selectedIndex == 1 ? styles.activeDot : styles.inactiveDot}></View>
              </View>
              <Text style={styles.txtBudget}>Total budget limit</Text>
              <Autocomplete
                style={{ zIndex: 100 }} 
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                listContainerStyle={styles.listContainerStyle}
                listStyle={styles.listStyle}
                data={this.state.limitArray}
                renderTextInput={() => (
                  <View style={styles.inputWrapper}>
                    <TextInput editable={false} style={styles.textInput} value={this.state.textValue}>
                    </TextInput>
                    <TouchableOpacity style={{alignSelf: 'center', marginRight: 12,}} onPress={this._onPressDown}>
                      <Image style={styles.imgDown} source={R.images.icon_downarrow_fullblack} />
                    </TouchableOpacity>
                  </View>
                )}
                renderItem={({ item, index }) => (
                    <TouchableOpacity id={index} style={styles.dropdownItem} onPress={() => {
                        this.setState({ textValue: item.title, limitArray: [] });
                      }
                    }>
                      <Text style={{marginLeft: 10,}}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                }
              />
              <TouchableOpacity style={styles.btnAdd} onPress={this.props.pressAdd}>
                <Text style={{color: 'white'}}>Add hearts!</Text>
              </TouchableOpacity>
            </View>
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
  contentWrapper: {
    width: 320 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
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
  contentTitle: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  heartItem: {
    width: 70*ratio,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#FF4600',
    overflow: 'hidden',
  },
  selectedHeartItem: {
    width: 70*ratio,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#72C500',
    overflow: 'hidden',
  },
  itemHeader: {
    flex: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 2,
    marginLeft: 2,
    marginRight: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#FF4600',
  },
  itemFooter: {
    flex: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8D8D8',
  },
  selectedItemFooter: {
    flex: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#72C500',
  },
  itemPriceText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  selectedItemPriceText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  txtBudget: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  btnAdd: {
    width: 135,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#72C500',
    marginTop: 20,
    marginBottom: 34,
  },
  scrollWrapper: {
    width: '100%',
    height: 120,
  },
  itemsWrapper: {
    width: 320 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  viewHeartCount: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtHeartCount: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 2,
  },
  txtHeartP: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: 5,
  },
  dotWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#72C500',
    margin: 10,
  },
  inactiveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'black',
    margin: 10,
  },
  containerStyle: {
    alignSelf: 'center',
    width: 254 * ratio,
    backgroundColor: '#DEF2C1',
    borderRadius: 8,
  },
  inputContainerStyle: {
    borderWidth: 0,
    height: 40,
  },
  listContainerStyle: {
  },
  listStyle: {
    borderRadius: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
    alignSelf: 'center',
    color: 'black',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
  },
  imgDown: {
    width: 12,
    height: 10,
  },
  dropdownItem: {
    height: 40,
    justifyContent: 'center',
  },
});

