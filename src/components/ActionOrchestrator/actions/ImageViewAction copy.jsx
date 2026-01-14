// src/Components/ActionOrchestrator/actions/ImageViewAction.jsx
import React from "react";
import ImageView from "../smallComponents/media/ImageView.jsx";
import { mergeStyles } from "../utils/cssOverrideManager.js";

/**
 * 🖼️ IMAGE VIEW ACTION
 * Hiển thị image với styling tùy chỉnh
 */
function ImageViewAction({ data }) {
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

  // ✅ Lấy img từ action hoặc item hoặc data
  const img = action.img || item.img || data.img;

  if (!img) return null;

  // ✅ Merge styles
  const mergedStyle = mergeStyles(
    action,
    item,
    defaultTextStyle,
    className,
    id,
    cssOverrides,
  );

  return (
    <ImageView
      img={img}
      frame={frame}
      styCss={mergedStyle}
      startFrame={actionStartFrame}
      endFrame={actionEndFrame}
      imgSize={action.imgSize || data.imgSize || "800px"}
      data={data}
      dataAction={action}
    />
  );
}

export default ImageViewAction;
export { ImageViewAction };
