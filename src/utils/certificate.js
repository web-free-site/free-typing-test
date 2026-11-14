import { SITE_NAME } from "../config/site";

export function downloadCertificatePng({
  name,
  wpm,
  accuracy,
  isLight,
}) {
  const displayName = (name || "Typist").trim().slice(0, 48);
  const date = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const width = 900;
  const height = 630;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const bg = isLight ? "#fafafa" : "#111113";
  const fg = isLight ? "#18181b" : "#f4f4f5";
  const accent = "#9b72ff";

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = accent;
  ctx.lineWidth = 6;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  ctx.fillStyle = accent;
  ctx.font = "bold 42px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(SITE_NAME, width / 2, 110);

  ctx.fillStyle = fg;
  ctx.font = "28px system-ui, sans-serif";
  ctx.fillText("Certificate of Completion", width / 2, 165);
  ctx.font = "22px system-ui, sans-serif";
  ctx.fillStyle = isLight ? "#52525b" : "#a1a1aa";
  ctx.fillText("(informal practice souvenir — not an official diploma)", width / 2, 200);

  ctx.fillStyle = fg;
  ctx.font = "bold 36px system-ui, sans-serif";
  ctx.fillText(displayName, width / 2, 280);

  ctx.font = "26px system-ui, sans-serif";
  ctx.fillText(`Speed: ${wpm} WPM  •  Accuracy: ${accuracy}%`, width / 2, 340);
  ctx.fillText(`Date: ${date}`, width / 2, 385);

  ctx.font="18px system-ui, sans-serif";
  ctx.fillStyle = isLight ? "#71717a" : "#71717a";
  ctx.fillText("free-typing-test.web-free.site", width / 2, height - 70);

  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "free-typing-test-certificate.png";
  a.click();
  a.remove();
}