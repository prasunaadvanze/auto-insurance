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
    const { data } = await api.post("quote/next", body);

    return Response.json(data);
  } catch (error) {
    console.error("NEXT ERROR:", error);
    return Response.json(
      { error: "Failed to process next step" },
      { status: 500 },
    );
  }
}
