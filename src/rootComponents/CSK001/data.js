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
  //text trên chữ dưới
  group1_type01: group1_type01,
  //chỉ có text theo kieu comment
  group1_type02: group1_type02,
  //chỉ có anh xoay vong
  group1_type03: group1_type03,
  //2 mục nội dung, ảnh đẩy nhau
  group2_type01: group2_type01,
  //3 muc noi dung
  group3_type01: group3_type01,
};

//lay OBJcss
//cach dung  ...getTextCSS(arr[0].textStyle),
function getTextCSS(style) {
  if (!style) return ObjCSS.textCSS["textCss_001"];

  const key =
    typeof style === "number"
      ? `textCss_${String(style).padStart(3, "0")}`
      : `textCss_${style}`;
  return ObjCSS.textCSS[key] || {};
}
//cách dùng ...getImgCSS(arr[0].imgStyle),
function getImgCSS(style) {
  if (!style) return ObjCSS.imgCSS["imgCss_001"];

  const key =
    typeof style === "number"
      ? `imgCss_${String(style).padStart(3, "0")}`
      : `imgCss_${style}`;
  return ObjCSS.imgCSS[key] || {};
}
//controller cho group
function handleItem(group) {
  const groupStr = String(group.length);
  const typeStr = String(group[0].mode).padStart(2, "0");

  const key = `group${groupStr}_type${typeStr}`;
  const handler = handlerMap[key];

  if (handler) {
    return handler(group);
  } else {
    console.warn("❌ Chưa có handler cho:", key);
    return group;
  }
}

//lõi
let videoData01 = [];

DataFront.forEach((videoData) => {
  const bg_sound = {
    actions: [
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: " ",
      },
    ],
    code: arr[0].code,
    timeFixed: 3,
  };
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

//2 object loại 1
function group2_type01(arr) {
  const uid = `${arr[0].group}`;

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
  };
  let finalSet = [];
  finalSet.push(obj_001);
  finalSet.push(obj_002);
  return finalSet;
}

function group1_type01(arr) {
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
      // Main container
      {
        cmd: CMD_Fetch.divAction,
        id: mainContainer,
        group: arr[0].group,
        styleCss: {
          position: "absolute",
          height: "100%",
          width: "100%",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "30%",
          width: "100%",
        },
      },

      // Text với style to, màu vàng, border đen
      {
        cmd: CMD_Fetch.typingText,
        text: arr[0].text,
        toID: textContainer,
        group: arr[0].group,

        noTyping: true,
        styleCss: {
          fontSize: arr[0].textSize,
          fontWeight: 800,
          color: "yellow",
          textAlign: "center",
          textTransform: "uppercase",
          WebkitTextStroke: "4px black",
          textShadow: "0 0 30px rgba(255,255,0,0.5)",
          letterSpacing: "3px",
        },
      },

      // Sound khi text xuất hiện
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[0].soundEffect,
      },

      // Image container (phía dưới)
      {
        cmd: CMD_Fetch.divAction,
        id: imageContainer,
        toID: mainContainer,
        group: arr[0].group,
        styleCss: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70%",
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
          width: "700px",
          height: "700px",
          maxWidth: "90%",
          maxHeight: "90%",
          objectFit: "contain",
          borderRadius: "20px",
          animation: "scaleUp 0.7s ease-out forwards",
        },
      },
    ],
    code: arr[0].code,
    timeFixed: 4,
  };

  return [obj1];
}

