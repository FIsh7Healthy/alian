// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

// src-bex/my-content-script.js

// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks
import { bexContent } from 'quasar/wrappers'

const iFrame = document.createElement('iframe');
iFrame.id = 'bex-app-iframe'

// Assign some styling so it looks seamless
Object.assign(iFrame.style, {
  display: 'none',
  position : 'fixed',
  zIndex : '9999999',
  overflow : 'visible',
  borderRadius : '5px',
  backgroundColor : '#fff',
  boxShadow : '0 0 20px rgba(0,0,0,.3)',
  padding : '10px',
  border : '0',
})

iFrame.selectedText = "";
;(function () {
  // When the page loads, insert our browser extension app.
  iFrame.src = chrome.runtime.getURL('www/index.html#toolbar')
  document.body.prepend(iFrame)

  let startTime = Date.now();
  document.addEventListener("mousedown", function (event) {
    startTime = Date.now();
  });

  document.addEventListener("mouseup", function (evt) {
    iFrame.selectedText = window.getSelection().toString().trim();
    const endTime = Date.now();
    if (iFrame.selectedText.length > 1 && endTime - startTime > 10 && iFrame.style.display === "none") {
      iFrame.style.display = "block";
      iFrame.style.top = evt.clientY + 20 + 'px'
      iFrame.style.left = evt.clientX + 'px'
    } else {
      iFrame.style.display = "none";
    }
  });
})()

export default bexContent((bridge) => {
  bridge.on('wb.command', ({ data, respond }) => {
    const res = data.data
    if(res.action === 'setIframeSize') {
      iFrame.style.height = res.height + 'px';
      iFrame.style.width = res.width + 'px'
    }
    respond(iFrame.selectedText)
  })
})


