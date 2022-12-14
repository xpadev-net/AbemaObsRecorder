type playerElements = {
  video: HTMLVideoElement;
  rewindButton: HTMLButtonElement;
  pauseButton: HTMLButtonElement;
  volumeButton: HTMLButtonElement;
  nextInfo: HTMLDivElement;
  timeDisplay: HTMLTimeElement;
};
const getVideoElement = () => {
  return new Promise<playerElements>((resolve) => {
    let video: HTMLVideoElement,
      rewindButton: HTMLButtonElement,
      pauseButton: HTMLButtonElement,
      volumeButton: HTMLButtonElement;
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
      const volumeButtons = document.getElementsByClassName(
        "com-playback-Volume__icon-button"
      );
      if (volumeButtons[0])
        volumeButton = volumeButtons[0] as HTMLButtonElement;
      const timeDisplay = document.getElementsByClassName("com-vod-VODTime")[0]
        ?.firstElementChild?.firstElementChild as HTMLTimeElement;
      const nextInfo = document.getElementsByClassName(
        "com-vod-VODNextProgramInfo"
      )[0] as HTMLDivElement;
      if (
        video &&
        rewindButton &&
        pauseButton &&
        timeDisplay &&
        volumeButton &&
        nextInfo
      ) {
        resolve({
          video,
          rewindButton,
          pauseButton,
          timeDisplay,
          volumeButton,
          nextInfo,
        });
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

const waitVideoEnd = (video: HTMLVideoElement) => {
  return new Promise<void>((resolve, reject) => {
    const onEnded = () => {
      cleanup();
      console.log("onend");
      resolve();
    };
    const onPause = () => {
      if (video.paused) {
        //com-vod-VODNextProgramInfo__cancel-button
        //com-vod-VODNextProgramInfo com-vod-VODNextProgramInfo--is-show
        console.log("wait");
        cleanup();
        reject();
      }
    };
    const cleanup = () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("waiting", onPause);
    };
    video.addEventListener("ended", onEnded);
    video.addEventListener("waiting", onPause);
  });
};
const waitVideoStart = (video: HTMLVideoElement) => {
  return new Promise<void>((resolve) => {
    const onPlay = () => {
      cleanup();
      console.log("start");
      resolve();
    };
    const cleanup = () => {
      video.removeEventListener("play", onPlay);
    };
    video.addEventListener("play", onPlay);
  });
};
export { getVideoElement, waitVideoLoad, waitVideoEnd, waitVideoStart };
