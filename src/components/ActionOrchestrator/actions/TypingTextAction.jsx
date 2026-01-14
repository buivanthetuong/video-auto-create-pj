// src/Components/ActionOrchestrator/actions/TypingTextAction.jsx
import React from "react";
import TypingText from "../smallComponents/text/TypingText.jsx";
import { mergeStyles } from "../utils/cssOverrideManager.js";

/**
 * 📝 TYPING TEXT ACTION
 *
 * Hiển thị text với typing animation
 * ⭐ Component này chỉ làm trung chuyển data, không xử lý logic
 */
function TypingTextAction({ data }) {
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

  const hasText = item.text && item.text.trim() !== "";

  // ✅ Chuẩn bị text format
  const textData = action.text
    ? [{ text: action.text, type: "normal" }]
    : hasText
      ? [{ text: item.text, type: "normal" }]
      : [{ text: "", type: "normal" }];

  // ✅ Chuẩn bị style
  const mergedStyle = mergeStyles(
    action,
    item,
    defaultTextStyle,
    className,
    id,
    cssOverrides,
  );

  // ⭐ Pass props cần thiết + toàn bộ data object
  return (
    <TypingText
      text={textData}
      frame={frame}
      styCss={mergedStyle}
      startFrame={actionStartFrame}
      endFrame={actionEndFrame}
      sound={action.sound !== false}
      noTyping={action.noTyping || false}
      dataAction={action}
      data={data}
    />
  );
}

export default TypingTextAction;
export { TypingTextAction };
