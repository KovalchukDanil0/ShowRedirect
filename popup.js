window.addRedirects = function (redirects) {
  if (redirects === undefined) {
    return;
  }

  const container = document.querySelector("#container");

  for (let index = 0; index < redirects.length; index++) {
    let messageText = "302";
    switch (index) {
      case redirects.length - 1:
        messageText = "First Page";
        break;
      case 0:
        messageText = "Current URL";
        break;
    }

    const url = redirects[index];
    container.insertAdjacentHTML(
      "afterbegin",
      `<article class="message is-small">
        <div class="message-header">
            <p>${messageText}</p>
        </div>
        <div class="message-body">
            ${url}
        </div>
    </article>`
    );
  }
};

(async function Main() {
  const tabId = (
    await browser.tabs.query({ currentWindow: true, active: true })
  )[0].id;

  const redirects = await browser.runtime.sendMessage({
    from: "popup",
    tabId,
  });
  addRedirects(redirects);
})();
