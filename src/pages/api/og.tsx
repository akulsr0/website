import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(req: NextRequest) {
  const urlParams = req.nextUrl.searchParams;

  const title = urlParams.get("title") || "";
  const footer = urlParams.get("footer") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1e1e1e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "center",
          paddingTop: 48,
        }}
      >
        <img
          style={{ width: 96, height: 96, borderRadius: "100%" }}
          src="https://github.com/akulsr0.png"
          alt="akul"
        />
        <p
          style={{
            color: "#ece3cc",
            fontSize: 28,
            fontWeight: "bold",
            padding: "0 32px",
            textAlign: "center",
            marginTop: 36,
          }}
        >
          {title}
        </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ color: "#F8EFBA", fontSize: 22, margin: 0 }}>{footer}</p>
        </div>
      </div>
    ),
    {
      width: 720,
      height: 360,
    }
  );
}
