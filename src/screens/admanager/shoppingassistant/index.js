import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

import GlobalStyles from 'constants/globalstyles';
import styles from './styles';
import R from 'res/R';

import ApiModal from './components/apimodal';
import GiveHeartModal from './components/giveheartmodal';
import UpdateModal from './components/updatemodal';
import ShopifyApiModal from './components/shopifyapimodal';

export default class AdManangerShoppingAssistant extends Component {
  constructor(props) {
    super(props);
    this.providerArray = [
      {title: 'Select your e-commerce provider', isSeperator: true, },
      {title: 'Google', isSeperator: false, },
      {title: 'Shopify', isSeperator: false, },
      {title: 'BigCommerce', isSeperator: false, },
      {title: 'Channable', isSeperator: false, },
    ]

    this.state = {
      showApiModal: false,
      showShopifyApiModal: false,
      showGiveHeartModal: false,
      showUpdateModal: false,
      uploadStatus: 0,
    };
  }

  _onPressBack = () => {
    this.props.navigation.goBack();
  }

  _onPressProviderItem = (index) => {
    if (index == 1) {
      this.setState({
        showApiModal: true,
      })
    } else if (index == 2) {
      this.setState({
        showShopifyApiModal: true,
      })
    }
  }

  _onPressDownload = () => {
    this.setState({
      uploadStatus: this.state.uploadStatus == 0 ? 1 : this.state.uploadStatus == 1 ? 2 : 0,
    });
  }

  _onPressLaunch = () => {
    this.setState({
      showUpdateModal: true,
    })
  }

  hideModal = () => {
    this.setState({
      showApiModal: false,
      showShopifyApiModal: false,
      showGiveHeartModal: false,
      showUpdateModal: false,
    });
  };
  
  _onPressGoogle = () => {
    this.setState({
      showApiModal: false,
    });
  };

  _onPressGive = () => {
    this.setState({
      showGiveHeartModal: false,
    });
  };

  _onPressAdd = () => {
    this.setState({
      showUpdateModal: false,
    });
  };

  renderProviderItem = (item, index) => {
    if (item.title !== 'Upload your catalogue manually' && item.isSeperator) {
      return (
        <View style={{...styles.providerItem, borderBottomWidth: 0, backgroundColor: 'rgba(114,197,0,0.2)'}}>
          <Text style={{...styles.providerItemText, fontWeight: 'bold',}}>{item.title}</Text>
        </View>
      )
    } else if (item.title === 'Upload your catalogue manually' && item.isSeperator) {
      return (
        <View style={{...styles.providerItem, borderBottomWidth: 0, backgroundColor: 'rgba(114,197,0,0.2)'}}>
          <Text style={{...styles.providerItemText, fontWeight: 'bold', textAlign: 'center',}}>{item.title}</Text>
        </View>
      )
    } else {
      return (
        <TouchableOpacity style={styles.providerItem} onPress={this._onPressProviderItem.bind(this, index)}>
          <Text style={styles.providerItemText}>{item.title}</Text>
          <Image style={styles.providerItemArrow} width={13} height= {24} source={R.images.icon_rightarrow_black} />
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.homeHeader}>
          <TouchableOpacity onPress={this._onPressBack}>
            <Image style={styles.imgBack} width={13} height= {24} source={R.images.icon_leftarrow_black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Assistant</Text>
        </View>
        <ScrollView style={styles.rootScrollView}>
          <View>
            {this.providerArray.map((item, index) => this.renderProviderItem(item, index))}
            <View style={styles.viewUploadCatalog}>
              <Text style={styles.txtUploadCatalog}>Upload your catalogue manually</Text>
            </View>
            <View style={styles.viewUploadContainer}>
              <Text style={styles.manualDescrption}>1. Download our template{'\n'}2. Add your products{'\n'}3. Upload the filled in template</Text>
              <TouchableOpacity style={styles.btnDownload} onPress={this._onPressDownload}>
                <Text style={{color: 'white'}}>DOWNLOAD TEMPLATE</Text>
              </TouchableOpacity>
            </View>
            {this.state.uploadStatus == 0 ? (
              <View style={{alignItems: 'center',}}>
                <Text style={{marginTop: 20,}}>Upload spreadsheet here</Text>
                <View style={styles.viewUpload}>
                    <Image style={styles.imgUpload} source={R.images.icon_upload_black} />
                </View>
              </View>
            ) : this.state.uploadStatus == 1 ? (
              <View style={{alignItems: 'center',}}>
                <Text style={styles.failedText}>Please check your document and try again!</Text>
                <View style={styles.viewUpload}>
                  <View style={styles.failedImage}>
                    <Image style={{width: 60, height: 60,}} source={R.images.icon_close_red} />
                  </View>
                </View>
              </View>
            ) : this.state.uploadStatus == 2 ? (
              <View style={{alignItems: 'center',}}>
                <Text style={styles.successText}>Spread sheet successfully uploaded!</Text>
                <View style={styles.viewUpload}>
                  <View style={styles.successImage}>
                  <Image style={{width: 60, height: 60,}} source={R.images.icon_success_green} />
                  </View>
                </View>
              </View>
            ): null}
            <View style={styles.viewFooter}>
              <TouchableOpacity style={styles.btnLaunch} onPress={this._onPressLaunch}>
                <Text style={{color: 'white'}}>Launch your shopping assistant</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {this.state.showApiModal ? (
          <ApiModal
            modalVisible={this.state.showApiModal}
            pressHide={() => this.hideModal()}
            pressGoogle={() => this._onPressGoogle()}
          />
        ) : null}
        {this.state.showGiveHeartModal ? (
          <GiveHeartModal
            modalVisible={this.state.showGiveHeartModal}
            pressHide={() => this.hideModal()}
            pressGive={() => this._onPressGive()}
          />
        ) : null}
        {this.state.showShopifyApiModal ? (
          <ShopifyApiModal
            modalVisible={this.state.showShopifyApiModal}
            pressHide={() => this.hideModal()}
            pressGive={() => this._onPressGive()}
          />
        ) : null}
        {this.state.showUpdateModal ? (
          <UpdateModal
            modalVisible={this.state.showUpdateModal}
            pressHide={() => this.hideModal()}
            pressAdd={() => this._onPressAdd()}
          />
        ) : null}
      </SafeAreaView>
    );
  }
}