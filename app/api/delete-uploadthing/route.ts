// app/api/delete-uploadthing/route.ts
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: Request) {
  const { fileKey } = await req.json();

  try {
    const res = await utapi.deleteFiles(fileKey); // accepts string or string[]
    return Response.json({ success: true, res });
  } catch (err) {
    return Response.json({ success: false, error: err }, { status: 500 });
  }
}
