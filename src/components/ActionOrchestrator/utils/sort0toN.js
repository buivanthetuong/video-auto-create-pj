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