function group1_type02(arr) {
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
          height: "100%",
          width: "100%",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        },
      },
      {
        cmd: CMD_Fetch.divAction,
        id: "commentBubble",
        toID: textContainer,
        group: arr[0].group,
        styleCss: {
          height: "700px",
          width: "70%",
          backgroundColor: "rgba(255,255,255,0.95)",
          padding: "12px 16px",
          borderRadius: "30px",
          maxWidth: "75%",
          boxShadow: "0 8px 25px rgba(0,0,0,0.18)",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // Text với style to, màu vàng, border đen
      {
        cmd: CMD_Fetch.typingText,
        text: arr[0].text,
        toID: "commentBubble",
        group: arr[0].group,
        styleCss: {
          fontSize: arr[0].textSize,
          fontWeight: 600,
          color: "#111",
          textAlign: "center",
          lineHeight: "1.4",
          letterSpacing: "0.3px",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        },
      },
      // Sound khi text xuất hiện
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[0].soundEffect,
      },
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: "SOUNDCHUNG_tiktokTypingSoundCapcut",
      },
    ],
    code: arr[0].code,
    timeFixed: 3,
  };

  return [obj1];
}

function group1_type03(arr) {
  const uid = `${arr[0].group}`;

  const BG001 = `BG001_${uid}`;
  const mainContainer = `main_${uid}`;
  const imageContainer = `imgCont_${uid}`;

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
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "50px",
        },
      },

      // Image container (ở giữa)
      {
        cmd: CMD_Fetch.divAction,
        id: imageContainer,
        toID: mainContainer,
        group: arr[0].group,
        styleCss: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        },
      },

      // Image với hiệu ứng xoay vòng giảm dần
      {
        cmd: CMD_Fetch.imageViewActionToID,
        img: arr[0].img,
        toID: imageContainer,
        group: arr[0].group,
        styleCss: {
          width: "600px",
          height: "600px",
          maxWidth: "90%",
          maxHeight: "90%",
          objectFit: "contain", // ⭐ Đổi từ "cover" thành "contain" để giữ nguyên ảnh
          filter:
            "drop-shadow(0 0 10px rgba(255,255,255,0.8)) drop-shadow(0 0 20px rgba(255,255,0,0.5))", // ⭐ Viền phát sáng
          animation: "spinSlowDown 3s ease-out forwards",
          animationIterationCount: "1",
        },
      },

      // Sound khi ảnh xuất hiện
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[0].soundEffect,
      },
    ],
    code: arr[0].code,
    timeFixed: 3,
  };

  return [obj1];
}

