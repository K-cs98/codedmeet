import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { id: true, name: true, role: true, image: true },
        },
        _count: {
          select: { likes: true, comments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch feed posts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { authorId, content, mediaUrl, isPaywalled, price } = body;

    if (!authorId || !content) {
      return NextResponse.json({ error: 'Missing authorId or content' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        authorId,
        content,
        mediaUrl: mediaUrl || null,
        isPaywalled: Boolean(isPaywalled),
        price: isPaywalled ? parseFloat(price) || 0.0 : 0.0,
      },
      include: {
        author: {
          select: { id: true, name: true, role: true, image: true },
        },
        _count: {
          select: { likes: true, comments: true },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}