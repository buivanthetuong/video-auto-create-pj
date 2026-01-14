import React, { useState, useEffect } from "react";
import {
  Html5Video,
  staticFile,
  continueRender,
  delayRender,
  useCurrentFrame,
  interpolate,
  spring,
  Easing,
  useVideoConfig,
} from "remotion";

/**
 * Component hiển thị video với Remotion-native animations
 * ⭐ Breathing, bounce, fade animations
 */
const VideoView = ({
  video,
  frame,
  styCss = {},
  startFrame = 0,
  endFrame = 300,
  videoSize = "800px",
  fps = 30,
  data = {},
  sound = true,
  volume = 1,
  loop = false,
  playbackRate = 1,
  fullscreen = false,
  // ⭐ Animation options
  breathingAnimation = false,
  breathingDuration = 300,
  bounceIn = false,
  fadeIn = false,
  ...props
}) => {
  const currentFrame = useCurrentFrame();
  const { fps: configFps } = useVideoConfig();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadedVideoSrc, setLoadedVideoSrc] = useState(null);
  const [handle] = useState(() => delayRender("Loading video"));

  // ✅ Get video path
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

  // ✅ Pre-load video
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

  // ⭐ Breathing scale (loop)
  const breathingScale = breathingAnimation
    ? interpolate(
        currentFrame % breathingDuration,
        [0, breathingDuration / 2, breathingDuration],
        [1, 1.5, 1],
        {
          easing: Easing.inOut(Easing.ease),
        },
      )
    : 1;

  // ⭐ Bounce in (once)
  const bounceScale = bounceIn
    ? spring({
        frame: currentFrame - startFrame,
        fps: configFps,
        config: { damping: 15, stiffness: 200 },
      })
    : 1;

  // ⭐ Fade in (once)
  const opacity = fadeIn
    ? interpolate(currentFrame - startFrame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  // ⭐ Combine animations
  const finalScale = breathingScale * bounceScale;

  // Debug log
  if ((breathingAnimation || bounceIn) && currentFrame % 30 === 0) {
    console.log(`🎬 Frame ${currentFrame}:`, {
      breathing: breathingScale.toFixed(2),
      bounce: bounceScale.toFixed(2),
      final: finalScale.toFixed(2),
      opacity: opacity.toFixed(2),
    });
  }

  // ✅ Visibility checks
  if (frame < startFrame || frame > endFrame) return null;
  if (!videoLoaded) return null;
  if (!videoPath) return null;

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

  // ✅ Extract transform from styCss to avoid conflicts
  const { transform: _, ...styCssWithoutTransform } = styCss;

  // ✅ Default styles
  const defaultStyle = fullscreen
    ? {
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        zIndex: -1,
        transformOrigin: "center center",
      }
    : {
        width: videoSize,
        height: videoSize,
        objectFit: "cover",
        borderRadius: "20px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
        transformOrigin: "center center",
      };

  // ✅ Final video styles
  const finalVideoStyle = {
    ...defaultStyle,
    ...styCssWithoutTransform,
  };

  // ✅ Container styles with animations
  const containerStyle = fullscreen
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: styCss.zIndex || -1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // ⭐ Apply animations to container
        transform: `scale(${finalScale})`,
        opacity,
        transformOrigin: "center center",
      }
    : {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        // ⭐ Apply animations to container
        transform: `scale(${finalScale})`,
        opacity,
        transformOrigin: "center center",
      };

  return (
    <div style={containerStyle}>
      <Html5Video
        src={loadedVideoSrc}
        volume={sound ? volume : 0}
        muted={!sound}
        loop={loop}
        playbackRate={playbackRate}
        style={finalVideoStyle}
        onError={(err) => {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Video playback error [${video}]:`, err.message);
          }
        }}
      />
    </div>
  );
};

// ⭐ EXPORT DEFAULT
export default VideoView;
