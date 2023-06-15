function printHeadings(tabId) {
    browser.tabs.executeScript(tabId, { code: `
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      headings.forEach((heading) => {
        console.log(heading.textContent);
      });
    `});
  }
  
  browser.browserAction.onClicked.addListener((tab) => {
    printHeadings(tab.id);
  });
  