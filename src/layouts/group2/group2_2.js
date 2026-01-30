import { CMD_Fetch, getTextCSS, getImgCSS } from "../groupUtils.js";

export default function group2_2(arr) {
  const uid = `${arr[0].group}`;
  const BG001 = `BG001_${uid}`;
  const main = `main_${uid}`;
  const topDiv = `top_${uid}`;
  const bottomDiv = `bottom_${uid}`;

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
      // Main Container
      {
        cmd: "divAction",
        id: main,
        group: arr[0].group,
        styleCss: {
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "10px",
        },
      },
      // Top Half (Item 1)
      {
        cmd: "divAction",
        id: topDiv,
        toID: main,
        group: arr[0].group,
        styleCss: {
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        },
      },
      // Item 1 Image
      {
        cmd: CMD_Fetch.imageViewActionToID,
        toID: topDiv,
        img: arr[0].img,
        group: arr[0].group,
        styleCss: {
          ...getImgCSS(arr[0].imgStyle),
          width: "40%",
          height: "80%",
          objectFit: "contain",
          animation: "slideInLeft 1s ease-out forwards",
        },
      },
      // Item 1 Text
      {
        cmd: CMD_Fetch.typingText,
        text: arr[0].text,
        toID: topDiv,
        noTyping: true,
        group: arr[0].group,
        styleCss: {
          ...getTextCSS(arr[0].textStyle),
          width: "50%",
          fontSize: "60px",
          animation: "slideInRight 1s ease-out forwards",
        },
      },
      ...(arr[0].soundEffect
        ? [
            {
              cmd: CMD_Fetch.soundPlayerAction,
              soundSource: arr[0].soundEffect,
            },
          ]
        : []),
    ],
    code: arr[0].code,
  };

  const obj2 = {
    actions: [
      // Bottom Half (Item 2)
      {
        cmd: "divAction",
        id: bottomDiv,
        toID: main,
        group: arr[1].group,
        styleCss: {
          flex: 1,
          display: "flex",
          flexDirection: "row-reverse", // Đảo ngược để tạo sự cân đối
          alignItems: "center",
          justifyContent: "space-around",
        },
      },
      // Item 2 Image
      {
        cmd: CMD_Fetch.imageViewActionToID,
        toID: bottomDiv,
        img: arr[1].img,
        group: arr[1].group,
        styleCss: {
          ...getImgCSS(arr[1].imgStyle),
          width: "40%",
          height: "80%",
          objectFit: "contain",
          animation: "slideInRight 1s ease-out forwards",
        },
      },
      // Item 2 Text
      {
        cmd: CMD_Fetch.typingText,
        text: arr[1].text,
        toID: bottomDiv,
        noTyping: true,
        group: arr[1].group,
        styleCss: {
          ...getTextCSS(arr[1].textStyle),
          width: "50%",
          fontSize: "60px",
          animation: "slideInLeft 1s ease-out forwards",
        },
      },
      ...(arr[1].soundEffect
        ? [
            {
              cmd: CMD_Fetch.soundPlayerAction,
              soundSource: arr[1].soundEffect,
            },
          ]
        : []),
    ],
    code: arr[1].code,
  };

  return [obj1, obj2];
}
