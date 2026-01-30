import { CMD_Fetch, getTextCSS, getImgCSS } from "../groupUtils.js";

export default function group1_2(arr) {
  const uid = `${arr[0].group}`;

  const BG001 = `BG001_${uid}`;
  const mainContainer = `main_${uid}`;
  const textContainer = `textCont_${uid}`;
  const imageContainer = `imgCont_${uid}`;

  const obj1 = {
    actions: [
      // Background
      {
        cmd: "divAction",
        id: BG001,
        group: arr[0].group,
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
        group: arr[0].group,
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
          top: "3%",
          display: "flex",
          flexDirection: "column",
          padding: "50px",
        },
      },
      // Text container (phía trên)
      {
        cmd: CMD_Fetch.divAction,
        id: textContainer,
        toID: mainContainer,
        group: arr[0].group,
        styleCss: {
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "25%",
          zIndex: 2,
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
          fontSize: "100px",
          animation: "zoomIn 1s ease-in-out forwards",
        },
      },
      // Image container (phía dưới)
      {
        cmd: CMD_Fetch.divAction,
        id: imageContainer,
        toID: mainContainer,
        group: arr[0].group,
        styleCss: {
          marginTop: "200px",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          height: "40%",
          width: "100%",
        },
      },
      // Image với hiệu ứng to dần
      {
        cmd: CMD_Fetch.imageViewActionToID,
        img: arr[0].img,
        toID: imageContainer,
        group: arr[0].group,
        styleCss: {
          ...getImgCSS(arr[0].imgStyle),
          height: "500px",
          width: "500px",
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
