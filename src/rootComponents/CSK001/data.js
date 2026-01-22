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
const colorBG = ["yellow", "red", "green", "purple", "blue"];
const CMD_Fetch = CMD;

// {
//   typingText: "typingText",
//   countdown: "countdown",
//   imageViewActionToID: "imageViewActionToID",
//   videoView: "videoView",
//   divAction: "divAction",
//   layer001ViewAction: "layer001ViewAction",
//   typingTextActionToID: "typingTextActionToID",
//   actionCssClass: "actionCssClass",
//   actionCssId: "actionCssId",
//   soundPlayerAction: "soundPlayerAction",
// };

const SpaceSound = "SOUNDCHUNG_SpaceSound";

let videoData01 = [];

DataFront.forEach((groupArray) => {
  const colorSets = ["blue", "yellow"];

  //THIET LAP SO OBJ
  let processedGroup = [];

  groupArray.forEach((e, i) => {
    if (i === 0) {
      // push bản chỉnh sửa
      processedGroup.push({
        ...e,
        action: "BEGIN",
        code: SpaceSound,
        timeFixed: 7,
      });

      // push bản nguyên gốc
      processedGroup.push(e);
    } else {
      processedGroup.push(e);
    }
  });
  // processedGroup.push({ action: "END" });

  // LAY KEY MAC DINH ID CLASS CODE timeFixed
  processedGroup = processedGroup.map((e, i) => {
    const obj = { ...e };
    obj.stt = i;
    if (obj.id) {
      obj.IDMark = obj.id;
    }
    obj.ClassMark = (obj.class ? obj.class : "") + " all";

    if (!obj.code) {
      obj.code = SpaceSound;
      obj.timeFixed = 5;
    }

    return obj;
  });
  //TUY CHINH
  let QSAWPX = 0;

  processedGroup.forEach((e, i) => {
    switch (e.action) {
      case "BEGIN":
        e.actions = OBJ_BEGIN(e);
        break; //
      case "Hook":
        e.timePlus = 3;
        e.actions = OBJ_Hook(e);
        break; //
      case "END":
        e.actions = OBJ_END(e);
        break;
      case "DEMNGUOC":
        e.timeFixed = 1;
        e.actions = OBJ_DEMNGUOC(e);
        break;

      case "QSAW":
        let topPX =
          QSAWPX === 1 ? 50 + QSAWPX * 350 + "px" : 50 + QSAWPX * 250 + "px";
        QSAWPX++;
        e.actions = OBJ_QSAW(e, topPX, QSAWPX, i);
        break;

      case "CHONDAPAN":
        e.actions = OBJ_CHONDAPAN(e);
        break;
      default:
        e.actions = []; // ⭐ Default actions
        break;
    }
  });

  processedGroup = Sort0toN(processedGroup);

  videoData01.push(processedGroup);
});

console.log(JSON.stringify(keepOnlyActionsCodeTimeFixedStt(videoData01)));

export { videoData01 };

function OBJ_BEGIN(e) {
  return [
    {
      cmd: CMD_Fetch.divAction,
      id: "DIV001",
      styleCss: {
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        top: "100px",
        zIndex: "10",
        width: "1000px",
        // backgroundColor: "red",
        // ⭐ Bắt đầu từ invisible
      },
    },
    {
      cmd: CMD_Fetch.divAction,
      id: "DIV001A",
      toID: "DIV001",
      delay: 30, // ⭐ Xuất hiện sau 30 frames
      styleCss: {
        zIndex: "10",
        width: "200px",
        height: "100px",
        backgroundColor: "yellow",
        // ⭐ Bắt đầu từ invisible
        opacity: 0,
        animation: anim({
          name: "fadeInSlideUp",
          frames: 60,
          ease: "ease-out",
          delayFrames: 0, // ⭐ Animation bắt đầu ngay khi div xuất hiện
          fillMode: "forwards",
        }),
      },
    },
    {
      cmd: CMD_Fetch.divAction,
      id: "DIV001B",
      toID: "DIV001",
      delay: 60, // ⭐ Xuất hiện sau 60 frames
      styleCss: {
        zIndex: "10",
        width: "200px",
        height: "300px",
        backgroundColor: "blue",
        // ⭐ Bắt đầu từ invisible
        opacity: 0,
        animation: anim({
          name: "fadeInSlideUp",
          frames: 60,
          ease: "ease-out",
          delayFrames: 0,
          fillMode: "forwards",
        }),
      },
    },
    // VideoPresets.loopingBackground("LoopingVideo001.mp4", {
    //   id: "IDvideo001", // ⭐ ID cụ thể
    //   panAnimation: false,
    //   panAmount: 5,
    //   panDuration: 150,
    //   styleCss: {
    //     height: "1920px",
    //     width: "2000px",
    //     transform: "translate(-20%, -10%)",
    //   },
    // }),
  ];
}
function OBJ_END(e) {
  return [
    {
      cmd: "typingTextActionToID",
      text: "HÃY FOLLOW TÔI",
      sound: true,
      noTyping: false,
      styleCss: ObjCSS.BEGIN_END_StyleCSs,
    },
  ];
}

