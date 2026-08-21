import { NextRequest, NextResponse } from 'next/server';
import { getServerDatabase, saveServerDatabase } from '@/lib/server-db';
import { Transaction } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');

    const db = getServerDatabase();
    let txs = db.transactions || [];

    if (type) {
      txs = txs.filter(t => t.type === type);
    }
    if (category) {
      txs = txs.filter(t => t.category === category);
    }

    const totalIncome = (db.transactions || [])
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const totalExpense = (db.transactions || [])
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const netProfit = totalIncome - totalExpense;

    return NextResponse.json({
      success: true,
      summary: {
        totalIncome,
        totalExpense,
        netProfit,
        marginPercent: totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : 0,
      },
      count: txs.length,
      data: txs,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve transactions', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.amount || !body.description || !body.type) {
      return NextResponse.json(
        { success: false, message: 'amount, description, and type (income|expense) are required' },
        { status: 400 }
      );
    }

    const db = getServerDatabase();
    const newTx: Transaction = {
      id: body.id || `tx-${Date.now()}`,
      date: body.date || new Date().toISOString().split('T')[0],
      type: body.type,
      category: body.category || 'membership',
      amount: Number(body.amount),
      description: body.description,
    };

    db.transactions = [newTx, ...(db.transactions || [])];
    saveServerDatabase(db);

    return NextResponse.json({ success: true, data: newTx }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create transaction', error: String(error) },
      { status: 500 }
    );
  }
}
