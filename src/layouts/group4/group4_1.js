import { CMD_Fetch, getTextCSS, getImgCSS, getEffect } from "../groupUtils.js";

export default function group4_1(arr) {
  const uid = `${arr[0].group}`;
  const BG001 = `BG001_${uid}`;
  const main = `main_${uid}`;
  const row1Div = `row1_${uid}`;
  const row2Div = `row2_${uid}`;
  const row3Div = `row3_${uid}`;
  const row4Div = `row4_${uid}`;
  const row5Div = `row5_${uid}`;

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
      //divcha
      {
        cmd: "divAction",
        id: main,
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
      // Div1
      {
        cmd: "divAction",
        id: row1Div,
        toID: main,
        group: arr[0].group,
        styleCss: {
          position: "relative",
          height: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
      },
      {
        cmd: CMD_Fetch.typingText,
        text: arr[0].text,
        group: arr[0].group,
        toID: row1Div,
        styleCss: {
          ...getTextCSS(arr[0].textStyle),
          fontSize: "80px",
        },
      },
      // Div2
      {
        cmd: "divAction",
        id: row2Div,
        toID: main,
        group: arr[0].group,
        styleCss: {
          position: "relative",
          height: "35%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
      },
      {
        cmd: CMD_Fetch.imageViewActionToID,
        toID: row2Div,
        group: arr[0].group,
        img: arr[0].img,
        styleCss: {
          ...getImgCSS(arr[0].imgStyle),
          ...getEffect(arr[0].imgEffect),
          width: "450px",
          height: "450px",
        },
      },
      // Div3
      {
        cmd: "divAction",
        id: row3Div,
        toID: main,
        group: arr[0].group,
        styleCss: {
          position: "relative",
          height: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
      },
      // div4
      {
        cmd: "divAction",
        id: row4Div,
        toID: main,
        group: arr[0].group,
        styleCss: {
          position: "relative",
          height: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
      },
      // Div5
      {
        cmd: "divAction",
        id: row5Div,
        toID: main,
        group: arr[0].group,
        styleCss: {
          position: "relative",
          height: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
      },
      //sound
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[0].soundEffect,
      },
    ],
    code: arr[0].code,
  };

  const obj2 = {
    actions: [
      // Text arr[1] vào dòng 3
      {
        cmd: CMD_Fetch.typingText,
        text: arr[1].text,
        noTyping: true,
        group: arr[1].group,
        toID: row3Div,
        styleCss: {
          ...getTextCSS(arr[1].textStyle),
          fontSize: "60px",
          animation: "fadeInSlideLeft 1s ease-out forwards",
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
        cmd: CMD_Fetch.typingText,
        text: arr[2].text,
        noTyping: true,
        group: arr[2].group,
        toID: row4Div,
        styleCss: {
          ...getTextCSS(arr[2].textStyle),
          fontSize: "60px",
          animation: "fadeInSlideLeft 1s ease-out forwards",
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
      // Text arr[3] vào dòng 5
      {
        cmd: CMD_Fetch.typingText,
        text: arr[3].text,
        noTyping: true,
        group: arr[3].group,
        toID: row5Div,
        styleCss: {
          ...getTextCSS(arr[3].textStyle),
          fontSize: "60px",
          animation: "fadeInSlideLeft 1s ease-out forwards",
        },
      },

      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[3].soundEffect,
      },
    ],
    code: arr[3].code,
  };

  return [obj1, obj2, obj3, obj4];
}
