import React, { useState, useEffect } from "react";
import { Html5Video, staticFile, continueRender, delayRender } from "remotion";

/**
 * Component hiển thị video với pre-loading và custom styling
 * ⭐ Pattern giống ImageView - nhận data object
 * ⭐ Hỗ trợ CSS animation, loop, zoom
 */
const VideoView = ({
  video,
  frame,
  styCss = {},
  startFrame = 30,
  endFrame = 90,
  videoSize = "800px",
  fps = 30,
  data = {},
  sound = true,
  volume = 1,
  loop = false,
  playbackRate = 1,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadedVideoSrc, setLoadedVideoSrc] = useState(null);
  const [handle] = useState(() => delayRender("Loading video"));

  // ✅ Logic lấy video path (giống image)
  const getVideoPath = (videoName) => {
    if (!videoName) return null;

    if (videoName.includes("_")) {
      const prefix = videoName.split("_")[0];
      return `video/${prefix}/${videoName}`;
    } else {
      return `video/${videoName}`;
    }
  };

  const videoPath = getVideoPath(video);

  // ✅ Pre-load video với delayRender/continueRender
  useEffect(() => {
    if (!videoPath) {
      setVideoLoaded(true);
      continueRender(handle);
      return;
    }

    // Create video element to check if loadable
    const videoElement = document.createElement("video");
    videoElement.src = staticFile(videoPath);

    videoElement.onloadedmetadata = () => {
      console.log(`✅ Video loaded: ${videoPath}`);
      setLoadedVideoSrc(videoElement.src);
      setVideoLoaded(true);
      continueRender(handle);
    };

    videoElement.onerror = () => {
      console.warn(`⚠️ Failed to load video: ${videoPath}`);
      setVideoLoaded(true);
      continueRender(handle);
    };

    return () => {
      videoElement.onloadedmetadata = null;
      videoElement.onerror = null;
    };
  }, [videoPath, handle]);

  // ✅ Check visibility (giống ImageView)
  if (frame < startFrame || frame > endFrame) return null;
  if (!videoLoaded) return null;
  if (!videoPath) return null;

  // ✅ Nếu video load fail
  if (!loadedVideoSrc) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
        }}
      >
        Video not found: {video}
      </div>
    );
  }

  // ✅ Default style nếu không có custom
  const defaultStyle = {
    width: videoSize,
    height: videoSize,
    objectFit: "cover",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
  };

  // ✅ Merge styles (styCss override default)
  const finalStyle = {
    ...defaultStyle,
    ...styCss,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Html5Video
        src={loadedVideoSrc}
        volume={sound ? volume : 0}
        muted={!sound}
        loop={loop}
        playbackRate={playbackRate}
        style={finalStyle}
        onError={(err) => {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Video playback error [${video}]:`, err.message);
          }
        }}
      />
    </div>
  );
};

export default VideoView;
