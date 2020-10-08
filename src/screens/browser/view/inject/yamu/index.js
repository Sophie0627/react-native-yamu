import { jsIsPartnerDomain } from './common';
import { jsOnYamuGotItClicked, jsOnYamuHeartClicked, jsAddYamuMainMenu } from './menu';
import { jsShowYamuAssistant, jsHideYamuAssistant, jsToggleYamuAssistant, jsOnClickYamuAssistantShoppingTab, jsOnClickYamuAssistantOffersTab, jsAddYamuAssistant } from './assistant';

function injectWebViewJsForYamu() {

  let jsCode = `
    ${ jsIsPartnerDomain() } 
    ${ jsOnYamuGotItClicked() } 
    ${ jsOnYamuHeartClicked() }
    ${ jsAddYamuMainMenu() }
    ${ jsShowYamuAssistant() }
    ${ jsHideYamuAssistant() }
    ${ jsToggleYamuAssistant() }
    ${ jsOnClickYamuAssistantShoppingTab() }
    ${ jsOnClickYamuAssistantOffersTab() }
    ${ jsAddYamuAssistant() }
    ${ jsAddYamuUI() }
    ${ jsOnYamuMessage() }
    ${ jsAddYamuMessageHandler() }
    ${ jsInjectCodesForYamu() }
  `;

  return jsCode;
}

function jsAddYamuUI() {
  let jsCode = `
    function addYamuUI() {
      
      var divYamuAssistant = document.getElementById('divYamuAssistant');
      if(divYamuAssistant != null) {
        return;
      }

      var body = document.body;
      if(body == null) {
        setTimeout(addYamuUI, 100);
      } else {
        addYamuMainMenu();
        addYamuAssistant();
      }
    }
  `;

  return jsCode;
}

function jsOnYamuMessage() {
  let jsCode = `
    function onYamuMessage(event) {
      //console.log("[onYamuMessage] message: " + event.data);

      if(event.data == "showYamuAssist") {
        showYamuAssistantDiv();
      }
    }
  `;

  return jsCode;
}

function jsAddYamuMessageHandler() {
  let jsCode = `
    function addYamuMessageHandler(data) {
      window.removeEventListener("message", onYamuMessage);
      window.addEventListener("message", onYamuMessage);
    }
  `;

  return jsCode;
}

function jsInjectCodesForYamu() {
  let jsCode = `
    function injectCodesForYamu() {
      addYamuInterval = setTimeout(addYamuUI, 100);
      addYamuMessageHandler();
    };

    injectCodesForYamu();
  `;

  return jsCode;
}

export default injectWebViewJsForYamu;