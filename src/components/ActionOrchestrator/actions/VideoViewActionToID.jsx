// src/Components/ActionOrchestrator/actions/VideoViewActionToID.jsx
import React from "react";
import { createPortal } from "react-dom";
import VideoView from "../smallComponents/media/VideoView.jsx";
import { mergeStyles } from "../utils/cssOverrideManager.js";

/**
 * 🎬 VIDEO VIEW ACTION
 * Hiển thị video với styling tùy chỉnh
 * ⭐ Hỗ trợ render video vào element có ID (toID)
 * ⭐ Width luôn fit container, height auto theo tỷ lệ
 */
function VideoViewAction({ data }) {
  const {
    action,
    item,
    frame,
    actionStartFrame,
    actionEndFrame,
    cssOverrides,
    defaultTextStyle,
    className,
    id,
  } = data;

  // ✅ Lấy video từ action hoặc item hoặc data
  const video = action.video || item.video || data.video;

  if (!video) return null;

  // ✅ Merge styles
  const mergedStyle = mergeStyles(
    action,
    item,
    defaultTextStyle,
    className,
    id,
    cssOverrides,
  );

  // ⭐ Nếu có toID, render vào container đó
  if (action.toID) {
    const targetElement = document.getElementById(action.toID);

    if (!targetElement) {
      console.warn(`⚠️ Element with ID "${action.toID}" not found`);
      return null;
    }

    // console.log("🎬 VideoViewAction rendering to ID:", action.toID);

    // ⭐ Dùng React Portal để render vào element có ID
    return createPortal(
      <VideoView
        video={video}
        frame={frame}
        styCss={mergedStyle}
        startFrame={actionStartFrame}
        endFrame={actionEndFrame}
        sound={action.sound !== false}
        volume={action.volume ?? 1}
        loop={action.loop ?? true}
        playbackRate={action.playbackRate ?? 1}
        objectFit={action.objectFit || "contain"} // ⭐ Default: contain
        data={data}
        dataAction={action}
      />,
      targetElement,
    );
  }

  // ⭐ Render bình thường (không có toID)
  return (
    <VideoView
      video={video}
      frame={frame}
      styCss={mergedStyle}
      startFrame={actionStartFrame}
      endFrame={actionEndFrame}
      sound={action.sound !== false}
      volume={action.volume ?? 1}
      loop={action.loop ?? true}
      playbackRate={action.playbackRate ?? 1}
      objectFit={action.objectFit || "contain"}
      data={data}
      dataAction={action}
    />
  );
}

export default VideoViewAction;
export { VideoViewAction };
