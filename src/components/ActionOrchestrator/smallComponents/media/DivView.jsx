// src/Components/ActionOrchestrator/smallComponents/media/VideoView.jsx
import React from "react";
import { useCurrentFrame } from "remotion";
import {
  useAnimations,
  getAnimationStyle,
} from "../../utils/animations/animationResolver.js";

const DivView = ({
  frame,
  styCss = {},
  startFrame = 0,
  endFrame = 300,
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

  // Visibility check
  if (frame < startFrame || frame > endFrame) return null;

  // ⭐ BUILD SELECTOR
  const containerSelector = elementId ? `#${elementId}` : null;

  // ⭐ CONTAINER STYLE - styCss + animation
  const containerStyle = containerSelector
    ? getAnimationStyle(animationStyles, containerSelector, styCss)
    : styCss;

  // Debug
  if (currentFrame % 60 === 0 && elementId) {
    console.log(`🎬 DivView [${elementId}] - Frame ${currentFrame}`, {
      containerSelector,
      hasContainerAnimation: !!animationStyles[containerSelector],
    });
  }

  return (
    <div id={elementId} className={elementClass} style={containerStyle}></div>
  );
};

export default DivView;
