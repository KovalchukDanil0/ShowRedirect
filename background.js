importScripts(
  "./node_modules/webextension-polyfill/dist/browser-polyfill.min.js"
);

const data = {};

const onBeforeRedirect = function (responseDetails) {
  if (!data.hasOwnProperty(responseDetails.tabId)) {
    data[responseDetails.tabId] = [responseDetails.url];
  }
  data[responseDetails.tabId].push(responseDetails.redirectUrl);
};

browser.webRequest.onBeforeRedirect.addListener(onBeforeRedirect, {
  urls: ["<all_urls>"],
});

const activeTabUpdated = function (tabId, _changeInfo, _tabInfo) {
  if (data.hasOwnProperty(tabId)) {
    browser.action.setBadgeText({ text: "302", tabId });
  }
};

browser.tabs.onUpdated.addListener(activeTabUpdated);

const onTabActivated = function (activeInfo) {
  delete data[activeInfo.tabId];
  browser.action.setBadgeText({ text: "" });
};

browser.tabs.onActivated.addListener(onTabActivated);

const handleMessage = function (request, _sender, sendResponse) {
  if (request.from !== "popup") {
    return;
  }

  if (data.hasOwnProperty(request.tabId)) {
    sendResponse(data[request.tabId]);
  }
};

browser.runtime.onMessage.addListener(handleMessage);
