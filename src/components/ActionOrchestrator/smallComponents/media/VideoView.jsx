// src/Components/ActionOrchestrator/smallComponents/media/VideoView.jsx
import React, { useState, useEffect } from "react";
import {
  Html5Video,
  staticFile,
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * 🎬 VIDEO VIEW - PURE COMPONENT
 * ⭐ Width luôn fit container, height tự động theo tỷ lệ
 */
const VideoView = ({
  video,
  frame,
  styCss = {},
  startFrame = 0,
  endFrame = 300,
  sound = true,
  volume = 1,
  loop = true,
  playbackRate = 1,
  objectFit = "contain", // ⭐ "contain" hoặc "cover"
  ...props
}) => {
  const currentFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadedVideoSrc, setLoadedVideoSrc] = useState(null);
  const [handle] = useState(() => delayRender("Loading video"));

  // Get video path
  const getVideoPath = (videoName) => {
    if (!videoName) return null;
    if (videoName.includes("_")) {
      const prefix = videoName.split("_")[0];
      return `video/${prefix}/${videoName}`;
    }
    return `video/${videoName}`;
  };

  const videoPath = getVideoPath(video);

  // Pre-load video
  useEffect(() => {
    if (!videoPath) {
      setVideoLoaded(true);
      continueRender(handle);
      return;
    }

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

  // Visibility checks
  if (frame < startFrame || frame > endFrame) return null;
  if (!videoLoaded || !videoPath || !loadedVideoSrc) return null;

  // ⭐ Container style - width 100%, height auto hoặc 100%
  const containerStyle = {
    ...styCss,
    width: "100%", // ⭐ Luôn fit width
    height: styCss.height || "auto", // ⭐ Height tự động nếu không set
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <Html5Video
        src={loadedVideoSrc}
        style={{
          width: "100%",
          height: "100%",
          objectFit: objectFit, // ⭐ contain = giữ tỷ lệ, cover = fill container
          display: "block",
        }}
        muted={!sound}
        volume={sound ? volume : 0}
        loop={loop}
        playbackRate={playbackRate}
        startFrom={Math.max(0, (frame - startFrame) / fps)}
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
