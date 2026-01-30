import { ObjCSS } from "./objCSS.js";
import { ObjEffect } from "./objEffect.js";
import { CMD } from "../components/ActionOrchestrator/utils/actionRegistry.js";

const CMD_Fetch = CMD;

function getTextCSS(style) {
  if (!style) return ObjCSS.textCSS["textCss_1"];

  const key = `textCss_${String(style)}`;
  return ObjCSS.textCSS[key];
}

function getImgCSS(style) {
  if (!style) return ObjCSS.imgCSS["imgCss_1"];

  const key = `imgCss_${String(style)}`;
  return ObjCSS.imgCSS[key];
}

function getEffect(style) {
  if (!style) return {};

  const key = `${String(style)}`;
  return ObjEffect[key];
}

export { CMD_Fetch, getTextCSS, getImgCSS, getEffect };
