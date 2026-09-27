import { ImageResponse } from "next/og";

export const alt = "Patrick Fruean — Full-Stack Developer and Computer Science Student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#07111f", color: "#f4f9ff", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "82px", fontFamily: "Arial, sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", width: 520, height: 520, borderRadius: 999, right: -100, top: -180, background: "radial-gradient(circle, #275cd0 0%, transparent 70%)", opacity: .55 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#79ddff", fontSize: 24, letterSpacing: 4, textTransform: "uppercase" }}><span style={{ width: 52, height: 2, background: "#79ddff" }} /> Portfolio / 2026</div>
      <div style={{ fontSize: 86, fontWeight: 700, lineHeight: 1, letterSpacing: -5, marginTop: 36 }}>Patrick Fruean.</div>
      <div style={{ fontSize: 31, color: "#aebed1", marginTop: 28 }}>Full-Stack Developer · Computer Science · Systems & Security</div>
      <div style={{ fontSize: 24, color: "#79ddff", marginTop: 68 }}>Practical software, grounded in systems thinking.</div>
    </div>,
    size,
  );
}
