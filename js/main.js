
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

document.addEventListener('DOMContentLoaded', function() {
    // var item = localStorage.getItem('hello');
    // console.log("hello "+item);
    // $('body').on('click', 'a', function(){
    //     chrome.tabs.create( {url: $(this).attr('href')} );
    //     return false;
    // });
    chrome.tabs.getSelected(null, function(tab) {
        var tablink = tab.url;
        console.log(tablink);
        $('#show-test').text(tablink);
    });
    
    
    $('#menu-button').bind('click', show_menu);
    $('#toggle-helper').bind('click', hide_menu);
});
