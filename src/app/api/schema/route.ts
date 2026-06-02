import { NextRequest } from "next/server";
import api from "@/app/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const stepId = searchParams.get("stepId");

    if (!stepId) {
      return Response.json(
        { error: "stepId is required" },
        { status: 400 }
      );
    }

    const { data } = await api.get(`/Schema/${stepId}`);

    return Response.json(data);

  } catch (error) {
    return Response.json(
      { error: "Failed to fetch schema" },
      { status: 500 }
    );
  }
}