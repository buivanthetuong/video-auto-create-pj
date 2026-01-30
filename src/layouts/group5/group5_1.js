import { CMD_Fetch, getTextCSS, getImgCSS } from "../groupUtils.js";

export default function group5_1(arr) {
  const uid = `${arr[0].group}`;
  const BG001 = `BG001_${uid}`;
  const mainContainer = `main_${uid}`;
  const topLeftDiv = `topLeft_${uid}`;
  const topRightDiv = `topRight_${uid}`;
  const centerDiv = `center_${uid}`;
  const bottomLeftDiv = `bottomLeft_${uid}`;
  const bottomRightDiv = `bottomRight_${uid}`;

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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr auto 1fr",
          gap: "20px",
          padding: "40px",
        },
      },
      // Top Left Div
      {
        cmd: CMD_Fetch.divAction,
        id: topLeftDiv,
        toID: mainContainer,
        group: arr[0].group,
        styleCss: {
          gridColumn: "1",
          gridRow: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        },
      },
      // Top Right Div
      {
        cmd: CMD_Fetch.divAction,
        id: topRightDiv,
        toID: mainContainer,
        group: arr[0].group,
        styleCss: {
          gridColumn: "2",
          gridRow: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        },
      },
      // Center Div
      {
        cmd: CMD_Fetch.divAction,
        id: centerDiv,
        toID: mainContainer,
        group: arr[0].group,
        styleCss: {
          gridColumn: "1/3",
          gridRow: "2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 2,
        },
      },
      {
        cmd: CMD_Fetch.typingText,
        text: arr[0].text,
        toID: centerDiv,
        group: arr[0].group,
        styleCss: {
          ...getTextCSS(arr[0].textStyle),
          fontSize: "100px",
        },
      },
      // Bottomleft Div
      {
        cmd: CMD_Fetch.divAction,
        id: bottomLeftDiv,
        toID: mainContainer,
        group: arr[0].group,
        styleCss: {
          gridColumn: "1",
          gridRow: "3",
          display: "flex",
          flexDirection: "column", // 👈 ảnh trên – chữ dưới
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        },
      },
      //bottom right div
      {
        cmd: CMD_Fetch.divAction,
        id: bottomRightDiv,
        toID: mainContainer,
        group: arr[0].group,
        styleCss: {
          gridColumn: "2",
          gridRow: "3",
          display: "flex",
          flexDirection: "column", // 👈 ảnh trên – chữ dưới
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        },
      },
      // Sound effect
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[0].soundEffect,
      },
    ],
    code: arr[0].code,
  };
  const obj2 = {
    actions: [
      //bg
      {
        cmd: CMD_Fetch.imageViewActionToID,
        toID: topLeftDiv,
        img: arr[1].img,
        group: arr[1].group,
        styleCss: {
          ...getImgCSS(arr[1].imgStyle),
          width: "350px",
          height: "350px",
          opacity: 0,
          animation: "fadeInSlideLeft 0.8s ease-out forwards",
        },
      },
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[1].soundEffect,
      },
    ],
    code: arr[1].code,
  };
  const obj3 = {
    actions: [
      {
        cmd: CMD_Fetch.imageViewActionToID,
        toID: topRightDiv,
        img: arr[2].img,
        group: arr[2].group,
        styleCss: {
          ...getImgCSS(arr[2].imgStyle),
          width: "350px",
          height: "350px",
          opacity: 0,
          animation: "fadeInSlideRight 0.8s ease-out forwards",
        },
      },

      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[2].soundEffect,
      },
    ],
    code: arr[2].code,
  };
  const obj4 = {
    actions: [
      {
        cmd: CMD_Fetch.imageViewActionToID,
        toID: bottomLeftDiv,
        img: arr[3].img,
        group: arr[2].group,
        styleCss: {
          ...getImgCSS(arr[3].imgStyle),
          order: "1",
          width: "350px",
          height: "350px",
          opacity: 0,
          animation: "fadeInSlideLeft 0.8s ease-out forwards",
        },
      },

      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[3].soundEffect,
      },
    ],
    code: arr[3].code,
  };
  const obj5 = {
    actions: [
      {
        cmd: CMD_Fetch.imageViewActionToID,
        toID: bottomRightDiv,
        img: arr[4].img,
        group: arr[2].group,
        styleCss: {
          ...getImgCSS(arr[4].imgStyle),
          order: "1",
          width: "350px",
          height: "350px",
          opacity: 0,
          animation: "fadeInSlideRight 0.8s ease-out forwards",
        },
      },

      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[4].soundEffect,
      },
    ],
    code: arr[4].code,
  };

  return [obj1, obj2, obj3, obj4, obj5];
}
