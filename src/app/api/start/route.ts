import { NextRequest } from "next/server";
import { createBackendClient } from "@/app/lib/api";
import { getBearerToken, unauthorizedResponse } from "@/app/lib/serverAuth";

export async function POST(req: NextRequest) {
  try {
    const accessToken = getBearerToken(req);
    if (!accessToken) {
      return unauthorizedResponse();
    }

    const body = await req.json();
    const api = createBackendClient(accessToken);
    const { data } = await api.post("quote/start", body);

    return Response.json(data);
  } catch (error) {
    console.error("START ERROR:", error);
    return Response.json({ error: "Failed to start quote" }, { status: 500 });
  }
}
