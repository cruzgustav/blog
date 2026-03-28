import { NextResponse } from 'next/server'
export const runtime = 'edge'

import { cookies } from 'next/headers'

import { db } from '@/lib/db'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ admin: null })
    }

    // Buscar sessão
    const session = await db.session.findUnique({
      where: { token },
    })

    if (!session || session.expiresAt < new Date()) {
      // Sessão expirada
      await db.session.deleteMany({
        where: { token },
      })
      cookieStore.delete('admin_token')
      return NextResponse.json({ admin: null })
    }

    // Buscar admin pelo ID
    const admin = await db.admin.findUnique({
      where: { id: session.adminId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
      },
    })

    if (!admin) {
      return NextResponse.json({ admin: null })
    }

    return NextResponse.json({ admin })
  } catch (error) {
    console.error('Erro ao verificar sessão:', error)
    return NextResponse.json({ admin: null })
  }
}
