import { NextRequest, NextResponse } from 'next/server';
import { getServerDatabase, saveServerDatabase } from '@/lib/server-db';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getServerDatabase();
    const lead = (db.leads || []).find(l => l.id === params.id);

    if (!lead) {
      return NextResponse.json(
        { success: false, message: `Lead with id '${params.id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve lead', error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const db = getServerDatabase();
    const index = (db.leads || []).findIndex(l => l.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: `Lead with id '${params.id}' not found` },
        { status: 404 }
      );
    }

    const updatedLead = {
      ...db.leads[index],
      ...body,
      id: params.id,
    };

    db.leads[index] = updatedLead;
    saveServerDatabase(db);

    return NextResponse.json({ success: true, data: updatedLead });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update lead', error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getServerDatabase();
    const exists = (db.leads || []).some(l => l.id === params.id);

    if (!exists) {
      return NextResponse.json(
        { success: false, message: `Lead with id '${params.id}' not found` },
        { status: 404 }
      );
    }

    db.leads = (db.leads || []).filter(l => l.id !== params.id);
    saveServerDatabase(db);

    return NextResponse.json({
      success: true,
      message: `Lead with id '${params.id}' deleted successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete lead', error: String(error) },
      { status: 500 }
    );
  }
}
