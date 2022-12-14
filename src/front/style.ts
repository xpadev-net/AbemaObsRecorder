let styleElement: HTMLStyleElement;
const injectStyle = () => {
  styleElement = document.createElement("style");
  styleElement.innerHTML = `
body{
overflow: hidden;
}
.c-application-DesktopAppContainer__content-container{
position:relative;
z-index: 1000;
}
.c-application-DesktopAppContainer__content{
position:relative;
z-index:1000;
}
.com-vod-VODScreen__player{
position:fixed;
z-index:1000;
top:0;
left: 0;
background:black;
width:100vw;
height:100vh;
}
.com-a-Video__video video{
position: fixed;
z-index:1000;
top:0;
left: 0;
width:100vw;
height:100vh;
}
`;
  document.body.append(styleElement);
};
const removeStyle = () => {
  styleElement.remove();
};
export { injectStyle, removeStyle };
