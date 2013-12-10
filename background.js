chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest([
      {content: text + " one", description: "the first one"},
      {content: text + " number two", description: "the second entry"}
    ]);
});

function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}

chrome.omnibox.onInputEntered.addListener(function(text) {
    var baseUrl = localStorage["baseUrl"];
    if (!baseUrl)
    {
        alert("Set base URL in extension options!");
        return;
    }

    navigate(baseUrl + "_versionControl/changeset/" + text);
});
