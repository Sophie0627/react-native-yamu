export function jsShowYamuAssistant() {
    let jsCode = `
        function showYamuAssistantDiv() {
            var divAssistant = document.getElementById('divYamuAssistant');
            divAssistant.style.display = 'block';
        }
    `;

    return jsCode;
}

export function jsHideYamuAssistant() {
    let jsCode = `
        function hideYamuAssistantDiv() {
            var divAssistant = document.getElementById('divYamuAssistant');
            divAssistant.style.display = 'none';
        }
    `;

    return jsCode;
}

export function jsToggleYamuAssistant() {
    let jsCode = `
        function toggleYamuAssistantDiv() {
            var divAssistant = document.getElementById('divYamuAssistant');
            if(divAssistant.style.display === 'none') {
                showYamuAssistantDiv();
            } else {
                hideYamuAssistantDiv();
            }
        }
    `;

    return jsCode;
}

export function jsOnClickYamuAssistantShoppingTab() {
    let jsCode = `
        function onClickYamuAssistantShoppingTab() {
        if(!isPartnerDomain()) {
            return;
        }

        var tdShoppingTab = document.getElementById('tdYamuAssistantTabShopping');
        var divShopping = document.getElementById('divYamuAssistantShopping');

        var tdOffersTab = document.getElementById('tdYamuAssistantTabOffers');
        var divOffers = document.getElementById('divYamuAssistantOffers');

        if(!tdShoppingTab.classList.contains('active')) {

            // activate shopping tab
            tdShoppingTab.classList.remove('inactive');
            tdShoppingTab.classList.add('active');

            // show shopping div
            divShopping.style.display = 'block';

            // inactivate offers tab
            tdOffersTab.classList.remove('active');
            tdOffersTab.classList.add('inactive');

            // hide offers div
            divOffers.style.display = 'none';
        }
        }
    `;

    return jsCode;
}

export function jsOnClickYamuAssistantOffersTab() {
    let jsCode = `
        function onClickYamuAssistantOffersTab() {
        var tdShoppingTab = document.getElementById('tdYamuAssistantTabShopping');
        var divShopping = document.getElementById('divYamuAssistantShopping');

        var tdOffersTab = document.getElementById('tdYamuAssistantTabOffers');
        var divOffers = document.getElementById('divYamuAssistantOffers');

        var tableOffers = document.getElementById('tableYamuAssistantOffersItems');
        var divOffersSignUp = document.getElementById('divYamuAssistantOffersSignUp');

        if(!tdOffersTab.classList.contains('active')) {

            // activate offers tab
            tdOffersTab.classList.remove('inactive');
            tdOffersTab.classList.add('active');

            // show offers div
            divOffers.style.display = 'block';

            // show signup if not partner
            if (isPartnerDomain()) {
            divOffersSignUp.style.display = 'none';
            } else {
            divOffersSignUp.style.display = 'block';
            }

            // inactivate shopping tab
            tdShoppingTab.classList.remove('active');

            if (isPartnerDomain()) {
            tdShoppingTab.classList.add('inactive');
            } else {
            tdShoppingTab.classList.add('disabled');
            }

            // hide shopping div
            divShopping.style.display = 'none';
        }
        }
    `;

    return jsCode;
}

