$(function($) {
    // get data required for dictionary entry

    function getExample(exampleNumber) {
        return $('.EXAMPLE').eq(exampleNumber).text().trim();
    }

    function getForm(exampleNumber) {
        var lexUnit = $('.EXAMPLE').eq(exampleNumber).parent().prevAll('h2').children('.LEXUNIT').text().trim() +
            $('.EXAMPLE').eq(exampleNumber).parent().prevAll('strong').text().trim();
        var phrasalVerb = $('.EXAMPLE').eq(exampleNumber).parents('.PhrVbEntry').find('.phrvbhwdsel').text().trim();
        if (lexUnit.length != 0 && phrasalVerb != 0) {
            return lexUnit + '<br>' + phrasalVerb;
        } else
            return lexUnit + phrasalVerb;
    }

    function getTerm() {
        return $('.HWD').text().trim();
    }

    function getGeography(exampleNumber) {
        return $('.EXAMPLE').eq(exampleNumber).parent().prevAll('.GEO').text().trim();
    }

    function getUsage(exampleNumber) {
        return $('.EXAMPLE').eq(exampleNumber).parent().prevAll('.REGISTERLAB').text().trim();
    }

    function getDefinition(exampleNumber) {
        return $('.EXAMPLE').eq(exampleNumber).parent().prevAll('ftdef').children('.DEF').text().trim() +
            $('.EXAMPLE').eq(exampleNumber).parent().parent().prevAll('ftdef').children('.DEF').text().trim();
    }


    // compose Card and DictionaryEntry

    function composeCard(exampleNumber) {
        var example = '<span class="example">' + getExample(exampleNumber) + '</span><br><br>';
        var form = getForm(exampleNumber).length ? '<span class="form">' + getForm(exampleNumber) + '</span><br><br>' : '';
        var term = '<span class="term">' + getTerm() + '</span>';
        var geography = getGeography(exampleNumber).length ? '<span class="term">' + getGeography(exampleNumber) + '</span> ' : '';
        var usage = getUsage(exampleNumber).length ? '<span class="usage">' + getUsage(exampleNumber) + '</span><br>' : '';
        var definition = '<span class="definition">' + getDefinition(exampleNumber) + '</span>';

        return (example + form + term + ';' + geography + usage + definition + '\r\n');
    }

    function composeDictionaryEntry() {
        var dictionaryEntry = '';

        for (i = 0; i < $('.EXAMPLE').length; i++) {
            dictionaryEntry += composeCard(i);
        };

        return dictionaryEntry;
    }


    // send dictionary entry in response to request

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.message == "dictionaryEntry")
                sendResponse({
                    message: composeDictionaryEntry(),
                    quantity: $('.EXAMPLE').length
                });
        });
});
