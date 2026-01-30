import { CMD_Fetch, getTextCSS, getImgCSS } from "../groupUtils.js";

export default function group2_1(arr) {
  const uid = `${arr[0].group}`;

  function buildScene(item, idx) {
    const sceneUid = `${uid}_${idx}`;
    const BG001 = `BG001_${sceneUid}`;
    const mainContainer = `main_${sceneUid}`;
    const textContainer = `textCont_${sceneUid}`;
    const imageContainer = `imgCont_${sceneUid}`;

    return {
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
          img: item.backgroundIMG || arr[0]?.backgroundIMG,
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
          group: item.group,
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
          group: item.group,
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
          text: item.text,
          toID: textContainer,
          noTyping: true,
          group: item.group,
          styleCss: {
            ...getTextCSS(item.textStyle),
            fontSize: "100px",
            animation: "zoomIn 1s ease-in-out forwards",
          },
        },
        // Image container (phía dưới)
        {
          cmd: CMD_Fetch.divAction,
          id: imageContainer,
          toID: mainContainer,
          group: item.group,
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
        {
          cmd: CMD_Fetch.imageViewActionToID,
          img: item.img,
          toID: imageContainer,
          group: item.group,
          styleCss: {
            ...getImgCSS(item.imgStyle),
            height: "500px",
            width: "500px",
            animation: "zoomIn 1s ease-in-out forwards",
          },
        },
        ...(item.soundEffect
          ? [
              {
                cmd: CMD_Fetch.soundPlayerAction,
                soundSource: item.soundEffect,
              },
            ]
          : []),
      ],
      code: item.code,
    };
  }

  const obj1 = buildScene(arr[0], 1);
  const obj2 = buildScene(arr[1], 2);

  return [obj1, obj2];
}
