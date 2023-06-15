// content.js

// Function to scrape text from a given DOM element
function scrapeText(element) {
    let text = '';
  
    // Traverse all child nodes of the element
    for (let node of element.childNodes) {
      // If the node is a text node, append its text to the result
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent.trim() + ' ';
      }
      // If the node is an element, recursively scrape its text
      else if (node.nodeType === Node.ELEMENT_NODE) {
        text += scrapeText(node);
      }
    }
 
    return text;
  }
  
  // Function to handle the context menu item click event
  function onContextMenuClick(info, tab) {
    // Scrape text from the entire document body
    const text = scrapeText(document.body);
  
    // Display the scraped text in the console
    console.log(text);
  }
  
  // Register a context menu item to scrape text
  browser.contextMenus.create({
    id: 'scrapeText',
    title: 'Scrape Text',
    contexts: ['all'],
  });
  
  // Add a listener to handle the context menu item click event
  browser.contextMenus.onClicked.addListener(onContextMenuClick);
  console.log('here')
