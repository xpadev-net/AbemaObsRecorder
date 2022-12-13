import { hash } from "./util/hash";

const password = "abematest";

let connection: WebSocket;

const connectWebsocket = () => {
  connection = new WebSocket("ws://127.0.0.1:4455");
  return new Promise<WebSocket>((resolve, reject) => {
    connection.onopen = function (event) {
      if (event.isTrusted) {
        resolve(connection);
      } else {
        reject();
      }
    };
  });
};

const authentication = () => {
  return new Promise<void>((resolve) => {
    const authCallback = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.d.authentication) {
        const _ = JSON.stringify({
          op: 0,
          d: {
            obsWebSocketVersion: "5.0.1",
            rpcVersion: 1,
            authentication: hash(data.d.authentication, password),
          },
        });
        console.log(_);
        connection.send(_);
      } else {
        resolve();
      }
    };
    connection.addEventListener("message", authCallback);
  });
};

export { connectWebsocket, authentication };
