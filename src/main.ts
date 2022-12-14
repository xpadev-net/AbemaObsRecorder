import { injectStyle, removeStyle } from "./style";
import { record } from "./record";

let inPlayer = false;
const onUrlChange = (current: string) => {
  let url;
  if (
    (url = current.match(
      /^https:\/\/abema\.tv\/video\/episode\/([0-9a-zA-Z]+-[0-9]+_s[0-9]+_p[1-9][0-9]*)/
    ))
  ) {
    if (!inPlayer) {
      inPlayer = true;
      injectStyle();
    }
    console.log("enter");
    if (url && url[1]) void record(url[1]);
  } else {
    if (inPlayer) {
      inPlayer = false;
      removeStyle();
      console.log("exit");
    }
  }
};
export { onUrlChange };
