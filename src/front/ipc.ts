import browser from "webextension-polyfill";

const getQueueUrl = () => {
  return new Promise<string>((resolve, reject) => {
    const handler = (message: Message) => {
      browser.runtime.onMessage.removeListener(handler);
      if (message.type === "queue" && message.value) {
        resolve(message.value);
      } else {
        reject(message);
      }
    };
    browser.runtime.onMessage.addListener(handler);
    void browser.runtime.sendMessage("getQueueUrl");
  });
};

const complete = () => {
  return new Promise<void>((resolve, reject) => {
    const handler = (message: Message) => {
      browser.runtime.onMessage.removeListener(handler);
      if (message.type === "complete" && message.value === "success") {
        resolve();
      } else {
        reject();
      }
    };
    browser.runtime.onMessage.addListener(handler);
    void browser.runtime.sendMessage("getQueueUrl");
  });
};

export { getQueueUrl, complete };
