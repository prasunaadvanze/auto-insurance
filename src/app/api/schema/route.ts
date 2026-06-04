import { NextRequest } from "next/server";
import { createBackendClient } from "@/app/lib/api";
import { getBearerToken, unauthorizedResponse } from "@/app/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    const accessToken = getBearerToken(req);
    if (!accessToken) {
      return unauthorizedResponse();
    }

    const { searchParams } = new URL(req.url);
    const stepId = searchParams.get("stepId");

    if (!stepId) {
      return Response.json({ error: "stepId is required" }, { status: 400 });
    }

    const api = createBackendClient(accessToken);
    const { data } = await api.get(`/Schema/${stepId}`);

    return Response.json(data);
  } catch (error) {
    console.error("SCHEMA ERROR:", error);
    return Response.json({ error: "Failed to fetch schema" }, { status: 500 });
  }
}
