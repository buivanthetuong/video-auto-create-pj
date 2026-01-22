// src/Components/ActionOrchestrator/utils/actionRegistry.js
import TypingTextAction from "../actions/TypingTextAction.jsx";
import CountdownAction from "../actions/CountdownAction.jsx";
import ImageViewActionToID from "../actions/ImageViewActionToID.jsx";
import VideoViewAction from "../actions/VideoViewActionToID.jsx";
import DivAction from "../actions/DivActionToID.jsx";
import TypingTextActionToID from "../actions/TypingTextActionToID.jsx";
import SoundPlayerAction from "../actions/SoundPlayerAction.jsx";
// import FadeInAction from "../actions/FadeInAction";
// import FadeOutAction from "../actions/FadeOutAction";
// import ZoomAction from "../actions/ZoomAction";
// import SlideAction from "../actions/SlideAction";
// import StaticAction from "../actions/StaticAction";

/**
 * 📋 ACTION REGISTRY
 * Mapping giữa cmd string và Action Component
 *
 * Cách thêm action mới:
 * 1. Tạo file ActionComponent trong actions/
 * 2. Import và thêm vào object này
 */
export const ACTION_REGISTRY = {
  typingText: TypingTextAction,
  countdown: CountdownAction,
  imageViewActionToID: ImageViewActionToID,
  videoView: VideoViewAction,
  divAction: DivAction,
  typingTextActionToID: TypingTextActionToID,
  soundPlayerAction: SoundPlayerAction,
  //   fadeIn: FadeInAction,
  //   fadeOut: FadeOutAction,
  //   zoom: ZoomAction,
  //   slide: SlideAction,
  //   static: StaticAction,
  actionCssClass: null, // Không render, chỉ xử lý CSS
  actionCssId: null, // Không render, chỉ xử lý CSS
};

/**
 * 🔑 COMMAND STRINGS
 * Object chứa các string cmd để dùng nhanh, tránh typo
 *
 * Usage:
 * { cmd: CMD.typingText, ... }
 * hoặc: { cmd: CMD.layer001ViewAction, ... }
 */
/**
 * 🔑 COMMAND STRINGS
 * @readonly
 * @enum {string}
 */

export const CMD = {
  typingText: "typingText",
  countdown: "countdown",
  imageViewActionToID: "imageViewActionToID",
  videoView: "videoView",
  divAction: "divAction",
  layer001ViewAction: "layer001ViewAction",
  typingTextActionToID: "typingTextActionToID",
  actionCssClass: "actionCssClass",
  actionCssId: "actionCssId",
  soundPlayerAction: "soundPlayerAction",
};

// Export default để dùng dễ hơn
export default ACTION_REGISTRY;
