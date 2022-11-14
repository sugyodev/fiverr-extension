(function () {
    'use strict';
    const userInput = document.getElementById('user');
    const gigInput = document.getElementById('gig');
    const resetBtn = document.getElementById('reset');
    const switchBtn = document.getElementById('switch-btn');
    userInput.focus();
    chrome.storage.sync.get(['actived'], function (items) {
        switchBtn.checked = items.actived;
    });
    switchBtn.addEventListener('click', function handler(e) {
        chrome.storage.sync.set({ 'actived': e.target.checked }, function (items) {
            switchBtn.checked = e.target.checked;
        });
    })
    userInput.addEventListener('keyup', function onkeyup(event) {
        if (event.keyCode === 13) {
            saveData(userInput.value.trim(), gigInput.value.trim()) && alert("New url has been added successfully!");
            userInput.value = '';
            gigInput.value = '';
        }
    }, false);
    gigInput.addEventListener('keyup', function onkeyup(event) {
        if (event.keyCode === 13) {
            saveData(userInput.value.trim(), gigInput.value.trim()) && alert("New url has been added successfully!");
            userInput.value = '';
            gigInput.value = '';
        }
    }, false);
    resetBtn.addEventListener('click', function () {
        confirm("Do you want to really reset all the urls?") && initStorage();
    }, false)
})();

//fornat dangerous urls list 
function initStorage() {
    // format localstorage
    chrome.storage.sync.set({users: [], gigs: [] }, function () {
        console.log('data has been emptyed!');
    });
    alert('all urls removed successfully!');
}


function saveData(newuser, newgig) {
    //save data to localstorage
    var users = [], gigs = [];
    chrome.storage.sync.get(['users', 'gigs'], function (items) {
        if (items.users && items.users.length > 0) {
            users = items.users;
            newuser && users.push(newuser);
        } else {
            newuser && users.push(newuser);
        }
        if (items.gigs && items.gigs.length > 0) {
            gigs = items.gigs;
            newgig && gigs.push(newgig);
        } else {
            newgig && gigs.push(newgig);
        }
        chrome.storage.sync.set({ 'users': users }, function () {
            console.log('success!');
            chrome.storage.sync.get(['users'], function (items) {
                console.log('users', items.users);
            });
        });
        chrome.storage.sync.set({ 'gigs': gigs }, function () {
            console.log('success!');
            chrome.storage.sync.get(['gigs'], function (items) {
                console.log('gigs', items.gigs);
            });
        });
    });
}
