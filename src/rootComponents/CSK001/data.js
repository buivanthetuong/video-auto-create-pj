// ✅ Import JSON trực tiếp
import DataFront from "./data_Front_001.json" with { type: "json" };
import { keepOnlyActionsCodeTimeFixedStt } from "../../components/ActionOrchestrator/utils/dataSupportFuntions.js";
import { CMD_Fetch } from "../../layouts/groupUtils.js";

// Import Group Handlers
import group1_1 from "../../layouts/group1/group1_1.js";
import group1_2 from "../../layouts/group1/group1_2.js";
import group2_2 from "../../layouts/group2/group2_2.js";
import group4_1 from "../../layouts/group4/group4_1.js";
import group5_1 from "../../layouts/group5/group5_1.js";

const handlerMap = {
  //chữ đè lên ảnh
  group1_1: group1_1,
  //text trên ảnh dưới
  group1_2: group1_2,
  //obj1 top (image+text), obj2 bottom (image+text)
  group2_2: group2_2,
  //1 ô tả, liệt kê 3 thằng ở dưới
  group4_1: group4_1,
  //chữ ở giữa, 4 ảnh xung quanh
  group5_1: group5_1,
};

//controller cho group
function handleItem(group) {
  const groupStr = String(group.length);
  const typeStr = String(group[0].mode);

  const key = `group${groupStr}_${typeStr}`;
  const handler = handlerMap[key];

  if (handler) {
    return handler(group);
  } else {
    console.warn("❌ Chưa có handler cho:", key);
    return group;
  }
}

//video tổng
let videoData01 = [];
DataFront.forEach((videoData) => {
  const bg_sound = {
    cmd: CMD_Fetch.soundPlayerAction,
    volume: 0.1,
    ToEndFrame: true,
    soundSource: videoData[0].backgroundSound,
  };
  let video = [];
  let group = [];
  let flag = videoData[0].group;

  //them actions
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
  //controller cuoi
  group = handleItem(group);
  for (let i = 0; i < group.length; i++) {
    video.push(group[i]);
  }

  // Thêm background sound
  if (video.length > 0 && video[0].actions) {
    video[0].actions.unshift(bg_sound);
  }

  const end_sound = {
    code: "SOUNDCHUNG_SpaceSound",
    timeFixed: 0.5,
  };
  video.push(end_sound);
  videoData01.push(video);
});

console.log(JSON.stringify(keepOnlyActionsCodeTimeFixedStt(videoData01)));
export { videoData01 };
