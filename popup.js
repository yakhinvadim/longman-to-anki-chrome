// send request to get dictionary entry
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        message: 'dictionaryEntry'
    }, function(response) {
        document.querySelector('#dictionary-entry').innerText = response.message;
        document.querySelector('.message__number').innerText = response.quantity;
        document.querySelector('.test-result').innerText = response.testResult;
    });
});

// initiate clipboard
var clipboard = new Clipboard('.copy-button');

// show message on success
clipboard.on('success', function(e) {
    document.querySelector('.copy-message').removeAttribute('hidden');
});
