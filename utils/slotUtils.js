// utils/slotUtils.js  (add this helper)
exports.generate15MinSlots = (start, end) => {
  const slots = [];
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  let cur = sh * 60 + sm;
  const endMin = eh * 60 + em;
  while (cur + 15 <= endMin) {
    const s = `${String(Math.floor(cur/60)).padStart(2,"0")}:${String(cur%60).padStart(2,"0")}`;
    const e = `${String(Math.floor((cur+15)/60)).padStart(2,"0")}:${String((cur+15)%60).padStart(2,"0")}`;
    slots.push({ start: s, end: e });
    cur += 15;
  }
  return slots;
};