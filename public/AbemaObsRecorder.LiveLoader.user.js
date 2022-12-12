// ==UserScript==
// @name         AbemaObsRecorder Live Loader
// @namespace    https://github.com/xpadev-net/
// @version      0.1
// @description  Load AbemaObsRecorder.user.js from idea build in server
// @author       xpadev-net
// @match        *://localhost:3000/*
// @match        *://abema.tv/*
// @grant        none
// @run-at       document-body
// ==/UserScript==
const script = document.createElement("script");
script.src=`http://localhost:3000/dist/AbemaObsRecorder.user.js?q=${Math.random()}`;
document.body.append(script);