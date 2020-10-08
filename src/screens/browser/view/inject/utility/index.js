function injectWebViewJsForUtility() {

  let jsCode = `
      ${ jsPostPageTitle()} 
      // ${ jsOnScrolling()} 
      // ${ jsDetectScrolling()} 
      ${ jsInjectCodesForUtility()} 
    `;

  return jsCode;
}

function jsPostPageTitle() {
  let jsCode = `
        function postPageTitleToYamu() {
          const pageTitle = {
            title: window.location.hostname
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(pageTitle));
        }
    `;

  return jsCode;
}

function jsOnScrolling() {
  let jsCode = `
        var scrollPos = 0;
        function onScrolling() {
          var currentScrollPos = document.body.scrollTop;

          var scrollDirection = "up";
          if(currentScrollPos > scrollPos) {
            scrollDirection = "down";
          }

        }
    `;

  return jsCode;
}

function jsDetectScrolling() {
  let jsCode = `
        function detectScrolling() {
          window.addEventListener('scroll', onScrolling());
        }
    `;

  return jsCode;
}

function jsInjectCodesForUtility() {
  let jsCode = `  
        postPageTitleToYamu();
        
        // scroll
        // detectScrolling();
        // scrollPos = document.body.scrollTop;
    `;

  return jsCode;
}

export default injectWebViewJsForUtility;