import React, { useState, useEffect } from "react";
import { staticFile, continueRender, delayRender } from "remotion";

/**
 * Component hiển thị hình ảnh với pre-loading và custom styling
 * ⭐ Pattern giống TypingText - nhận data object
 * ⭐ Hỗ trợ CSS animation loop
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
  dataAction = {}, // ⭐ Nhận data object như TypingText
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadedImageSrc, setLoadedImageSrc] = useState(null);
  const [handle] = useState(() => delayRender("Loading image"));

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
      <img
        src={loadedImageSrc}
        alt={data.alt || img || "..."}
        style={finalStyle}
      />
    </div>
  );
};

export default ImageView;
