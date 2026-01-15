// src/Components/ActionOrchestrator/actions/DivAction.jsx
import React from "react";
import DivView from "../smallComponents/media/DivView.jsx";
import { mergeStyles } from "../utils/cssOverrideManager.js";

/**
 * 📦 DIV ACTION
 * Tạo div rỗng với styling và animation tùy chỉnh
 */
function DivAction({ data }) {
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
    <DivView
      frame={frame}
      styCss={mergedStyle}
      startFrame={actionStartFrame}
      endFrame={actionEndFrame}
      data={data}
      dataAction={action}
    />
  );
}

export default DivAction;
export { DivAction };
