// Animation effects presets (using keyframes from animations.css)

const ObjEffect = {
  // Xoay và phóng to rồi chậm lại
  spinSlowDown: {
    animation: "spinSlowDown 1.5s ease-out forwards",
  },

  // Fade in + scale từ nhỏ lên
  fadeInScale: {
    animation: "fadeInScale 0.8s ease-out forwards",
  },

  // Fade in trượt từ trái sang
  fadeInSlideLeft: {
    animation: "fadeInSlideLeft 0.8s ease-out forwards",
  },

  // Fade in trượt từ phải sang
  fadeInSlideRight: {
    animation: "fadeInSlideRight 0.8s ease-out forwards",
  },

  // Fade in trượt từ dưới lên
  fadeInSlideBottom: {
    animation: "fadeInSlideBottom 0.8s ease-out forwards",
  },

  // Hiệu ứng bật nảy vào
  bounceIn: {
    animation: "bounceIn 0.9s ease-out forwards",
  },

  // Phóng to từ tâm
  zoomIn: {
    animation: "zoomIn 0.8s ease-out forwards",
  },

  // Zoom in/out lặp lại (dùng cho icon, button, v.v.)
  zoomInOutLoop: {
    animation: "zoomInOut 1.6s ease-in-out infinite",
  },

  // Xoay chậm lặp lại (dùng cho background, icon, v.v.)
  slowRotateLoop: {
    animation: "slowRotate 12s linear infinite",
  },
};

export { ObjEffect };
