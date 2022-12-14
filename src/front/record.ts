import {
  getVideoElement,
  waitVideoEnd,
  waitVideoLoad,
  waitVideoStart,
} from "@/front/player";
import { sleep } from "@/util/sleep";
import { recordStart, recordStop } from "@/front/websocket";

const record = async (url: string) => {
  const {
    video,
    rewindButton,
    pauseButton,
    timeDisplay,
    volumeButton,
    nextInfo,
  } = await getVideoElement();
  const observer = new MutationObserver(() => {
    if (nextInfo.classList.contains("com-vod-VODNextProgramInfo--is-show")) {
      (
        document.getElementsByClassName(
          "com-vod-VODNextProgramInfo__cancel-button"
        )[0] as HTMLDivElement
      )?.click();
    }
  });
  observer.observe(nextInfo, { attributes: true });
  video.disablePictureInPicture = true;
  await video.requestFullscreen();
  await sleep(2000);
  if (!video.paused) pauseButton.click();
  if (volumeButton.getAttribute("aria-label") === "音声をオンにする")
    volumeButton.click();
  await sleep(100);
  while (
    timeDisplay.getAttribute("datetime") !== "PT0S" &&
    timeDisplay.getAttribute("datetime") !== "PT"
  ) {
    rewindButton.click();
    await sleep(100);
  }
  (
    document.getElementsByClassName(
      "com-playback-ClickToUnmuteButton"
    )[0] as HTMLButtonElement
  )?.click();
  await waitVideoLoad(video);

  await sleep(1000);
  await recordStart();
  pauseButton.click();
  await waitVideoStart(video);
  await waitVideoEnd(video);
  await recordStop(url);
  observer.disconnect();
};

export { record };
