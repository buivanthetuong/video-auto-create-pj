

// src/utils/cssUtils.js
export const VideoPresets = {
  // ⭐ Looping background với id cụ thể
  loopingBackground: (video, options = {}) => {
    const videoId = options.id || `video-${video.replace(/\./g, "-")}`;

    return {
      cmd: "videoView",
      video,
      videoSize: "200%",
      loop: true,
      sound: false,
      ToEndFrame: true,
      volume: options.volume || 0,

      // ⭐ ID để target animations
      id: videoId,

      // ⭐ STYLE cho container
      styleCss: {
        position: "fixed",
        inset: 0,
        left: -100,
        width: "1400px",
        // height: "2000px",
        overflow: "hidden",
        backgroundColor: "transparent",
        zIndex: options.zIndex ?? -1,

        transform: "translate(-20%, -20%)",
        ...options.styleCss,
      },

      // ⭐ ANIMATIONS với target cụ thể
      animations: [
        // Pan animation cho container
        options.panAnimation !== false && {
          type: "pan",
          target: `#${videoId}`, // ⭐ Target container
          duration: options.panDuration || 150,
          startFrame: 0,
          panAmount: options.panAmount || 5,
          loop: true,
        },

        // Zoom animation cho video element
        options.zoomInOut && {
          type: "zoom",
          target: `#${videoId}-video`, // ⭐ Target video bên trong
          duration: options.panDuration || 150,
          startFrame: 0,
          zoomMin: options.zoomMin || 1.0,
          zoomMax: options.zoomMax || 1.2,
          loop: true,
        },

        // Breathing animation
        options.breathingAnimation && {
          type: "breathing",
          target: `#${videoId}`, // ⭐ Target container
          duration: options.breathingDuration || 300,
          startFrame: 0,
          loop: true,
        },

        // Fade in
        options.fadeIn && {
          type: "fadeIn",
          target: `#${videoId}`, // ⭐ Target container
          duration: 30,
          startFrame: 0,
        },
      ].filter(Boolean),

      ...options,
    };
  },

  // ⭐ Ken Burns effect
  kenBurnsVideo: (video, options = {}) => {
    const videoId = options.id || `kburns-${video.replace(/\./g, "-")}`;

    return {
      cmd: "videoView",
      video,
      loop: true,
      sound: false,
      ToEndFrame: true,
      id: videoId,

      styleCss: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...options.styleCss,
      },

      animations: [
        {
          type: "kenBurns",
          target: `#${videoId}-video`, // ⭐ Target video
          duration: options.duration || 300,
          startScale: options.startScale || 1.0,
          endScale: options.endScale || 1.3,
          startX: options.startX || 0,
          endX: options.endX || -50,
          loop: options.loop !== false,
        },
      ],

      ...options,
    };
  },
};


export default {
 
  VideoPresets,

};
