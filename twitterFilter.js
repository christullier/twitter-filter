function extractUsernames() {
    var regex = /@([A-Za-z0-9_]+)/g;
    var usernames = new Set();
    // Find all Twitter usernames on the page
    var textNodes = document.evaluate(
      "//text()[contains(., '@')]",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
  
    for (var i = 0; i < textNodes.snapshotLength; i++) {
      var node = textNodes.snapshotItem(i);
      var matches = node.nodeValue.match(regex);
      if (matches) {
        for (var j = 0; j < matches.length; j++) {
          usernames.add(matches[j].substring(1));
        }
      }
    }
    
    // Convert the set of usernames to an array and return
    return Array.from(usernames);
  }
  
  // Send the extracted usernames to the background script
  function sendUsernamesToBackgroundScript(usernames) {
    browser.runtime.sendMessage({ usernames: usernames });
  }
  
  // Main entry point
  function main() {
    console.log('in main')
    var usernames = extractUsernames();
    sendUsernamesToBackgroundScript(usernames);
  }
  
  main();
  