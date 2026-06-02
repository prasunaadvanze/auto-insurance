import { NextRequest } from "next/server";
import api from "@/app/lib/api";

export async function POST(req: NextRequest) {
  try {
    // ✅ parse request body
    const body = await req.json();

  

    // ✅ call backend API
    const { data } = await api.post("quote/start", body);

    // ✅ return response
    return Response.json(data);

  } catch (error) {


    return Response.json(
      { error: "Failed to start quote" },
      { status: 500 }
    );
  }
}