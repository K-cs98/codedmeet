import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: listingId } = await params;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      // Send initial connection ACK
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: "CONNECTED", listingId })}\n\n`
        )
      );

      // Heartbeat interval to keep connection alive
      const interval = setInterval(() => {
        try {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "PING", timestamp: Date.now() })}\n\n`
            )
          );
        } catch (e) {
          clearInterval(interval);
        }
      }, 15000);

      // Abort subscription on client disconnect
      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}