import * as React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

export function jsOnYamuGotItClicked() {
    let jsCode = `
        function onYamuGotItClicked() {
            var wrapperTag = document.getElementById("yamu-menu-background-wrapper");
            wrapperTag.style.display = 'none';
            var heartIcon = document.getElementById("heart-icon");
            heartIcon.style.filter = 'grayscale(100%)';
            gotHeart = true;
        };
    `;

    return jsCode;
}

export function jsOnYamuHeartClicked() {
    let jsCode = `
        var gotHeart = false;
        function onYamukHeartClicked() {
            if (!gotHeart) {
                var wrapperTag = document.getElementById("yamu-menu-background-wrapper");
                wrapperTag.style.display = (wrapperTag.style.display === 'flex') ? 'none' : 'flex';
            }
        };
    `;

    return jsCode;
}

export function jsAddYamuMainMenu() {
    let jsCode = `
        function addYamuMainMenu() {
            var divYamuMenu = document.getElementById('divYamuMenu');
            if(divYamuMenu == null) {

                var companyName = '';
                if (window.location.host.includes(".zara.com"))
                    companyName = 'Zara';
                if (window.location.host.includes(".hm.com"))
                    companyName = 'H&M';
                if (window.location.host.includes(".mango.com"))
                    companyName = 'Mango';

                var cssAnimation = document.createElement('style');
                cssAnimation.type = 'text/css';
                var rules = document.createTextNode('@keyframes slider {'+
                                                    '0%   {filter: grayscale(0%);}' +
                                                    '50%  {filter: grayscale(100%);}' +
                                                    '100% {filter: grayscale(0%);}' +
                                                    '}');
                cssAnimation.appendChild(rules);
                document.getElementsByTagName("head")[0].appendChild(cssAnimation);

                var bodyTag = document.body;
                var w = window.innerWidth/4;
                var h = window.innerHeight/12;
                var t = window.innerHeight/2 - h/2;
                bodyTag.style.position = "relative";
                
                var menuHtml = "<div id='divYamuMenu' style='z-index:20001'>";

                menuHtml += 
                    "<div id='yamu-menu-background-wrapper' onclick='onClickYamuBackground()' style='position:fixed; top:0; width:100vw; height:100vh; background-color: transparent; z-index: 9998; display: none; align-items: center; justify-content: center;'>" +
                    " <div id='yamu-menu-heart-collect' onclick='onYamuHeartClicked(event)' style='background-color: transparent; position: relative; display: flex; align-items: center; justify-content: center;'>" +
                    "   <div style='display: inline-block; background-color: black; text-align:center; padding: 15px; padding-top: 30px; border-radius:10px; opacity: 0.8'>" +
                    "     <p style='color: red; display: inline-block; margin: 0;'>"+companyName+" gave you 50 hearts!</p>" +
                    "     <br>" +
                    "     <p style='color: red; display: inline-block; margin: 0; margin: 5px 0;'>Use hearts to fund projects.</p>" +
                    "     <br>" +
                    "     <div onclick='onYamuGotItClicked()' style='display: inline-block; border-radius:10px; border: 1px solid red; margin-top: 10px;'>" +
                    "       <p style='display: inline-block; margin: 3px 15px; color: red;'>GOT IT</p>" +
                    "     </div>" +
                    "   </div>" +
                    "   <div style='position:absolute; left:0; right:0; top: -21px'>" +
                    "     <img width='50' height='42' style='animation-name: slider; animation-duration: 1s; animation-iteration-count: infinite; margin: 0 auto; display: block;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAqCAYAAADxughHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMqADAAQAAAABAAAAKgAAAAAlW3PoAAAECklEQVRoBdVZTUhUURT+7qSNhAupoCRIbBPUIqwUCmpRqRUWSbXoxyAKF4JBUUm0rugHLdpEWEZYQT8YZpJaLYoIIZAWBW0MooggSigq03x95848efPmzvjmzbPmXXjec88595zvm3Pv+7kqpGlWNYpproRCFcawjHIBZcX+DywMsH/CUZ/qwUvKvhvzLGK8SgZYyXhl7KdwbLH/hQieU+qlLHk+sjc2AZXUGHg6lcd41TNIJMkhWfGYAE4w0cNkU2oN86xh/CP0WJXaK25R/CmBi7yOMs8Xt38SEWsttnHKeTrOcDt7GHcginp1D5/T+VobMBPDGlRtOj+jTTG2wj71ADec9gQiJLGTJK7SIUHvnOBB/sTZW/mrPTX5sgorWIVbtM0y2T3qZJ3sIpl2238cMElsJIk7NOTZxix6WdvbmajDGYM5apnjOnUFTr1PeZQ5NjNHp8zXRKxNKMIPvOW4yGdQ07RRKmtVL7rEaFWhhp0QC+KHkpDShjANpeouhmIb+ScOUhkkCUkigG9yKS2WS+S4jl1grQgx7FDxjSfVKAwsfGKgQQ6l8qWJ6sBG33mDKc3Db6xjyMkiIWjnBQbZHKhQOMjSqjDbQ6RVKI/wVlgeIshmqGOoiHD1LjBbQ6QlB1la0RBBTgU1KkSGU1lDpB+WPfI+RIDNUMlB9sgbszVEWnKQijwLEWQzVHKQivSZrSHSysedwOW70CtWJpy3YYXX/GRYKHctaZdjXSj/auwxIlF+rSl8DR0NwSzY2TQR1YlvlFtCSKQ5jj1GRBMoxmn28sodljaI2Thjg7X3CNQVffTSaBtyvo+gUWOOAx0nImN+/3Zzr5zLeRIKZzVWB9AEIlpfgkPs+x0+uSb2owSH3aD0c8St5OfvXH51DfDZIgd1udMUD+amooznZu/coJIrQg/tqFBHUY4tc6VZXPZ1JhIC0EhEDPH90iByTjSFBve+cOJKSUSc+Oi/wF+hyTnhv8jEoLGkSZ6WiMxjgFMkczxNjMk1MbfGMEEW42Y3zeFJYTP1+022SdS18KTygJf4E1bEDqIDxpbZv7gByMZu8kpCMHquiE2IldlBuY1Xvq0LuB9hvN0kcS2TuBkTkeA8VV/NU/XbFIM+Lx7ifXQL706PMiEhvp6XljOwTpSPJazngFOflSyxGNMPCcnri4hMVPf5plyM5STTKuOsmsRgLB3TZyBfS8udK/6fLvl3XaZLTZZSI6vQ7o6Z6TgQIpLUqsEcjOASX2qqPYFQ6OFS2qO68MGT/wROgRGx8/AgYy/lkylfOOXFD/pJnf2StJOy971HHDESRD6FW/mGOp97Rw4FnM8ceTa0iU37JMzKfhB4RZyQrPVYilFWR1oeq9CNF057kPJfqz3fOAp6CJ0AAAAASUVORK5CYII='/>" +
                    "   </div>" +
                    " </div>" +
                    "</div>";

                menuHtml +=
                    "<div id='yamu-menu-base-container' style='width:26vw;height:16vw;position:fixed;left:0px;top:"+t+"px;z-index:9999;display:flex;flex-direction:row;z-index:20001'>" + 
                    " <div id='y-container' style='width:13vw; height:15vw; background-color:black; display:flex; align-items:center; justify-content:center;' onclick='toggleYamuAssistantDiv()'>" +
                    "   <span style='text-align:center;vertical-align:middle;color:white;width:7vw;height:7vw;line-height:8vw;border:1px solid white;border-radius:50%;font-size:5vw;'>Y</span>" +
                    " </div>" +
                    "</div>";

                menuHtml += "</div>";

                var templateYamuMenu = document.createElement('template');
                templateYamuMenu.innerHTML = menuHtml;

                bodyTag.appendChild(templateYamuMenu.content.firstChild);
            }

            if (isPartnerDomain()) {
                var baseContainer = document.getElementById("yamu-menu-base-container");
                var divYamuMenuHeart = document.getElementById('yamu-menu-heart-container');
                if(divYamuMenuHeart == null) {
                    baseContainer.innerHTML +=
                        " <div id='yamu-menu-heart-container' onclick='onYamukHeartClicked()' style='width:13vw; height:15vw; background-color:green; display:flex; align-items:center; justify-content:center; border-radius:0px 2vw 2vw 0px;'>" +
                        "   <img id='heart-icon' width='"+w/4+"' height='"+w/4+"' style='filter: grayscale(0%);' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAqCAYAAADxughHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMqADAAQAAAABAAAAKgAAAAAlW3PoAAAECklEQVRoBdVZTUhUURT+7qSNhAupoCRIbBPUIqwUCmpRqRUWSbXoxyAKF4JBUUm0rugHLdpEWEZYQT8YZpJaLYoIIZAWBW0MooggSigq03x95848efPmzvjmzbPmXXjec88595zvm3Pv+7kqpGlWNYpproRCFcawjHIBZcX+DywMsH/CUZ/qwUvKvhvzLGK8SgZYyXhl7KdwbLH/hQieU+qlLHk+sjc2AZXUGHg6lcd41TNIJMkhWfGYAE4w0cNkU2oN86xh/CP0WJXaK25R/CmBi7yOMs8Xt38SEWsttnHKeTrOcDt7GHcginp1D5/T+VobMBPDGlRtOj+jTTG2wj71ADec9gQiJLGTJK7SIUHvnOBB/sTZW/mrPTX5sgorWIVbtM0y2T3qZJ3sIpl2238cMElsJIk7NOTZxix6WdvbmajDGYM5apnjOnUFTr1PeZQ5NjNHp8zXRKxNKMIPvOW4yGdQ07RRKmtVL7rEaFWhhp0QC+KHkpDShjANpeouhmIb+ScOUhkkCUkigG9yKS2WS+S4jl1grQgx7FDxjSfVKAwsfGKgQQ6l8qWJ6sBG33mDKc3Db6xjyMkiIWjnBQbZHKhQOMjSqjDbQ6RVKI/wVlgeIshmqGOoiHD1LjBbQ6QlB1la0RBBTgU1KkSGU1lDpB+WPfI+RIDNUMlB9sgbszVEWnKQijwLEWQzVHKQivSZrSHSysedwOW70CtWJpy3YYXX/GRYKHctaZdjXSj/auwxIlF+rSl8DR0NwSzY2TQR1YlvlFtCSKQ5jj1GRBMoxmn28sodljaI2Thjg7X3CNQVffTSaBtyvo+gUWOOAx0nImN+/3Zzr5zLeRIKZzVWB9AEIlpfgkPs+x0+uSb2owSH3aD0c8St5OfvXH51DfDZIgd1udMUD+amooznZu/coJIrQg/tqFBHUY4tc6VZXPZ1JhIC0EhEDPH90iByTjSFBve+cOJKSUSc+Oi/wF+hyTnhv8jEoLGkSZ6WiMxjgFMkczxNjMk1MbfGMEEW42Y3zeFJYTP1+022SdS18KTygJf4E1bEDqIDxpbZv7gByMZu8kpCMHquiE2IldlBuY1Xvq0LuB9hvN0kcS2TuBkTkeA8VV/NU/XbFIM+Lx7ifXQL706PMiEhvp6XljOwTpSPJazngFOflSyxGNMPCcnri4hMVPf5plyM5STTKuOsmsRgLB3TZyBfS8udK/6fLvl3XaZLTZZSI6vQ7o6Z6TgQIpLUqsEcjOASX2qqPYFQ6OFS2qO68MGT/wROgRGx8/AgYy/lkylfOOXFD/pJnf2StJOy971HHDESRD6FW/mGOp97Rw4FnM8ceTa0iU37JMzKfhB4RZyQrPVYilFWR1oeq9CNF057kPJfqz3fOAp6CJ0AAAAASUVORK5CYII='/>" +
                        " </div>";
                }
            }
        }
    `;

    return jsCode;
}