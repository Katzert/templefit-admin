import { NextRequest, NextResponse } from 'next/server';
import { getServerDatabase, saveServerDatabase } from '@/lib/server-db';
import { CRMDatabase } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getServerDatabase();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: db,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to export database', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const incomingDb = (await req.json()) as Partial<CRMDatabase>;

    if (!incomingDb || typeof incomingDb !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Invalid database payload' },
        { status: 400 }
      );
    }

    const currentDb = getServerDatabase();
    const mergedDb: CRMDatabase = {
      ...currentDb,
      ...incomingDb,
      students: incomingDb.students || currentDb.students,
      leads: incomingDb.leads || currentDb.leads,
      transactions: incomingDb.transactions || currentDb.transactions,
      recipes: incomingDb.recipes || currentDb.recipes,
      inventory: incomingDb.inventory || currentDb.inventory,
    };

    saveServerDatabase(mergedDb);

    return NextResponse.json({
      success: true,
      message: 'Database synced successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to sync database', error: String(error) },
      { status: 500 }
    );
  }
}
