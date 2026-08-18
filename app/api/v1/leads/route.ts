import { NextRequest, NextResponse } from 'next/server';
import { getServerDatabase, saveServerDatabase } from '@/lib/server-db';
import { Lead } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const source = searchParams.get('source');

    const db = getServerDatabase();
    let leads = db.leads || [];

    if (status) {
      leads = leads.filter(l => l.status === status);
    }
    if (source) {
      leads = leads.filter(l => l.source === source);
    }

    return NextResponse.json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve leads', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, message: 'Name and phone are required fields' },
        { status: 400 }
      );
    }

    const db = getServerDatabase();
    const newLead: Lead = {
      id: body.id || `ld-${Date.now()}`,
      name: body.name,
      phone: body.phone,
      source: body.source || 'whatsapp',
      status: body.status || 'new',
      notes: body.notes || '',
      dateAdded: body.dateAdded || new Date().toISOString().split('T')[0],
    };

    db.leads = [newLead, ...(db.leads || [])];
    saveServerDatabase(db);

    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create lead', error: String(error) },
      { status: 500 }
    );
  }
}
