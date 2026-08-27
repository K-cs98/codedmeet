import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No image files uploaded" },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      // Validate File Types
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.name}` },
          { status: 400 }
        );
      }

      // Max size check (5MB)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File too large (max 5MB): ${file.name}` },
          { status: 400 }
        );
      }

      // Simulate cloud storage upload URL return (e.g. S3 / Cloudflare R2 bucket link)
      const mockCloudUrl = `https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&file=${encodeURIComponent(
        file.name
      )}`;
      uploadedUrls.push(mockCloudUrl);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (err) {
    console.error("[UPLOAD_ERROR]", err);
    return NextResponse.json(
      { error: "Image processing failed" },
      { status: 500 }
    );
  }
}