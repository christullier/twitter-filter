/*global sortedEmojiMap*/

/**
 * @param  {Node} node    - The target DOM Node.
 * @return {void}         - Note: the emoji substitution is done inline.
 */
function getUser (node) {
  if (node.nodeType === Node.TEXT_NODE) {

    if (node.parentNode &&
        node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }

    let content = node.textContent;
    if (content.startsWith('@')) {
        if (!localStorage.getItem(content)){
            console.log('adding', content)
            localStorage.setItem(content, false)
        } else {
            console.log('already have', content)
        }
        // browser.storage.local.set({
        //     username: content,
        //     blocked: false
        // });
    }
  }
  else {
    for (let i = 0; i < node.childNodes.length; i++) {
      getUser(node.childNodes[i]);
    }    
  }
}

getUser(document.body);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        getUser(newNode);
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
