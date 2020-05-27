/**
 * grab the active tab
 * slap a click event on each button
 * message the content script with the button id
 */
function addBtnListeners() {
  let btns = document.getElementsByTagName("button");
  getActiveTab().then((tabs) => {
      for (let btn of btns) {
        btn.addEventListener("click", (e) => {
            browser.tabs.sendMessage(tabs[0].id, {msg: e.target.id})
            .catch(catchError);
        });
      }
  });
}

/**
 * get the active tab
 * return it
 */
function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
  }

/**
 * .catch err's abstracted out to here
 */
function catchError(err) {
    console.error(`🔥${err}🔥"`);
}

/**
 * inject the 'content.js' content script
 * at the very start
 */
browser.tabs.executeScript({ file: "js/content.js" })
.then(addBtnListeners)
.catch(catchError);
