
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


document.addEventListener('DOMContentLoaded', function() {
    createFolder();
    
    chrome.tabs.getSelected(null, function(tab) {
        var tablink = tab.url;
        console.log(tablink);
        $('#show-test').text(tablink);
        $('#show-test').attr('href', tablink);
    });
    
    $('body').on('click', 'a#show-test', function(){
        chrome.tabs.create( {url: $(this).attr('href')} );
        return false;
    });
      
    $('#menu-button').bind('click', show_menu);
    $('#toggle-helper').bind('click', hide_menu);
    
});



