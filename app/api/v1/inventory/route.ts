import { NextRequest, NextResponse } from 'next/server';
import { getServerDatabase, saveServerDatabase } from '@/lib/server-db';
import { InventoryItem } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const lowStock = searchParams.get('lowStock') === 'true';

    const db = getServerDatabase();
    let items = db.inventory || [];

    if (category) {
      items = items.filter(i => i.category === category);
    }
    if (lowStock) {
      items = items.filter(i => i.stock <= i.minStock);
    }

    const totalStockValue = (db.inventory || []).reduce(
      (acc, item) => acc + item.cost * item.stock,
      0
    );

    return NextResponse.json({
      success: true,
      count: items.length,
      totalInventoryCostValue: totalStockValue,
      data: items,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve inventory', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || body.price === undefined) {
      return NextResponse.json(
        { success: false, message: 'name and price are required fields' },
        { status: 400 }
      );
    }

    const db = getServerDatabase();
    const newItem: InventoryItem = {
      id: body.id || `inv-${Date.now()}`,
      name: body.name,
      category: body.category || 'suplementos',
      cost: Number(body.cost) || 0,
      price: Number(body.price),
      stock: Number(body.stock) || 0,
      minStock: Number(body.minStock) || 5,
      size: body.size || 'N/A',
      color: body.color || '',
      imageUrl: body.imageUrl || '',
    };

    db.inventory = [newItem, ...(db.inventory || [])];
    saveServerDatabase(db);

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create inventory item', error: String(error) },
      { status: 500 }
    );
  }
}
