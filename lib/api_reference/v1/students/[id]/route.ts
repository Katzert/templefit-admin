import { NextRequest, NextResponse } from 'next/server';
import { getServerDatabase, saveServerDatabase } from '@/lib/server-db';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getServerDatabase();
    const student = (db.students || []).find(s => s.id === params.id);

    if (!student) {
      return NextResponse.json(
        { success: false, message: `Student with id '${params.id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve student', error: String(error) },
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
    const index = (db.students || []).findIndex(s => s.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: `Student with id '${params.id}' not found` },
        { status: 404 }
      );
    }

    const updatedStudent = {
      ...db.students[index],
      ...body,
      id: params.id, // Preserve ID
    };

    db.students[index] = updatedStudent;
    saveServerDatabase(db);

    return NextResponse.json({ success: true, data: updatedStudent });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update student', error: String(error) },
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
    const exists = (db.students || []).some(s => s.id === params.id);

    if (!exists) {
      return NextResponse.json(
        { success: false, message: `Student with id '${params.id}' not found` },
        { status: 404 }
      );
    }

    db.students = (db.students || []).filter(s => s.id !== params.id);
    saveServerDatabase(db);

    return NextResponse.json({
      success: true,
      message: `Student with id '${params.id}' deleted successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete student', error: String(error) },
      { status: 500 }
    );
  }
}
