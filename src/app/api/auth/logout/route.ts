import { NextResponse } from 'next/server'
export const runtime = 'edge'

import { cookies } from 'next/headers'

import { db } from '@/lib/db'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (token) {
      // Deletar sessão do banco
      await db.session.deleteMany({
        where: { token },
      })
    }

    // Remover cookie
    cookieStore.delete('admin_token')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro no logout:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer logout' },
      { status: 500 }
    )
  }
}
