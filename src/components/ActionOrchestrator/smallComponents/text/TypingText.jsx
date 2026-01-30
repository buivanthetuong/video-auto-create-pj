import React from "react";
import { Html5Audio, Sequence, useCurrentFrame } from "remotion";
// import typingSound from "../../../../assets/soundDefault/TypingSoundCapcut.mp3";
import {
  useAnimations,
  getAnimationStyle,
} from "../../utils/animations/animationResolver.js";

/**
 * Component hiển thị text với typing animation
 * ⭐ Nhận data object - access bất kỳ field nào qua data.fieldName
 * ⭐ HỖ TRỢ REMOTION ANIMATIONS thông qua animations array
 */
// ✅ SAU - Dùng path tương đối hoặc static path
// const typingSound = "/assets/soundDefault/TypingSoundCapcut.mp3";
const TypingText = ({
  text = [{ text: "I love you!", type: "normal" }],
  frame,
  styCss = {},
  startFrame = 30,
  endFrame = 90,
  sound = true,
  noTyping = false,
  fps = 30,
  data = {},
  dataAction = {},
}) => {
  const currentFrame = useCurrentFrame();

  // ⭐ Lấy id/class từ dataAction hoặc data
  const elementId = dataAction.id || data.id;
  const elementClass = dataAction.className || data.className;

  // ⭐ Lấy animations từ data
  const animations = dataAction.animations || data.animations || [];
  const animationStyles = useAnimations(animations);

  const typingDuration = 0.5; // 3 giây
  const typingFrames = typingDuration * fps;

  if (frame < startFrame || frame > endFrame) return null;

  // ✅ Tạo chuỗi kết hợp từ array (chỉ type normal)
  const combinedText = text.map((item) => item.text).join("");

  // ✅ Tính progress
  const progress = noTyping
    ? 1
    : Math.min((frame - startFrame) / typingFrames, 1);
  const visibleChars = Math.floor(progress * combinedText.length);

  // ✅ Tạo text hiển thị
  const displayText = noTyping
    ? combinedText
    : combinedText.slice(0, visibleChars);

  // ⭐ BUILD SELECTOR
  const containerSelector = elementId ? `#${elementId}` : null;

  // ⭐ CONTAINER STYLE - styCss + animation
  const containerStyle = containerSelector
    ? getAnimationStyle(animationStyles, containerSelector, styCss)
    : styCss;

  // Debug animations
  if (currentFrame % 60 === 0 && elementId && animations.length > 0) {
    console.log(`📝 TypingText [${elementId}] - Frame ${currentFrame}`, {
      containerSelector,
      hasAnimation: !!animationStyles[containerSelector],
      animationCount: animations.length,
    });
  }

  return (
    <div id={elementId} className={elementClass} style={containerStyle}>
      {displayText}
      {/* ✅ Typing sound with all options */}
      {/* {sound && !noTyping && (
        <Sequence from={startFrame}>
          <Html5Audio
            src={data.customTypingSound || typingSound}
            volume={data.soundVolume ?? 0.5}
            playbackRate={data.soundSpeed ?? 1}
            showInTimeline={false}
            onError={(err) => {
              if (process.env.NODE_ENV === "development") {
                console.warn("Typing sound error:", err);
              }
            }}
          />
        </Sequence>
      )} */}
    </div>
  );
};

export default TypingText;