export function jsAddYamuAssistant() {
    let jsCode = `
      function addYamuAssistant() {
        var divYamuAssistant = document.getElementById('divYamuAssistant');
        if(divYamuAssistant == null) {

            var assistantHtml =
            "<div id='divYamuAssistant' style='display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:20000'>" +
            "  <style>" +
            "      #tableYamuAssistantTitleBar td {" +
            "          text-align: center;" +
            "          vertical-align: middle;" +
            "          border: 0;" +
            "      }" +
            "      #tableYamuAssistantTabBar td {" +
            "          width: 50%;" +
            "          padding: 0;" +
            "          text-align: center;" +
            "          vertical-align: middle;" +
            "          border: 0;" +
            "      }" +
            "      #tableYamuAssistantTabBar td.active {" +
            "          background: #72c500;" +
            "          color: white;" +
            "      }" +
            "      #tableYamuAssistantTabBar td.inactive {" +
            "          background: white;" +
            "          color: black;" +
            "      }" +
            "      #tableYamuAssistantTabBar td.disabled {" +
            "          background: #d3d3d3;" +
            "          color: #a9a9a9;" +
            "          cursor: not-allowed;" +
            "      }" +
            "      #tableYamuAssistantSuggestsItems td {" +
            "          width: 25%;" +
            "          position: relative;" +
            "          padding: 0;" +
            "          border: 0;" +
            "      }" +
            "      #tableYamuAssistantSuggestsItems td:after {" +
            "          content: '';" +
            "          display: block;" +
            "          margin-top: 100%;" +
            "      }" +
            "      #tableYamuAssistantSuggestsItems td div {" +
            "          position:absolute;" +
            "          top: 10px;" +
            "          bottom: 5px;" +
            "          background:#d8d8d8;" +
            "          border-radius:5px;" +
            "      }" +
            "      #tableYamuAssistantSuggestsItems td:first-child div {" +
            "          left: 15px;" +
            "          right: 0px;" +
            "      }" +
            "      #tableYamuAssistantSuggestsItems td:nth-child(2) div {" +
            "          left: 10px;" +
            "          right: 5px;" +
            "      }" +
            "      #tableYamuAssistantSuggestsItems td:nth-child(3) div {" +
            "          left: 5px;" +
            "          right: 10px;" +
            "      }" +
            "      #tableYamuAssistantSuggestsItems td:last-child div {" +
            "          left: 0px;" +
            "          right: 15px;" +
            "      }" +
            "      #tableYamuAssistantOffersItems td {" +
            "          width: 25%;" +
            "          position: relative;" +
            "          padding: 0;" +
            "          border: 0;" +
            "      }" +
            "      #tableYamuAssistantOffersItems td:after {" +
            "          content: '';" +
            "          display: block;" +
            "          margin-top: 100%;" +
            "      }" +
            "      #tableYamuAssistantOffersItems td > div {" +
            "          position:absolute;" +
            "          top: 10px;" +
            "          bottom: 5px;" +
            "          background:#d8d8d8;" +
            "          border-radius:1.5vw;" +
            "          vertical-align: bottom;" +
            "      }" +
            "      #tableYamuAssistantOffersItems td:first-child > div {" +
            "          left: 15px;" +
            "          right: 0px;" +
            "      }" +
            "      #tableYamuAssistantOffersItems td:nth-child(2) > div {" +
            "          left: 10px;" +
            "          right: 5px;" +
            "      }" +
            "      #tableYamuAssistantOffersItems td:nth-child(3) > div {" +
            "          left: 5px;" +
            "          right: 10px;" +
            "      }" +
            "      #tableYamuAssistantOffersItems td:last-child > div {" +
            "          left: 0px;" +
            "          right: 15px;" +
            "      }" +
            "      #tableYamuAssistantOffersItems td > div > div.link {" +
            "          position: absolute;" +
            "          left: 0;" +
            "          bottom: 0;" +
            "          background-color: black;" +
            "          width: 100%;" +
            "          height: 4.5vw;" +
            "          line-height: 4.2vw;" +
            "          text-align: center;" +
            "          border-bottom-left-radius:1.5vw;" +
            "          border-bottom-right-radius:1.5vw;" +
            "      }" +
            "      #tableYamuAssistantOffersItems td > div > div.link > a {" +
            "          color: white;" +
            "          font-size: 2.3vw;" +
            "          text-decoration: none;" +
            "      }" +
            "  </style>" +
            "  <table id='tableYamuAssistantTitleBar' style='width:100%;height:13vw;margin:0;background:black;color:white;border-collapse:collapse'>" +
            "      <tbody>" +
            "          <tr style='font-size:4vw;cursor:pointer'>" +
            "              <td style='width:10vw;padding:0;text-align:center;font-size:4.5vw' onclick='toggleYamuAssistantDiv()'>&lt;</td>" +
            "              <td style='padding:0;text-align:center'>YOUR YAMU ASSISTANT</td>" +
            "              <td style='width:10vw;padding:0;text-align:center'>" +
            "                  <div style='text-align:center;vertical-align:center;color:white;width:5vw;height:5vw;line-height:5.5vw;border:1px solid white;border-radius:50%;font-size:3.5vw;'>Y</div>" +
            "              </td>" +
            "          </tr>" +
            "      </tbody>" +
            "  </table>" +
            "  <table id='tableYamuAssistantTabBar' style='width:100%;height:8vw;margin:0;border-collapse:collapse'>" +
            "      <tbody>" +
            "          <tr style='font-size:3.2vw;cursor:pointer;'>" +
            "              <td id='tdYamuAssistantTabShopping' class='inactive' onclick='onClickYamuAssistantShoppingTab()'>SHOPPING ASSISTANT</td>" +
            "              <td id='tdYamuAssistantTabOffers' class='inactive' onclick='onClickYamuAssistantOffersTab()'>YAMU OFFERS&nbsp;&nbsp;&nbsp;&nbsp;4</td>" +
            "          </tr>" +
            "      </tbody>" +
            "  </table>" +
            "  <div id='divYamuAssistantShopping' style='display:none'>" +
            "      <div id='divYamuAssistantSuggestsTitle' style='display:inline-block;margin:15px 0px 1.2vw 15px;padding:10px 1.2vw;background:black;border-radius:1.25vw;color:white;font-size:12px;cursor:pointer'>" +
            "          <span>BASED ON YOUR SETTING WE SUGGESTS</span>" +
            "      </div>" +
            "      <div id='divYamuAssistantSuggestsMenu' style='display:block;margin:5px 0 1.2vw 15px'>" +
            "          <div id='divYamuAssitantSuggestsMenuXL' style='display:inline-block;margin:0;padding:10px 1.2vw;background:black;border-radius:1.25vw;color:white;font-size:10px;cursor:pointer'>" +
            "              <span>XL</span>" +
            "          </div>" +
            "          <div id='divYamuAssitantSuggestsMenuBlack' style='display:inline-block;margin:0 0 0 1.2vw;padding:10px 1.2vw;background:black;border-radius:1.25vw;color:white;font-size:10px;cursor:pointer'>" +
            "              <span>BLACK</span>" +
            "          </div>" +
            "          <div id='divYamuAssitantSuggestsMenuPrice' style='display:inline-block;margin:0 0 0 1.2vw;padding:10px 1.2vw;background:black;border-radius:1.25vw;color:white;font-size:10px;cursor:pointer'>" +
            "              <span>PRICE: 0 - 59&pound;</span>" +
            "          </div>" +
            "          <div id='divYamuAssitantSuggestsMenuSettings' style='display:inline-block;margin:0 0 0 1.2vw;padding:10px 1.2vw;border:1px solid white;border-radius:1.25vw;color:white;font-size:10px;cursor:pointer'>" +
            "              <span>Change Settings</span>" +
            "          </div>" +
            "      </div>" +
            "      <table id='tableYamuAssistantSuggestsItems' style='width:100%'>" +
            "          <tbody>" +
            "              <tr>" +
            "                  <td><div></div></td>" +
            "                  <td><div></div></td>" +
            "                  <td><div></div></td>" +
            "                  <td><div></div></td>" +
            "              </tr>" +
            "              <tr>" +
            "                  <td><div></div></td>" +
            "                  <td><div></div></td>" +
            "                  <td><div></div></td>" +
            "                  <td><div></div></td>" +
            "              </tr>" +
            "          </tbody>" +
            "      </table>" +
            "  </div>" +
            "  <div id='divYamuAssistantOffers' style='display:none; align-items: center;'>" +
            "      <table id='tableYamuAssistantOffersItems' style='width:100%; margin-top: 6vw;'>" +
            "          <tbody>" +
            "              <tr>" +
            "                  <td><div><div class='link'><a href='http://www.asos.com'>Asos</a></div></div></td>" +
            "                  <td><div><div class='link'><a href='http://www.primark.com'>Primark</a></div></div></td>" +
            "                  <td><div><div class='link'><a href='http://www.zara.com/uk/'>Zara</a></div></div></td>" +
            "                  <td><div><div class='link'><a href='http://www.cosstores.com'>COS</a></div></div></td>" +
            "              </tr>" +
            "          </tbody>" +
            "      </table>" +
            "      <div id='divYamuAssistantOffersSignUp' style='display:none;width:90vm; margin: 6vw 5vw 5vw 5vw; padding: 20px; font-size:2.8vw;color white;text-align:center; background-color: white; border-radius: 3vw;'>" +
            "          <p style='margin:5px 0'>Companies we need your love!</p>" +
            "          <p>Join free today and help support local social impact<br/>projects that matter to your customers.</p>" +
            "          <button onclick='goToSignUp()' style='margin:2.5vw 0;width:23vw;height:7vw;line-height:7.5vw;background:#72c500;color:white;font-size:3vw;border:none;border-radius:1.2vw'>SIGN UP</button>" +
            "      </div>" +
            "  </div>" +
            "</div>";

            var templateYamuAssistant = document.createElement('template');
            templateYamuAssistant.innerHTML = assistantHtml;

            var bodyTag = document.body;
            bodyTag.appendChild(templateYamuAssistant.content.firstChild);
            }

          // initialize assistant
          if(!isPartnerDomain()) {
            onClickYamuAssistantOffersTab();
  
            // disable shopping offers tab
            var tdShoppingTab = document.getElementById('tdYamuAssistantTabShopping');
            tdShoppingTab.disabled = true;
          } else {
            onClickYamuAssistantShoppingTab();
          }
      }
      
      function goToSignUp() {
        window.ReactNativeWebView.postMessage(JSON.stringify('signup-click'))
      }

    `;

    return jsCode;
}