import { NextRequest, NextResponse } from 'next/server';
import { getServerDatabase, saveServerDatabase } from '@/lib/server-db';
import { Recipe } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const db = getServerDatabase();
    let recipes = db.recipes || [];

    if (category) {
      recipes = recipes.filter(r => r.category === category);
    }

    return NextResponse.json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve recipes', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json(
        { success: false, message: 'Recipe name is required' },
        { status: 400 }
      );
    }

    const db = getServerDatabase();
    const newRecipe: Recipe = {
      id: body.id || `rec-${Date.now()}`,
      name: body.name,
      category: body.category || 'bebidas',
      time: Number(body.time) || 10,
      difficulty: body.difficulty || 'Fácil',
      servings: Number(body.servings) || 1,
      description: body.description || '',
      ingredientsText: body.ingredientsText || [],
      steps: body.steps || [],
      macros: body.macros || { calories: 0, protein: 0, fat: 0, carbs: 0 },
      image: body.image || '',
      crmIngredients: body.crmIngredients || [],
      suggestedPrice: Number(body.suggestedPrice) || 0,
    };

    db.recipes = [newRecipe, ...(db.recipes || [])];
    saveServerDatabase(db);

    return NextResponse.json({ success: true, data: newRecipe }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create recipe', error: String(error) },
      { status: 500 }
    );
  }
}
