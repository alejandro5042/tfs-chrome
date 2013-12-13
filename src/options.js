$(document).ready(function() {

    var statusTimer = null;
    
    function flash(text, color)
    {
        $("#status").css('color', color);
        $("#status").html(text);
        
        clearTimeout(statusTimer);
        statusTimer = setTimeout(function() { $("#status").html(""); }, 750);
    }

    function save_options()
    {
        url = $("#baseUrl").val();
        
        // Add a trailing slash.
        url = url.replace(/\/?$/, '/');
        
        if (validateURL(url))
        {
            localStorage["baseUrl"] = url;
            flash("Options saved!", "#080");
            
            // Make sure we reload it to ensure the user sees what he actually saved.
            restore_options();
        }
        else
        {
            flash("Invalid URL", "#800");
        }
    }

    function restore_options()
    {
        $("#baseUrl").val(localStorage["baseUrl"]);
    }
    
    function validateURL(url)
    {
        var validator = new RegExp( "^((http|https|ftp)\://)?([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
        return validator.test(url);
    }
    
    function setup_page()
    {
        var manifest = chrome.runtime.getManifest();
        document.title = manifest.name + " Options";
        $("#name").html(manifest.name + " - " + manifest.version);
        $("#description").html(manifest.description);
        $("#logo").attr('src', manifest.icons['128']);
        $("#baseUrl").focus();
    }
    
    function hook_events()
    {
        $("#config-form").submit(function(e) {
            save_options();
            e.preventDefault();
        });
    }

    restore_options();
    setup_page();
    hook_events();
});
