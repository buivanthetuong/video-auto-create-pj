// ✅ Import JSON trực tiếp
import DataFront from "./data_Front_001.json" with { type: "json" };
import { VideoPresets } from "../../components/ActionOrchestrator/utils/cssUtils/cssUltis.js";
import { ObjCSS } from "./objCSS.js";
import { CMD } from "../../components/ActionOrchestrator/utils/actionRegistry.js";
import {
  Sort0toN,
  anim,
  keepOnlyActionsCodeTimeFixedStt,
} from "../../components/ActionOrchestrator/utils/dataSupportFuntions.js";

const CMD_Fetch = CMD;

const handlerMap = {
  group2_type01: group2_type01,
};

//lay OBJcss
//cach dung  ...getTextCSS(arr[0].textStyle),
function getTextCSS(style) {
  if (!style) return {};

  const key =
    typeof style === "number"
      ? `textCss_${String(style).padStart(3, "0")}`
      : `textCss_${style}`;
  return ObjCSS.textCSS[key] || {};
}
//cách dùng ...getImgCSS(arr[0].imgStyle),
function getImgCSS(style) {
  if (!style) return {};

  const key =
    typeof style === "number"
      ? `imgCss_${String(style).padStart(3, "0")}`
      : `imgCss_${style}`;
  return ObjCSS.imgCSS[key] || {};
}
//controller cho group
function handleItem(group) {
  const groupStr = String(group.length);
  const typeStr = String(group[0].type).padStart(2, "0");

  const key = `group${groupStr}_type${typeStr}`;
  const handler = handlerMap[key];

  console.log("hello:  " + key);

  if (handler) {
    return handler(group);
  } else {
    console.warn("❌ Chưa có handler cho:", key);
    return group;
  }
}

//lõi hệ thống
let videoData01 = [];

DataFront.forEach((videoData) => {
  let video = [];
  let group = [];
  let flag = videoData[0].group;
  videoData.forEach((obj) => {
    if (obj.group === flag) {
      group.push(obj);
    } else {
      ///controller
      group = handleItem(group);

      for (let i = 0; i < group.length; i++) {
        video.push(group[i]);
      }
      group = [obj];
      flag = obj.group;
    }
  });

  //controller
  group = handleItem(group);
  for (let i = 0; i < group.length; i++) {
    video.push(group[i]);
  }

  videoData01.push(video);
});

console.log(JSON.stringify(keepOnlyActionsCodeTimeFixedStt(videoData01)));
export { videoData01 };

function group2_type01(arr) {
  const uid = `${arr[0].group}_${arr[0].code}`;

  const BG001 = `BG001_${uid}`;
  const div1 = `div1_${uid}`;
  const divA = `divA_${uid}`;
  const divB = `divB_${uid}`;
  const divC = `divC_${uid}`;
  const divD = `divD_${uid}`;
  const textId = `text_${uid}`;

  const obj_001 = {
    actions: [
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

      {
        cmd: CMD_Fetch.soundPlayerAction,
        ToEndFrame: true,
        soundSource: "SOUNDCHUNG_tiktok-dongho",
      },
      {
        cmd: CMD_Fetch.divAction,
        id: div1,
        group: arr[0].group,
        styleCss: {
          position: "absolute",
          height: "100%",
          width: "100%",
          padding: "50px",
        },
      },
      {
        cmd: CMD_Fetch.divAction,
        id: divA,
        toID: div1,
        group: arr[0].group,
        styleCss: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40%",
          width: "100%",
        },
      },
      {
        cmd: CMD_Fetch.typingText,
        text: arr[0].text,
        id: textId,
        toID: divA,
        group: arr[0].group,
        styleCss: ObjCSS.CSStypingText001,
        // {
        //   fontSize: "96px",
        //   fontWeight: 800,
        //   letterSpacing: "2px",
        //   lineHeight: "1.1",
        //   textTransform: "uppercase",
        //   WebkitTextStroke: "3px #fff",
        //   textShadow: "0 0 20px rgba(255,255,255,0.4)",
        //   animation: "bounceIn 0.5s ease-out forwards",
        // },
      },
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: "soundEffect_bublepop",
      },
      {
        cmd: CMD_Fetch.divAction,
        id: divB,
        toID: div1,
        group: arr[0].group,
        styleCss: {
          display: "flex", // ⭐
          flexDirection: "row", // ⭐ mặc định
          gap: "20px", // optional
          height: "40%",
          padding: "50px",
        },
      },
      {
        cmd: CMD_Fetch.divAction,
        id: divC,
        toID: divB,
        group: arr[0].group,
        styleCss: {
          flexBasis: "100%",
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      {
        cmd: CMD_Fetch.imageViewActionToID,
        img: arr[0].img,
        toID: divC,
        group: arr[0].group,
        styleCss: {
          width: "600px",
          height: "600px",
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: "20%",
        },
      },
      {
        cmd: CMD_Fetch.divAction,
        id: divD,
        toID: divB,
        group: arr[0].group,
        styleCss: {
          height: "auto",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },

      {
        cmd: CMD_Fetch.imageViewActionToID,
        img: arr[1].img,
        toID: divD,
        group: arr[0].group,
        styleCss: {
          width: "600px",
          height: "600px",
          maxWidth: "100%",
          maxHeight: "100%",
        },
      },
    ],
    code: arr[0].code,
    timeFixed: 2,
    stt: 0,
  };
  const obj_002 = {
    actions: [
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: "soundEffect_flippage",
      },
      {
        cmd: CMD_Fetch.actionCssId,
        toID: textId,
        mode: "replace",
        css: {
          display: "none",
        },
      },
      {
        cmd: CMD_Fetch.typingText,
        text: arr[1].text,
        toID: divA,
        delay: 15,
        group: arr[0].group,
        styleCss: {
          textAlign: "center",
          fontSize: "60px",
          fontWeight: 700,
          WebkitTextStroke: "2px yellow",
          color: "#fff",
        },
      },

      {
        cmd: CMD_Fetch.actionCssId,
        toID: divC,
        mode: "add",
        css: {
          animation: "collapseWidth 1s ease-in-out forwards",
        },
      },
    ],
    code: arr[1].code,
    timeFixed: 5,
    stt: 1,
  };
  let finalSet = [];
  finalSet.push(obj_001);
  finalSet.push(obj_002);
  return finalSet;
}
