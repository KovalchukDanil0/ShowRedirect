importScripts(
  "./node_modules/webextension-polyfill/dist/browser-polyfill.min.js"
);

const data = { data: ["jj", "kk", "ll"] };

const sendResponse = function (responseDetails) {
  console.log(responseDetails.url);
  console.log(responseDetails.redirectUrl);

  data[responseDetails.url] = responseDetails.url;
  data[responseDetails.url].push(responseDetails.redirectUrl);
  console.log(data);

  browser.runtime.sendMessage({
    from: "background",
    subject: "redirect",
    url: responseDetails.url,
    redirectUrl: responseDetails.redirectUrl,
  });
};

browser.webRequest.onBeforeRedirect.addListener(sendResponse, {
  urls: ["<all_urls>"],
});
