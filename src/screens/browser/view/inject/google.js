export function injectWebViewJsForGoogle() {
  let jsCode = `
    ${ jsRemoveGoogleTitleAndSearchBar() }
    ${ jsInjectCodesForGoogle() }
  `;

  return jsCode;
}

function jsRemoveGoogleTitleAndSearchBar() {
  let jsCode = `
    function removeGoogleTitleAndSearchBar() {

      // title bar
      var divTitleBar = document.getElementById('qslc');
      if(divTitleBar != null) {
        divTitleBar.style.display = 'none';
      }

      // menu
      var divMenu = document.getElementById('navd');
      if(divMenu != null) {
        divMenu.style.display = 'none';
      }

      // search bar
      var divSearchBar = document.getElementById('sfcnt');
      if(divSearchBar != null) {
        divSearchBar.style.display = 'none';
      }

      var body = document.body;
      if(body == null || divTitleBar == null || divMenu == null || divSearchBar == null) {
        setTimeout(removeGoogleTitleAndSearchBar, 100);
      }
    };
  `;
  
  return jsCode;
}

function jsInjectCodesForGoogle() {
  let jsCode = `
    function injectCodesForGoogle() {
      removeGoogleTitleAndSearchBar();
    };

    injectCodesForGoogle();
  `;

  return jsCode;
}

export function injectWebViewJsForGoogleResult() {
  let jsCode = `
    ${ jsAddYamuGoogleResult() }
    ${ jsInjectCodesForGoogleResult() }
  `;

  return jsCode;
}

function jsAddYamuGoogleResult() {
  let jsCode = `
    function addYamuGoogleResult() {
      var sites = document.querySelectorAll("div#rso div.mnr-c.xpd.O9g5cc.uUPGi");
      for (var i = 0; i < sites.length; i++) {
        var isApproved = false;

        // append yamu icon
        var aTags = sites[i].querySelectorAll("a.C8nzq.BmP5tf");
        if (aTags.length > 0) {
          var pathArray = aTags[0].href.split( '/' );
          var protocol = pathArray[0]; //https:
          var host = pathArray[2]; //shop.mango.com
          var url = protocol + '//' + host; // https://shop.mango.com
          if (host.includes(".zara.com") || host.includes(".hm.com") || host.includes(".mango.com")) {
            isApproved = true;

            sites[i].style.position = "relative";
            sites[i].innerHTML += "<img width='24' height='24' style='position:absolute; z-index:9999; right:10px; top:10px;' src='data:image/png;base64,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'/>";
          }
        }

        // append % of cashback
        if(isApproved) {
          var divTags = sites[i].querySelectorAll("div.BmP5tf");
          if(divTags.length > 0) {
            var pTags = divTags[0].getElementsByTagName("P");
            if(pTags.length == 0) {
              divTags[0].innerHTML += "<p style='margin:10px 0 5px 0;color:#72c500'>Earn up to 5% cashback with Yamu!</p>";
            }
          }
        }
      }
    };
  `;

  return jsCode;
}

function jsInjectCodesForGoogleResult() {
  let jsCode = `
    function injectCodesForGoogleResult() {
      addYamuGoogleResult();
    };

    injectCodesForGoogleResult();
  `;

  return jsCode;
}