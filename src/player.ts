type playerElements = {
  video: HTMLVideoElement;
  rewindButton: HTMLButtonElement;
  pauseButton: HTMLButtonElement;
  timeDisplay: HTMLTimeElement;
};
const getVideoElement = () => {
  return new Promise<playerElements>((resolve) => {
    let video: HTMLVideoElement,
      rewindButton: HTMLButtonElement,
      pauseButton: HTMLButtonElement;
    const tick = () => {
      const videos = Array.from(document.getElementsByTagName("video")).filter(
        (video) => !!video.src
      );
      if (videos[0]) {
        video = videos[0];
      }
      const rewindButtons = document.getElementsByClassName(
        "com-vod-VideoControlBar__rewind"
      );
      if (rewindButtons[0])
        rewindButton = rewindButtons[0] as HTMLButtonElement;
      const pauseButtons = document.getElementsByClassName(
        "com-vod-PlaybackButton"
      );
      if (pauseButtons[0]) pauseButton = pauseButtons[0] as HTMLButtonElement;
      const timeDisplay = document.getElementsByClassName("com-vod-VODTime")[0]
        ?.firstElementChild?.firstElementChild as HTMLTimeElement;
      if (video && rewindButton && pauseButton && timeDisplay) {
        resolve({ video, rewindButton, pauseButton, timeDisplay });
      } else {
        setTimeout(tick, 100);
      }
    };
    tick();
  });
};
const waitVideoLoad = (video: HTMLVideoElement) => {
  return new Promise<void>((resolve) => {
    const forceResolve = setTimeout(() => resolve(), 10000);
    video.oncanplaythrough = () => {
      clearTimeout(forceResolve);
      resolve();
    };
  });
};
export { getVideoElement, waitVideoLoad };
