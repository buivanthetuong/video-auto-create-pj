import React from "react";
import { Html5Audio, Sequence } from "remotion";
import typingSound from "../../../../assets/soundDefault/TypingSoundCapcut.mp3";
import ImageView from "../media/ImageView";
/**
 * Component hiển thị text với typing animation
 * ⭐ Nhận data object - access bất kỳ field nào qua data.fieldName
 */
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
  // ⭐ Nhận toàn bộ data object
}) => {
  const typingDuration = 3; // 3 giây
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

  return (
    <div style={styCss}>
      {displayText}

      {/* ✅ Typing sound with all options */}
      {sound && !noTyping && (
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
      )}

      {/* ⭐ Ví dụ: Sử dụng imgSource nếu có - KHÔNG CẦN DESTRUCTURE */}
      {dataAction.imgSource && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={data.imgSource}
            alt="Content"
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        </div>
      )}

      {/* ⭐ Ví dụ: Sử dụng videoSource nếu có */}
      {data.videoSource && (
        <div style={{ marginTop: "20px" }}>Video: {data.videoSource}</div>
      )}

      {/* ⭐ Ví dụ: Sử dụng bất kỳ field nào */}
      {data.customField && <div>Custom: {data.customField}</div>}
    </div>
  );
};

export default TypingText;
