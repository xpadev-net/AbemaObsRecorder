const getVideoElement = () => {
  return new Promise<HTMLVideoElement>((resolve) => {
    const tick = () => {
      const video = Array.from(document.getElementsByTagName("video")).filter((video)=>!!video.src);
      if (video.length === 1){
        resolve(video[0]);
      }else{
        setTimeout(tick,100);
      }
    };
    tick();
  });
}