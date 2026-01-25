import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Otgondavaa";
  const siteName = searchParams.get("siteName") || "otgondavaa.com";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3A86FF",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {siteName}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
