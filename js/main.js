
function show_menu() {
    if ($('#left-menu').hasClass('menu-hide')) {
        $('#left-menu').removeClass('menu-hide');
    }
    if ( ! $('#left-menu').hasClass('menu-show') ) {
        $('#left-menu').addClass('menu-show');
    }
    if ( !$('#toggle-helper').hasClass('helper-show') ) {
        $('#toggle-helper').addClass('helper-show');
    }
}

function hide_menu() {
    if ($('#left-menu').hasClass('menu-show')) {
        $('#left-menu').removeClass('menu-show');
    }
    if ( ! $('#left-menu').hasClass('menu-hide') ) {
        $('#left-menu').addClass('menu-hide');
    }
    if ( $('#toggle-helper').hasClass('helper-show') ) {
        $('#toggle-helper').removeClass('helper-show');
    }
}

function isFolderExit() {
    return new Promise(function(resovle, reject) {
        chrome.bookmarks.getChildren('1', function(bookmarkArray) {
            var find = false;
            for (var i = 0; i < bookmarkArray.length; i++) {
                if (bookmarkArray[i].title == 'API Collector') {
                    find = true;
                    break;
                }
            }
            if (!find) {
                resovle();
            } else {
                reject();
            }
        });
    });
}

function createFolder() {
    isFolderExit().then(function() {
        chrome.bookmarks.create({'parentId':'1', 'title': 'API Collector'}, function() {
            console.log('create folder');
        });
    }).catch(function() {
        console.log('folder exited');
    });
}

function testChromeStorage() {
    chrome.storage.sync.set({"tags": ["jquery", "javascript", "python"]}, function() {
        console.log("tags saved");
    });
    chrome.storage.sync.set({"categories": ["javascript", "python"]}, function() {
        console.log("categories saved"); 
    });
    chrome.storage.sync.set({"apis": [
        {"url": "http://jquery.com", "name": "jquery API", "category": "javascript", "tags": ["javascript", "jquery"]},
        {"url": "https://docs.python.org/2/library/", "name": "python2.7 API", "category": "python", "tags": ["python"]}
        ]}, function() {
            console.log("apis saved");
    });
    
    chrome.storage.sync.get("tags", function(data) {
       console.log("tags: ");
       console.log(data); 
    });
    chrome.storage.sync.get("categories", function(data) {
       console.log("categories: ");
       console.log(data); 
    });
    chrome.storage.sync.get("apis", function(data) {
        console.log("apis: ");
        console.log(data);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // testChromeStorage();
    
    chrome.tabs.getSelected(function(tab) {
        console.log(tab);
    });

    $('body').on('click', 'a#show-test', function(){
        chrome.tabs.create( {url: $(this).attr('href')} );
        return false;
    });
      
    $('#menu-button').bind('click', show_menu);
    $('#toggle-helper').bind('click', hide_menu);
    
});
