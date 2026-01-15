import React, { useState, useEffect } from "react";
import { staticFile, continueRender, delayRender } from "remotion";

/**
 * Component hiển thị hình ảnh với pre-loading và custom styling
 * ⭐ Pattern giống TypingText - nhận data object
 * ⭐ Hỗ trợ CSS animation loop
 * ⭐ styleCss cho div wrapper, styleCssElement cho img element
 */
const ImageView = ({
  img,
  frame,
  styleCss = {}, // ⭐ Style cho div wrapper
  styleCssElement = {}, // ⭐ Style cho img element
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
  // ⭐ Lấy id/class từ dataAction hoặc data
  const elementId = dataAction.id || null;
  const elementClass = dataAction.className || data.className;
  // ✅ Logic lấy image path
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
      image.onload = null;
      image.onerror = null;
    };
  }, [imgPath, handle]);

  // ✅ Check visibility
  if (frame < startFrame || frame > endFrame) return null;
  if (!imageLoaded) return null;
  if (!imgPath) return null;

  // ✅ Nếu image load fail
  if (!loadedImageSrc) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <p style={{ color: "red", fontWeight: "bold" }}>
          Image not found: {img}
        </p>
      </div>
    );
  }

  // ✅ Default style cho div wrapper
  const defaultDivStyle = {
    width: imgSize,
    height: imgSize,
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
    overflow: "hidden", // Để img không tràn ra ngoài
  };

  // ✅ Default style cho img - fix với div (100% width/height)
  const defaultImgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  // ✅ Merge styles
  const finalDivStyle = {
    ...defaultDivStyle,
    ...styleCss, // ⭐ Override bằng styleCss
  };

  const finalImgStyle = {
    ...defaultImgStyle,
    ...styleCssElement, // ⭐ Override bằng styleCssElement
  };

  return (
    <div id={elementId} className={elementClass} style={finalDivStyle}>
      <img src={loadedImageSrc} alt={img} style={finalImgStyle} />
    </div>
  );
};

export default ImageView;
