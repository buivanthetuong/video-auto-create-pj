import React from "react";

/**
 * Component hiển thị text không có animation
 * ⭐ Hiển thị trực tiếp text từ action.text hoặc data.text
 */
const TypingTextNoEffect = ({
  frame,
  styCss = {},
  startFrame = 30,
  endFrame = 90,
  data = {},
  dataAction = {},
}) => {
  if (frame < startFrame || frame > endFrame) return null;

  // ⭐ Lấy text trực tiếp từ dataAction hoặc data
  const displayText = dataAction.text || data.text || "";

  return <div style={styCss}>{displayText}</div>;
};

export default TypingTextNoEffect;
