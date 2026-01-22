import React, { useState, useEffect } from "react";
import {
  staticFile,
  continueRender,
  delayRender,
  useCurrentFrame,
} from "remotion";
import {
  useAnimations,
  getAnimationStyle,
} from "../../utils/animations/animationResolver.js";

/**
 * Component hiển thị hình ảnh với pre-loading và custom styling
 * ⭐ Pattern giống TypingText - nhận data object
 * ⭐ HỖ TRỢ REMOTION ANIMATIONS thay vì CSS animation loops
 */
const ImageView = ({
  img,
  frame,
  styCss = {},
  startFrame = 30,
  endFrame = 90,
  imgSize = "800px",
  fps = 30,
  data = {},
  dataAction = {},
}) => {
  const currentFrame = useCurrentFrame();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadedImageSrc, setLoadedImageSrc] = useState(null);
  const [handle] = useState(() => delayRender("Loading image"));

  // ⭐ Lấy id/class từ dataAction hoặc data
  const elementId = dataAction.id || data.id;
  const elementClass = dataAction.className || data.className;

  // ⭐ Lấy animations từ data
  const animations = dataAction.animations || data.animations || [];
  const animationStyles = useAnimations(animations);

  // ✅ Logic lấy image path (giống logic trong code cũ)
  const getImagePath = (imgName) => {
    if (!imgName) return null;
    if (imgName.includes("_")) {
      const prefix = imgName.split("_")[0];
      return `assets/${prefix}/${imgName}`;
    } else {
      return `assets/khac/${imgName}`;
    }
  };

  const imgPath = getImagePath(img);

  // ✅ Pre-load image với delayRender/continueRender
  useEffect(() => {
    if (!imgPath) {
      setImageLoaded(true);
      continueRender(handle);
      return;
    }

    const image = new Image();
    image.src = staticFile(imgPath);

    image.onload = () => {
      console.log(`✅ Image loaded: ${imgPath}`);
      setLoadedImageSrc(image.src);
      setImageLoaded(true);
      continueRender(handle);
    };

    image.onerror = () => {
      console.warn(`⚠️ Failed to load image: ${imgPath}`);
      setImageLoaded(true);
      continueRender(handle);
    };

    return () => {
      // Cleanup nếu component unmount
      image.onload = null;
      image.onerror = null;
    };
  }, [imgPath, handle]);

  // ✅ Check visibility (giống TypingText)
  if (frame < startFrame || frame > endFrame) return null;
  if (!imageLoaded) return null;
  if (!imgPath) return null;

  // ✅ Nếu image load fail
  if (!loadedImageSrc) {
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
        Image not found: {img}
      </div>
    );
  }

  // ✅ Default style nếu không có custom
  const defaultStyle = {
    width: imgSize,
    height: imgSize,
    objectFit: "cover",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
  };

  // ⭐ BUILD SELECTOR
  const containerSelector = elementId ? `#${elementId}` : null;

  // ⭐ MERGE: defaultStyle + styCss + animation
  const baseStyle = {
    ...styCss,
  };

  const finalStyle = containerSelector
    ? getAnimationStyle(animationStyles, containerSelector, baseStyle)
    : baseStyle;

  // Debug animations
  if (currentFrame % 60 === 0 && elementId && animations.length > 0) {
    console.log(`🖼️ ImageView [${elementId}] - Frame ${currentFrame}`, {
      containerSelector,
      hasAnimation: !!animationStyles[containerSelector],
      animationCount: animations.length,
    });
  }

  return (
    <img
      id={elementId}
      className={elementClass}
      src={loadedImageSrc}
      alt={data.alt || img || "..."}
      style={finalStyle}
    />
  );
};

export default ImageView;
