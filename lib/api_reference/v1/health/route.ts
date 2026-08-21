import { NextResponse } from 'next/server';
import { getServerDatabase } from '@/lib/server-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getServerDatabase();
    
    return NextResponse.json({
      status: 'healthy',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      counts: {
        students: db.students?.length || 0,
        leads: db.leads?.length || 0,
        transactions: db.transactions?.length || 0,
        recipes: db.recipes?.length || 0,
        inventory: db.inventory?.length || 0,
        sops: db.sopsList?.length || 0,
      },
      firebase: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'templefit-74297',
        status: 'configured',
      }
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Internal Server Error', error: String(error) },
      { status: 500 }
    );
  }
}
