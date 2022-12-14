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
type pRequestResponse = {
  op: 7;
  d: {
    requestType: string;
    requestId: string;
    requestStatus: object;
    responseData?: object;
  };
};
type pStartRecordResponse = {
  op: 7;
  d: {
    requestType: "StartRecord";
    requestId: string;
    requestStatus: {
      code: number;
      result: boolean;
    };
  };
};
type pStopRecordResponse = {
  op: 7;
  d: {
    requestType: "StopRecord";
    requestId: string;
    requestStatus: {
      code: number;
      result: boolean;
    };
  };
};