function OBJ_DEMNGUOC(e) {
  return [
    {
      cmd: "countdown",
      countDownFrom: 1,
      colorTheme: "orange",
      zIndex: 100,
      styleCss: {
        transform: "translate(-50%, -50%) scale(2)",
        top: "50%",
        left: "50%",
        position: "absolute",
        animation: anim({
          name: "slowRotate",
          frames: 150, // 5s @30fps
          ease: "linear", // rotate nên linear cho mượt
          iterationCount: "infinite",
          fillMode: "both", // hoặc bỏ luôn cũng được
        }),
      },
    },
  ];
}

function OBJ_QSAW(e, topPX, QSAWPX, i) {
  return [
    {
      cmd: "typingTextActionToID",
      text: e.text,
      group: "1",
      styleCss: {
        ...ObjCSS.CSStypingtextAA001,
        position: "absolute",
        top: topPX,
        backgroundColor: colorBG[QSAWPX - 1],
      },
    },
  ];
}
function OBJ_CHONDAPAN(e) {
  return [
    ,
    {
      cmd: CMD_Fetch.divAction,
      id: "DUNG",
      styleCss: {
        position: "flex",
        top: "100px",
        zIndex: "10",
        width: "100%",
        backgroundColor: "red",
        transition: "height 5s ease-out",
      },
    },
    {
      cmd: CMD_Fetch.divAction,
      id: "DUNG1",
      styleCss: {
        position: "flex",
        backgroundColor: "yellow",
        width: "1000px",
        height: "100px",
      },
    },
    ,
    {
      cmd: "actionCssId",
      toID: "DUNG",
      cssMode: "add",
      css: {
        backgroundColor: "yellow",
        // background: "black",
        color: "black",
      },
    },
    {
      cmd: "typingTextActionToID",
      toID: "DUNG",
      text: "e.text",
      styleCss: {
        ...ObjCSS.CSStypingtextAA001,
        position: "flex",
      },
    },
    {
      cmd: "actionCssId",
      toID: "B25",
      cssMode: "add",
      css: {
        backgroundColor: "yellow",
        // background: "black",
        color: "black",
        height: "300px",
      },
    },

    {
      cmd: CMD.imageViewActionToID,
      toID: "DUNG",
      img: "CSK_001.png",
      styleCss: {
        width: "100px",
        position: "relative",
      },
    },
    {
      cmd: CMD.imageViewActionToID,
      toID: "DUNG1",
      img: "CSK_001.png",
      styleCss: {
        width: "100px",
        position: "relative",
      },
    },
    {
      cmd: CMD.imageViewActionToID,
      toID: "DUNG",
      delay: 30,
      img: "CSK_001.png",
      positionMode: "before",
      styleCss: {
        width: "200px",
        display: "block",
        animation: anim({
          name: "fadeInScale",
          frames: 50, // 5s @30fps
          ease: "linear", // rotate nên linear cho mượt
          iterationCount: 1,
          fillMode: "both", // hoặc bỏ luôn cũng được
        }),
      },
    },
    ,
  ];
}

function OBJ_Hook(e) {
  return [
    {
      cmd: "typingText",
      text: e.text,
      styleCss: ObjCSS.CSStypingtextAA001,
    },
  ];
}
