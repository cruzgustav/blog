import { PrismaClient } from '@prisma/client/edge'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client/web'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const url = process.env.DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN

  // Usa o adaptador do Turso para Cloudflare Edge / Produção
  if (url?.startsWith('libsql://') || url?.startsWith('https://')) {
    const libsql = createClient({
      url: url,
      authToken: authToken,
    })
    const adapter = new PrismaLibSQL(libsql)
    return new PrismaClient({ adapter })
  }

  // Fallback genérico para local
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })
}

// O "Pulo do Gato": Proxy para "atrasar" a inicialização do Prisma.
// Isso garante que o process.env só seja lido DENTRO da requisição do Cloudflare.
export const db = new Proxy({} as PrismaClient, {
  get(_, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createPrismaClient()
    }
    const value = (globalForPrisma.prisma as any)[prop]
    return typeof value === 'function' ? value.bind(globalForPrisma.prisma) : value
  }
})