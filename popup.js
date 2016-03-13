// send request to get dictionary entry
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        message: "dictionaryEntry"
    }, function(response) {
        document.querySelector('#content').innerText = response.message;
    });
});
