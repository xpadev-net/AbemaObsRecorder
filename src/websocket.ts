import { hash } from "./util/hash";
import { typeGuard } from "./typeguard";

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
  return new Promise<void>((resolve, reject) => {
    const authCallback = (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data) as unknown;
      if (typeGuard.hello(data)) {
        const _ = JSON.stringify({
          op: 1,
          d: {
            rpcVersion: 1,
            authentication: hash(data.d.authentication, password),
            eventSubscriptions: 33,
          },
        });
        connection.send(_);
      } else if (typeGuard.identified(data)) {
        cleanup();
        resolve();
      }
    };
    const onclose = () => {
      cleanup();
      reject();
    };
    const cleanup = () => {
      connection.removeEventListener("message", authCallback);
      connection.removeEventListener("close", onclose);
    };
    connection.addEventListener("message", authCallback);
    connection.addEventListener("close", onclose);
  });
};

export { connectWebsocket, authentication };
