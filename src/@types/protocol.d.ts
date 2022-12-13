type pHello = {
  op: 0;
  d: {
    obsWebSocketVersion: string;
    rpcVersion: 1;
    authentication: {
      challenge: string;
      salt: string;
    };
  };
};

type pIdentified = {
  op: 2;
  d: {
    negotiatedRpcVersion: 1;
  };
};
