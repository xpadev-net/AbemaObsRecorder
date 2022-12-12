import { getVideoElement, waitVideoLoad } from "./player";
import { sleep } from "./util/sleep";

const record = async () => {
  await prepareRecord();
};

const prepareRecord = async () => {
  console.log("start prepare");
  const { video, rewindButton, pauseButton, timeDisplay } =
    await getVideoElement();
  video.disablePictureInPicture = true;
  await sleep(2000);
  if (!video.paused) pauseButton.click();
  console.log("pause");
  await sleep(100);
  while (timeDisplay.getAttribute("datetime") !== "PT0S") {
    rewindButton.click();
    console.log("seek", timeDisplay, timeDisplay.getAttribute("datetime"));
    await sleep(100);
  }
  console.log("seek complete");
  (
    document.getElementsByClassName(
      "com-playback-ClickToUnmuteButton"
    )[0] as HTMLButtonElement
  )?.click();
  await waitVideoLoad(video);
  console.log("loaded");
  await sleep(1000);
  pauseButton.click();
};
export { record };
