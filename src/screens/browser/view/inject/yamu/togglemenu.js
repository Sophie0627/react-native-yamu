export function injectYamuToggleMenu(scrollDirection) {
    let jsCode;
    if (scrollDirection == 'up') {
        jsCode = `
            var btnYamu = document.getElementById("divYamuMenu");
            btnYamu.style.display = "inline-block";
        `
    } else {
        jsCode = `
            var btnYamu = document.getElementById("divYamuMenu");
            btnYamu.style.display = "none";
        `
    }

    return jsCode;
}

export default injectYamuToggleMenu;