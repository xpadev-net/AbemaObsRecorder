import { injectStyle, removeStyle } from "./style";
import { record } from "./record";

let inPlayer = false;
const onUrlChange = (current: string) => {
  console.log(current);
  if (
    current.match(
      /^https:\/\/abema\.tv\/video\/episode\/[0-9a-zA-Z]+-[0-9]+_s[0-9]+_p[1-9][0-9]*/
    )
  ) {
    if (!inPlayer) {
      inPlayer = true;
      injectStyle();
      void record();
      console.log("enter");
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
