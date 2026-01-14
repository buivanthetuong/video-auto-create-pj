/**
 * Dynamic root component loader
 * Thay đổi ./rootComponents/[-----------]/R_A001.js
 */
import * as rootModule from "./rootComponents/CSK001/R_A001.jsx";

// Re-export the RemotionVideo component
export const RemotionVideo = rootModule.RemotionVideo;

// Log để biết đang dùng project nào
console.log(`🎬 Loaded Remotion Root: CSK`);