function group3_type01(arr) {
  const uid = `${arr[0].group}`;

  const BG001 = `BG001_${uid}`;
  const mainDiv = `mainDiv_${uid}`;

  // Div cho arr[0]
  const div0 = `div0_${uid}`;
  const div0Img = `div0Img_${uid}`;
  const div0Text = `div0Text_${uid}`;

  // Div cho arr[1]
  const div1 = `div1_${uid}`;
  const div1Img = `div1Img_${uid}`;
  const div1Text = `div1Text_${uid}`;

  // Div cho arr[2]
  const div2 = `div2_${uid}`;
  const div2Img = `div2Img_${uid}`;
  const div2Text = `div2Text_${uid}`;

  const obj_001 = {
    actions: [
      //divBG
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
      //add BG
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
      // Main
      {
        cmd: CMD_Fetch.divAction,
        id: mainDiv,
        group: arr[0].group,
        ToEndFrame: true,
        styleCss: {
          position: "absolute",
          height: "100%",
          width: "100%",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "flex-start",
          alignItems: "center",
        },
      },
      //div 0
      {
        cmd: CMD_Fetch.divAction,
        id: div0,
        toID: mainDiv,
        group: arr[0].group,
        styleCss: {
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          width: "100%",
          height: "30%",
          alignItems: "center",
        },
      },
      // Ảnh bên trái
      {
        cmd: CMD_Fetch.divAction,
        id: div0Img,
        toID: div0,
        group: arr[0].group,
        styleCss: {
          flexBasis: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      {
        cmd: CMD_Fetch.imageViewActionToID,
        img: arr[0].img,
        toID: div0Img,
        group: arr[0].group,
        styleCss: {
          width: "400px",
          height: "400px",
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: "25px",
        },
      },
      // Chữ bên phải
      {
        cmd: CMD_Fetch.divAction,
        id: div0Text,
        toID: div0,
        group: arr[0].group,
        styleCss: {
          flexBasis: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      {
        cmd: CMD_Fetch.typingText,
        text: arr[0].text,
        toID: div0Text,
        group: arr[0].group,
        styleCss: {
          fontSize: arr[0].textSize || "50px",
          fontWeight: 700,
          color: "#fff",
          textAlign: "center",
          WebkitTextStroke: "2px #000",
        },
      },
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[0].soundEffect,
      },
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: "SOUNDCHUNG_tiktokTypingSoundCapcut",
      },
      // ===== DIV 1 (arr[1]): Chữ trái - Ảnh phải - ẨN =====
      {
        cmd: CMD_Fetch.divAction,
        id: div1,
        toID: mainDiv,
        group: arr[0].group,
        styleCss: {
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          width: "100%",
          height: "30%",
          alignItems: "center",
        },
      },
      // Chữ bên trái
      {
        cmd: CMD_Fetch.divAction,
        id: div1Text,
        toID: div1,
        group: arr[0].group,
        styleCss: {
          flexBasis: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      // Ảnh bên phải
      {
        cmd: CMD_Fetch.divAction,
        id: div1Img,
        toID: div1,
        group: arr[0].group,
        styleCss: {
          flexBasis: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      // ===== DIV 2 (arr[2]): Ảnh trái - Chữ phải - ẨN =====
      {
        cmd: CMD_Fetch.divAction,
        id: div2,
        toID: mainDiv,
        group: arr[0].group,
        ToEndFrame: true,
        styleCss: {
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          width: "100%",
          height: "30%",
          alignItems: "center",
        },
      },
      // Ảnh bên trái
      {
        cmd: CMD_Fetch.divAction,
        id: div2Img,
        toID: div2,
        group: arr[0].group,
        styleCss: {
          flexBasis: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      // Chữ bên phải
      {
        cmd: CMD_Fetch.divAction,
        id: div2Text,
        toID: div2,
        group: arr[0].group,
        styleCss: {
          flexBasis: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    ],
    code: arr[0].code,
    timeFixed: 3,
  };

  const obj_002 = {
    actions: [
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[1].soundEffect,
      },
      {
        cmd: CMD_Fetch.imageViewActionToID,
        img: arr[1].img,
        toID: div1Img,
        group: arr[0].group,
        styleCss: {
          width: "400px",
          height: "400px",
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: "15px",
        },
      },
      {
        cmd: CMD_Fetch.typingText,
        text: arr[1].text,
        toID: div1Text,
        group: arr[0].group,
        styleCss: {
          fontSize: arr[1].textSize || "50px",
          fontWeight: 700,
          color: "#fff",
          textAlign: "center",
          WebkitTextStroke: "2px #000",
        },
      },
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: "SOUNDCHUNG_tiktokTypingSoundCapcut",
      },
    ],
    code: arr[1].code,
    timeFixed: 3,
  };

  const obj_003 = {
    actions: [
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: arr[2].soundEffect,
      },
      {
        cmd: CMD_Fetch.soundPlayerAction,
        soundSource: "SOUNDCHUNG_tiktokTypingSoundCapcut",
      },
      {
        cmd: CMD_Fetch.typingText,
        text: arr[2].text,
        toID: div2Text,
        group: arr[0].group,
        styleCss: {
          fontSize: arr[2].textSize || "50px",
          fontWeight: 700,
          color: "#fff",
          textAlign: "center",
          WebkitTextStroke: "2px #000",
        },
      },
      {
        cmd: CMD_Fetch.imageViewActionToID,
        img: arr[2].img,
        toID: div2Img,
        group: arr[0].group,
        styleCss: {
          width: "400px",
          height: "400px",
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: "15px",
        },
      },
    ],
    code: arr[2].code,
    timeFixed: 3,
  };

  let finalSet = [];
  finalSet.push(obj_001);
  finalSet.push(obj_002);
  finalSet.push(obj_003);
  return finalSet;
}
