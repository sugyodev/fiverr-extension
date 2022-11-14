chrome.runtime.onMessage.addListener(function (response) {
    if (response.event !== 'close') {
        return;
    }
    closeCurrentTab();
});

function closeCurrentTab() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.remove(tabs[0].id);
    });
}

