// ============================================
// 🎨 CSS UTILITIES & PRESETS
// ============================================

// ============================================
// 📐 COMMON STYLES
// ============================================

export const CommonStyles = {
  // Text styles
  textCenter: {
    textAlign: "center",
  },

  textShadowStrong: {
    textShadow: "0 4px 20px rgba(0,0,0,0.8)",
  },

  textShadowSoft: {
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
  },

  // Position helpers
  absoluteCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  absoluteFull: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  relativeFull: {
    position: "relative",
    width: "100%",
    height: "100%",
  },

  // Background helpers
  bgCover: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },

  bgContain: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
};

// ============================================
// 🎬 VIDEO PRESETS
// ============================================

export const VideoPresets = {
  // ⭐ Looping background với Remotion breathing
  loopingBackground: (video, options = {}) => ({
    cmd: "videoView",
    video,
    videoSize: "100%",
    loop: true,
    sound: false,
    ToEndFrame: true,
    volume: options.volume || 0,
    fullscreen: options.fullscreen !== false,
    // ⭐ Enable Remotion breathing animation
    breathingAnimation: options.breathingAnimation !== false,
    breathingDuration: options.breathingDuration || 300, // 10s @ 30fps
    styleCss: {
      position: "fixed",
      top: "50%",
      left: "50%",
      width: "100vw",
      height: "100vh",
      minWidth: "100vw",
      minHeight: "100vh",
      objectFit: "cover",
      zIndex: options.zIndex ?? -1,
      // ⭐ Không cần CSS animation nữa
      ...options.styleCss,
    },
    ...options,
  }),

  // ... other presets
};
// ============================================
// 🖼️ IMAGE PRESETS
// ============================================

export const ImagePresets = {
  // Hero image with animation
  hero: (img, options = {}) => ({
    cmd: "imageView",
    img,
    imgSize: options.size || "800px",
    delay: options.delay,
    ToEndFrame: options.ToEndFrame,
    styleCss: {
      width: options.size || "800px",
      height: options.size || "800px",
      objectFit: "cover",
      borderRadius: "30px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
      animation: "pulse 2s ease-in-out infinite",
      ...options.styleCss,
    },
    ...options,
  }),

  // Circle avatar
  avatar: (img, size = "400px", options = {}) => ({
    cmd: "imageView",
    img,
    imgSize: size,
    delay: options.delay,
    ToEndFrame: options.ToEndFrame,
    styleCss: {
      width: size,
      height: size,
      borderRadius: "50%",
      objectFit: "cover",
      border: "5px solid white",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
      ...options.styleCss,
    },
    ...options,
  }),

  // Background image
  background: (img, options = {}) => ({
    cmd: "imageView",
    img,
    imgSize: "100%",
    ToEndFrame: options.ToEndFrame,
    styleCss: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 1,
      ...options.styleCss,
    },
    ...options,
  }),
};

// ============================================
// 📝 TEXT PRESETS
// ============================================

export const TextPresets = {
  // Hero title
  heroTitle: (text, options = {}) => ({
    cmd: "typingText",
    text,
    sound: options.sound !== false,
    noTyping: options.noTyping || false,
    delay: options.delay,
    ToEndFrame: options.ToEndFrame,
    styleCss: {
      position: "absolute",
      top: options.top || "100px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "80px",
      fontWeight: "bold",
      color: "white",
      zIndex: 10,
      textShadow: "0 4px 20px rgba(0,0,0,0.8)",
      textAlign: "center",
      ...options.styleCss,
    },
    ...options,
  }),

  // Subtitle
  subtitle: (text, options = {}) => ({
    cmd: "typingText",
    text,
    noTyping: true,
    sound: false,
    delay: options.delay,
    ToEndFrame: options.ToEndFrame,
    styleCss: {
      position: "absolute",
      bottom: options.bottom || "150px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "50px",
      color: "white",
      zIndex: 10,
      textShadow: "0 2px 10px rgba(0,0,0,0.6)",
      ...options.styleCss,
    },
    ...options,
  }),

  // Centered overlay
  centerOverlay: (text, options = {}) => ({
    cmd: "typingText",
    text,
    sound: options.sound !== false,
    delay: options.delay,
    ToEndFrame: options.ToEndFrame,
    styleCss: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: options.fontSize || "60px",
      color: options.color || "white",
      fontWeight: "bold",
      zIndex: 10,
      textShadow: "0 4px 20px rgba(0,0,0,0.8)",
      ...options.styleCss,
    },
    ...options,
  }),
};

// ============================================
// 🎯 COMPLETE ITEM TEMPLATES
// ============================================

