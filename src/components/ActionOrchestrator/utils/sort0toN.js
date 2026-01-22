export function Sort0toN(processedGroup) {
  return processedGroup
    .map((item, index) => ({ ...item, __idx: index }))
    .sort((a, b) => {
      const sttA = Number(a?.stt ?? 0);
      const sttB = Number(b?.stt ?? 0);
      if (sttA !== sttB) return sttA - sttB;
      return a.__idx - b.__idx; // giữ thứ tự cũ
    })
    .map(({ __idx, ...item }) => item);
}
export const keepOnlyActionsCodeTimeFixedStt = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((group) => {
    if (!Array.isArray(group)) return [];

    return group.map(({ actions, code, timeFixed, stt }) => ({
      actions: actions ?? [],
      code: code ?? null,
      timeFixed: timeFixed ?? null,
      stt: stt ?? null,
    }));
  });
};

const FPS = 30;

// Convert frame -> seconds string (CSS)
export const fr = (frames, fps = FPS) => `${(frames / fps).toFixed(6)}s`;

// Convert seconds -> frames (round)
export const secToFr = (seconds, fps = FPS) => Math.round(seconds * fps);

// Snap seconds về đúng frame gần nhất
export const snapSecToFrame = (seconds, fps = FPS) => {
  const frames = Math.round(seconds * fps);
  return frames / fps;
};

// Tạo animation CSS đúng frame
export const anim = ({
  name,
  frames, // duration theo frame
  ease = "linear",
  delayFrames = 0,
  fillMode = "forwards",
  iterationCount = 1,
}) => {
  return `${name} ${fr(frames)} ${ease} ${fr(delayFrames)} ${iterationCount} ${fillMode}`;
};
