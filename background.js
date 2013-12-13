
// chrome.omnibox.setDefaultSuggestion({ description: "<url>tf</url> <dim>[</dim><url>shelveset</url> #<dim>]</dim>" })
// chrome.omnibox.setDefaultSuggestion({ description: "awesome" });

searches =
    [
        {
            prefix: "changeset ",
            description: "displays a changeset",
            pattern: /^(?:changeset\s+)?(C?\d+)/i,
            transform: "_versionControl/changeset/$1"
        },
        {
            prefix: "shelveset ;",
            description: "browse a user's shelveset",
            pattern: /^(?:shelveset\s+)?;(.*)/i,
            transform: "_versionControl/shelvesets#owner=$1"
        },
        {
            prefix: "shelveset ",
            description: "displays a shelveset",
            pattern: /^(?:shelveset\s+)?(.*)/i,
            transform: "_versionControl/shelveset/?ss=$1"
        }
    ];
    
chrome.omnibox.onInputChanged.addListener(function(text, suggest)
    {
        suggest(searches.map(function(search)
            {
                return {
                    content: search.prefix + text,
                    description: "<match>" + search.prefix + "</match>" + text + "<dim> - " + search.description + "</dim>"
                }
            }));
    });

function navigate(url)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: url});
    });
}

chrome.omnibox.onInputEntered.addListener(function(text)
    {
        if (!localStorage["baseUrl"])
        {
            navigate("options.html");
            return;
        }

        for (var i in searches)
        {
            var url = text.replace(searches[i].pattern, localStorage["baseUrl"] + searches[i].transform);
            if (url != text)
            {
                navigate(url);
                return;
            }
        }
        
        navigate(localStorage["baseUrl"]);
    });
