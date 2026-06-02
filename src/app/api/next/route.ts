import { NextRequest } from "next/server";
import api from "@/app/lib/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data } = await api.post("quote/next", body);

    return Response.json(data);

  } catch (error) {
    return Response.json(
      { error: "Failed to process next step" },
      { status: 500 }
    );
  }
}