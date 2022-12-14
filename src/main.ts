import { injectStyle, removeStyle } from "./style";
import { record } from "./record";

let inPlayer = false;
const onUrlChange = async (current: string) => {
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
    if (url && url[1]) {
      await record(url[1]);
    }
  } else {
    if (inPlayer) {
      inPlayer = false;
      removeStyle();
      console.log("exit");
    }
  }
};
export { onUrlChange };
