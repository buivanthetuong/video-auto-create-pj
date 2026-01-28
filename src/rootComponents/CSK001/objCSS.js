// CSS presets collection

const ObjCSS = {
  textCSS: {
    textCss_001: {
      fontWeight: 900,
      borderTop: "1px solid black",
      borderRadius: "20px",
      textAlign: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      lineHeight: 1.75,
      letterSpacing: "0.5px",
      color: "#ffffff",
      zIndex: 2,
    },
    textCss_hook: {
      fontWeight: 800,
      lineHeight: 1.6,
      letterSpacing: "0.3px",
      color: "#ffffff",
      textAlign: "center",

      padding: "20px 32px",
      borderRadius: "16px",

      zIndex: 2,
    },
    textCss_xoay: {
      fontSize: "90px",
      fontWeight: 600,
      lineHeight: 1.6,
      letterSpacing: "0.3px",
      color: "#ffffff",
      textAlign: "center",

      padding: "20px 32px",
      borderRadius: "16px",

      // Đặt display: inline-block để text không chiếm full width
      display: "inline-block",

      animation: "spinSlowDown 3s ease-out forwards",
      animationIterationCount: "1",
      transformOrigin: "center center",

      textShadow: "0 4px 12px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.4)",

      zIndex: 2,
    },
    textCss_none: {
      display: "none",
    },
  },

  imgCSS: {
    imgCss_001: {
      width: "300px",
      height: "300px",
      objectFit: "cover",
      borderRadius: "16px",
    },
    imgCss_002: {
      width: "600px",
      height: "600px",
      objectFit: "cover",
      borderRadius: "16px",
    },
    imgCss_003: {
      width: "900px",
      height: "900px",
      objectFit: "cover",
      borderRadius: "16px",
    },
    imgCss_none: {
      display: "none",
    },
    imgCss_FullScreen: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    imgCss_xoay: {
      width: "300px",
      height: "300px",
      maxWidth: "90%",
      maxHeight: "90%",
      objectFit: "contain", // ⭐ Đổi từ "cover" thành "contain" để giữ nguyên ảnh
      filter:
        "drop-shadow(0 0 10px rgba(255,255,255,0.8)) drop-shadow(0 0 20px rgba(255,255,0,0.5))", // ⭐ Viền phát sáng
      animation: "spinSlowDown 3s ease-out forwards",
      animationIterationCount: "1",
    },
  },
};

export { ObjCSS };
export default ObjCSS;
