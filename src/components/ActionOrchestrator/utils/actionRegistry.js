// src/Components/ActionOrchestrator/utils/actionRegistry.js

import TypingTextAction from "../actions/TypingTextAction.jsx";
import CountdownAction from "../actions/CountdownAction.jsx";
import ImageViewAction from "../actions/ImageViewAction.jsx";
import VideoViewAction from "../actions/VideoViewAction.jsx";
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
  imageView: ImageViewAction,
  videoView: VideoViewAction,
  //   fadeIn: FadeInAction,
  //   fadeOut: FadeOutAction,
  //   zoom: ZoomAction,
  //   slide: SlideAction,
  //   static: StaticAction,
  actionCssClass: null, // Không render, chỉ xử lý CSS
  actionCssId: null, // Không render, chỉ xử lý CSS
};
