import browser from "webextension-polyfill";

let queue: string[] = [];
const init = () => {
  browser.runtime.onMessage.addListener((message: Message, sender) => {
    if (!sender.tab?.id) return;
    switch (message.type) {
      case "getQueueUrl":
        if (queue.length > 0 && queue[0]) {
          void browser.tabs.sendMessage(sender.tab?.id, {
            type: "queue",
            value: queue[0],
          });
        } else {
          void browser.tabs.sendMessage(sender.tab?.id, {
            type: "queue",
            value: "about:blank",
          });
        }
        break;
      case "push":
        if (message.value) {
          queue.push(message.value);
          void browser.tabs.sendMessage(sender.tab?.id, {
            type: "push",
            value: "success",
          });
        } else {
          void browser.tabs.sendMessage(sender.tab?.id, {
            type: "push",
            value: "reject",
          });
        }
        break;
      case "complete":
        queue = queue.slice(1);
        void browser.tabs.sendMessage(sender.tab?.id, {
          type: "complete",
          value: "success",
        });
    }
  });
};
init();
export {};
