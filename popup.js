window.handleMessage = function (request, _sender, _sendResponse) {
  if (request.from !== "background") {
    return;
  }

  if (request.subject !== "redirect") {
    return;
  }

  const urlElm = document.createElement("p");
  urlElm.textContent = request.url;
  document.body.appendChild(urlElm);

  const urlRedirectElm = document.createElement("p");
  urlRedirectElm.textContent = request.redirectUrl;
  document.body.appendChild(urlRedirectElm);
};

browser.runtime.onMessage.addListener(handleMessage);
