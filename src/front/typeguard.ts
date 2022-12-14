const typeGuard = {
  hello: (i: unknown): i is pHello =>
    typeof i === "object" && (i as pHello).op === 0,
  identified: (i: unknown): i is pIdentified =>
    typeof i === "object" && (i as pIdentified).op === 2,
  requestResponse: (i: unknown): i is pRequestResponse =>
    typeof i === "object" && (i as pRequestResponse).op === 7,
  StartRecordResponse: (i: unknown): i is pStartRecordResponse =>
    typeof i === "object" &&
    (i as pStartRecordResponse).op === 7 &&
    (i as pStartRecordResponse).d.requestType === "StartRecord",
  StopRecordResponse: (i: unknown): i is pStopRecordResponse =>
    typeof i === "object" &&
    (i as pStopRecordResponse).op === 7 &&
    (i as pStopRecordResponse).d.requestType === "StopRecord",
};
export { typeGuard };