// ⭐ Background video với looping và scale animation
export const itemLoopingVideoBackground = (video, text, options = {}) => ({
  IDMark: options.idMark || "looping-bg-section",
  startFrame: options.startFrame || 0,
  endFrame: options.endFrame || 300,
  styleCss: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden", // ⭐ Ẩn phần video thừa
  },
  actions: [
    // ⭐ Looping background video với scale animation
    VideoPresets.loopingBackground(video, {
      ToEndFrame: true,
    }),

    // Overlay text
    {
      cmd: "typingText",
      text,
      delay: options.textDelay || 30,
      ToEndFrame: true,
      styleCss: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: options.fontSize || "80px",
        color: options.textColor || "white",
        zIndex: 10,
        textShadow: "0 4px 20px rgba(0,0,0,0.8)",
        fontWeight: "bold",
        textAlign: "center",
      },
    },

    // ⭐ Additional actions (có thể thêm)
    ...(options.additionalActions || []),
  ],
});

// Background video with overlay text
export const itemVideoBackground = (video, text, options = {}) => ({
  IDMark: options.idMark || "hero-section",
  startFrame: options.startFrame || 0,
  endFrame: options.endFrame || 300,
  styleCss: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  actions: [
    // Background video
    VideoPresets.background(video, {
      ToEndFrame: options.ToEndFrame,
    }),

    // Overlay text
    {
      cmd: "typingText",
      text,
      delay: options.textDelay || 30,
      ToEndFrame: options.ToEndFrame,
      styleCss: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: options.fontSize || "80px",
        color: options.textColor || "white",
        zIndex: 10,
        textShadow: "0 4px 20px rgba(0,0,0,0.8)",
        fontWeight: "bold",
        textAlign: "center",
      },
    },

    // ⭐ Additional actions
    ...(options.additionalActions || []),
  ],
});

// Image with text overlay
export const itemImageOverlay = (img, text, options = {}) => ({
  IDMark: options.idMark || "image-section",
  startFrame: options.startFrame || 0,
  endFrame: options.endFrame || 150,
  styleCss: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  actions: [
    // Background image
    ImagePresets.background(img, {
      ToEndFrame: options.ToEndFrame,
    }),

    // Text overlay
    TextPresets.centerOverlay(text, options),

    // ⭐ Additional actions
    ...(options.additionalActions || []),
  ],
});

// PIP video with main content
export const itemPIPVideo = (mainVideo, pipVideo, options = {}) => ({
  IDMark: options.idMark || "pip-section",
  startFrame: options.startFrame || 0,
  endFrame: options.endFrame || 300,
  styleCss: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  actions: [
    // Main video
    VideoPresets.fullscreen(mainVideo, {
      sound: true,
      volume: 0,
      ToEndFrame: options.ToEndFrame,
    }),

    // PIP video
    VideoPresets.pip(pipVideo, options.pipPosition || "bottom-right", {
      ToEndFrame: options.pipToEndFrame !== false,
      ...options.pipOptions,
    }),

    // ⭐ Additional actions
    ...(options.additionalActions || []),
  ],
});

// Hero section (image + text)
export const itemHeroSection = (img, title, subtitle, options = {}) => ({
  IDMark: options.idMark || "hero",
  startFrame: options.startFrame || 0,
  endFrame: options.endFrame || 200,
  styleCss: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  actions: [
    // Background
    ImagePresets.background(img, {
      ToEndFrame: options.ToEndFrame,
    }),

    // Title
    TextPresets.heroTitle(title, {
      top: "200px",
      ToEndFrame: options.ToEndFrame,
    }),

    // Subtitle
    TextPresets.subtitle(subtitle, {
      bottom: "200px",
      delay: 30,
      ToEndFrame: options.ToEndFrame,
    }),

    // Center image (optional)
    ...(options.centerImage
      ? [
          ImagePresets.hero(options.centerImage, {
            size: "600px",
            delay: 60,
            ToEndFrame: options.ToEndFrame,
            styleCss: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 5,
            },
          }),
        ]
      : []),

    // ⭐ Additional actions
    ...(options.additionalActions || []),
  ],
});

// ============================================
// 🎨 GRADIENT OVERLAYS
// ============================================

export const GradientOverlays = {
  darkBottom: {
    background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
  },

  darkTop: {
    background: "linear-gradient(to top, transparent, rgba(0,0,0,0.8))",
  },

  darkCenter: {
    background:
      "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
  },

  colorful: {
    background:
      "linear-gradient(135deg, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.6) 100%)",
  },
};

// ============================================
// 🎬 ANIMATIONS
// ============================================

export const Animations = {
  pulse: "pulse 2s ease-in-out infinite",
  zoom: "zoom 3s ease-in-out infinite alternate",
  rotate: "rotate 10s linear infinite",
  float: "float 3s ease-in-out infinite",
  fadeIn: "fadeIn 1s ease-in",
  slideInLeft: "slideInLeft 1s ease-out",
  slideInRight: "slideInRight 1s ease-out",
  breathingScale: "breathingScale 15s ease-in-out infinite alternate", // ⭐ Scale animation
};

// ============================================
// 🎯 DEFAULT EXPORT
// ============================================

export default {
  CommonStyles,
  VideoPresets,
  ImagePresets,
  TextPresets,
  GradientOverlays,
  Animations,
  itemVideoBackground,
  itemLoopingVideoBackground, // ⭐ New template
  itemImageOverlay,
  itemPIPVideo,
  itemHeroSection,
};
