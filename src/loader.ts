import { onUrlChange } from "./main";

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
  const progressContainer = await getProgressContainer();
  const observer = new MutationObserver(() => {
    if (url !== location.href) {
      url = location.href;
      onUrlChange(url);
    }
  });
  observer.observe(progressContainer, { attributes: true });
  onUrlChange(location.href);
};
void init();
export {};