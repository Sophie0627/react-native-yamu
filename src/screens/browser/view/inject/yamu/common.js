export function jsIsPartnerDomain() {
    let jsCode = `
        function isPartnerDomain() {
            if (window.location.host.includes(".zara.com") || window.location.host.includes(".hm.com") || window.location.host.includes(".mango.com")) {
                return true;
            }

            return false;
        };
    `;

    return jsCode;
}

export function jsApplyPortrait() {
    let jsCode = `
        function applyPortrait() {
            var btnYamu = document.getElementbyId('');
            btnYamu.class = "portait";
        };
    `;

    return jsCode;
}

export function jsOnPortrait() {
    let jsCode = `
        applyPortrait();
    `;

    return jsCode;
}