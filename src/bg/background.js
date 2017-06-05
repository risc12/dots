// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  getTabData((tabData) => {
    sendResponse(tabData);
  })
  return true;
});

chrome.tabs.onUpdated.addListener((id) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    getTabData((tabData) => {
      chrome.tabs.sendMessage(tabs[0].id, tabData);
    });
  });
})

chrome.tabs.onActivated.addListener((id) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    getTabData((tabData) => {
      chrome.tabs.sendMessage(tabs[0].id, tabData);
    });
  });
});

chrome.tabs.onRemoved.addListener((id) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    getTabData((tabData) => {
      chrome.tabs.sendMessage(tabs[0].id, tabData);
    });
  });
});

chrome.tabs.onMoved.addListener((id) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    getTabData((tabData) => {
      chrome.tabs.sendMessage(tabs[0].id, tabData);
    });
  });
});

function getTabData(cb) {
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    const amountOfTabs = tabs.length;
    let activeTab = -1;

    tabs.forEach((tab, index) => {
      if (tab.active === true) {
        activeTab = index;
      }
    })

    cb({amountOfTabs, activeTab});
  });

}
