var currentUrl = document.URL;
var users = [], gigs = [], actived = true;

function init() {
    //use chrome local storage
    chrome.storage.sync.get(['users', 'gigs', 'actived'], function (items) {
        if(items.actived != undefined || items.actived != null){
            actived = items.actived;
        };
        actived && userAction(items.users, currentUrl);
        actived && gigAction(items.gigs, currentUrl);
    })
}


function userAction(users, curUrl) {
    var packages = [];
    if(users.indexOf(curUrl) != -1){
        for(var i = 0; i <= 6; i++){
            gigClick(i);
        }
        setTimeout(function () {
            window.location.reload();
        }, 300000);
    }
}

function gigClick(i){
    setTimeout(function(){
        document.querySelector('.gig_listings-package').children[i].getElementsByTagName('h3')[0].children[0].click();
    }, (i + 1) * 30000);
}

function gigAction(gigs, curUrl) {
    if(checkIsExistGig(gigs, curUrl) == 1){
        
        setTimeout(function(){
            chrome.runtime.sendMessage({ event: 'close' });
            console.log('closed Tab!');
        }, 20000);
    }
}

function checkIsExistGig(gigs, curUrl){
    for(var i = 0; i < gigs.length; i++){
        if(curUrl.indexOf(gigs[i]) != -1){
            return 1;
        }
    }
    return 0;
}

document.addEventListener("DOMContentLoaded", () => {
    init();
},{ once: true });