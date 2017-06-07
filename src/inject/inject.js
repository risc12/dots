const WRAPPER_ID = "__dots_ext_wrapper";

firstDraw();

chrome.extension.sendMessage({getTabs: true}, (response) => {
  fillWithData(response);
});

chrome.extension.onMessage.addListener((response, sender, sendResponse) => {
  fillWithData(response);
});

function firstDraw() {
  const container = document.createElement("div");
  container.setAttribute("id", WRAPPER_ID);
  container.setAttribute("style", `
    height: 10px;
    position: fixed;
    right: 10px;
    bottom: 10px;
    z-index: 9999999;
  `);

  document.body.append(container);
}

function fillWithData(tabData) {
  const container = document.querySelector(`#${WRAPPER_ID}`);

  const newContent = document.createElement("div");
  const newText = document.createTextNode(`${tabData.activeTab + 1} / ${tabData.amountOfTabs}`);

  for (i=0; i < tabData.amountOfTabs; i++) {
    newContent.append(createDotElement(i === tabData.activeTab));
  }

  container.innerHTML = "";
  container.append(newContent);
}

function createDotElement(active) {
  const dot = document.createElement("div");
  dot.setAttribute("style", `
    display: inline-block;
    border-radius: 50%;
    background-color: ${active ? "rgb(0, 196, 255)" : "rgba(0, 196, 255, 0.3)"};
    width: 7px;
    height: 7px;
    margin-left: 2px;
  `)
  return dot;
}
