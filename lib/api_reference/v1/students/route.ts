import { NextRequest, NextResponse } from 'next/server';
import { getServerDatabase, saveServerDatabase } from '@/lib/server-db';
import { Student } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const escuadronId = searchParams.get('escuadronId');
    const search = searchParams.get('search')?.toLowerCase();

    const db = getServerDatabase();
    let students = db.students || [];

    if (status) {
      students = students.filter(s => s.status === status);
    }
    if (escuadronId) {
      students = students.filter(s => s.escuadronId === escuadronId);
    }
    if (search) {
      students = students.filter(
        s =>
          s.name.toLowerCase().includes(search) ||
          s.email.toLowerCase().includes(search) ||
          s.phone.includes(search)
      );
    }

    return NextResponse.json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve students', error: String(error) },
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
    const newStudent: Student = {
      id: body.id || `std-${Date.now()}`,
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      instructorAssigned: body.instructorAssigned || 'Paulo (Head Coach)',
      status: body.status || 'active',
      plan: body.plan || 'Reto 21 Días',
      startDate: body.startDate || new Date().toISOString().split('T')[0],
      renewalDate: body.renewalDate || '',
      physicalGoal: body.physicalGoal || '',
      weightKg: Number(body.weightKg) || 70,
      workoutLevel: body.workoutLevel || 'Principiante',
      nutritionPlan: body.nutritionPlan || 'Nutrición Anti-inflamatoria',
      allergiesOrRestrictions: body.allergiesOrRestrictions || 'Ninguna',
      spiritualIntention: body.spiritualIntention || '',
      mentorshipNotes: body.mentorshipNotes || '',
      escuadronId: body.escuadronId || 'Paz-Alfa',
      phase: body.phase || '1 - Iniciación',
      hubConsumption: body.hubConsumption || { snackBar: false, merchandise: false, preventiveMedicine: false },
      avatarUrl: body.avatarUrl || '',
    };

    db.students = [newStudent, ...(db.students || [])];
    saveServerDatabase(db);

    return NextResponse.json({ success: true, data: newStudent }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create student', error: String(error) },
      { status: 500 }
    );
  }
}
