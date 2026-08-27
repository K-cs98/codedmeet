import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, creatorId, amount, type, description } = body;

    if (!userId || !creatorId || !amount || !type) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    if (type === 'SUBSCRIPTION') {
      const subscription = await prisma.subscription.create({
        data: {
          subscriberId: userId,
          creatorId: creatorId,
          price: parseFloat(amount),
          active: true,
        },
      });

      await prisma.transaction.create({
        data: {
          userId,
          amount: parseFloat(amount),
          type: 'SUBSCRIPTION',
          description: description || `Monthly Subscription to Creator ${creatorId}`,
        },
      });

      return NextResponse.json({ success: true, subscription });
    }

    if (type === 'TIP') {
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          amount: parseFloat(amount),
          type: 'TIP',
          description: description || `Tip to Creator ${creatorId}`,
        },
      });

      return NextResponse.json({ success: true, transaction });
    }

    return NextResponse.json({ error: 'Invalid transaction type' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Transaction failed' }, { status: 500 });
  }
}