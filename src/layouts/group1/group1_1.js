import { CMD_Fetch, getTextCSS, getImgCSS } from "../groupUtils.js";

export default function group1_1(arr) {
  const uid = `${arr[0].group}`;

  const BG001 = `BG001_${uid}`;
  const mainContainer = `main_${uid}`;
  const textContainer = `textCont_${uid}`;

  const obj1 = {
    actions: [
      // Background
      {
        cmd: "divAction",
        id: BG001,
        ToEndFrame: true,
        styleCss: {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      {
        cmd: CMD_Fetch.imageViewActionToID,
        toID: BG001,
        ToEndFrame: true,
        zIndex: 0,
        img: arr[0].backgroundIMG,
        styleCss: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        },
      },
      // Main container
      {
        cmd: CMD_Fetch.divAction,
        id: mainContainer,
        group: arr[0].group,
        styleCss: {
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      //img
      {
        cmd: CMD_Fetch.imageViewActionToID,
        toID: mainContainer,
        img: arr[0].img,
        styleCss: {
          ...getImgCSS(arr[0].imgStyle),
          position: "absolute",
          animation: "zoomIn 1s ease-in-out forwards",
        },
      },
      //text container
      {
        cmd: CMD_Fetch.divAction,
        id: textContainer,
        toID: mainContainer,
        group: arr[0].group,
        styleCss: {
          position: "absolute",
          height: "30%",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
      },
      {
        cmd: CMD_Fetch.typingText,
        text: arr[0].text,
        toID: textContainer,
        noTyping: true,
        group: arr[0].group,
        styleCss: {
          ...getTextCSS(arr[0].textStyle),
          fontSize: "80px",
          animation: "zoomIn 1s ease-in-out forwards",
        },
      },
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[0].soundEffect,
      },
    ],
    code: arr[0].code,
  };

  return [obj1];
}
