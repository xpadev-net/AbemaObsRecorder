import { onUrlChange } from "@/front/main";
import { authentication, connectWebsocket } from "@/front/websocket";
import { getQueueUrl } from "@/front/ipc";

const getProgressContainer = () => {
  return new Promise<HTMLDivElement>((resolve) => {
    const tick = () => {
      const progressContainer = document.getElementsByClassName(
        "c-common-TransitionProgressContainer"
      );
      if (progressContainer && progressContainer[0]) {
        resolve(progressContainer[0] as HTMLDivElement);
      } else {
        setTimeout(tick, 100);
      }
    };
    tick();
  });
};

let url = location.href;

const init = async () => {
  const queueUrl = await getQueueUrl();
  if (url !== queueUrl) {
    location.href = queueUrl;
    return;
  }

  const connection = await connectWebsocket();
  await authentication();
  connection.onmessage = (event: MessageEvent<string>) => {
    const data = JSON.parse(event.data) as unknown;
    console.log(data);
  };
  const progressContainer = await getProgressContainer();
  const observer = new MutationObserver(() => {
    if (url !== location.href) {
      url = location.href;
      void onUrlChange(url);
    }
  });
  observer.observe(progressContainer, { attributes: true });
  await onUrlChange(location.href);
};
void init();
