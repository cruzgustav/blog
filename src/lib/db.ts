import { PrismaClient } from '@prisma/client/edge'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client/web'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Helper para ler as variaveis de ambiente no Cloudflare
function getEnv(key: string) {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key]
  }
  // Fallback caso globalThis.process não exista no Worker
  // @ts-ignore
  if (typeof globalThis !== 'undefined' && globalThis[key]) {
     // @ts-ignore
    return globalThis[key]
  }
  return ''
}

function createPrismaClient() {
  const databaseUrl = getEnv('DATABASE_URL')
  const authToken = getEnv('TURSO_AUTH_TOKEN')

  // Usa o adaptador do Turso para Cloudflare Edge / Produção
  if (databaseUrl?.startsWith('libsql://') || databaseUrl?.startsWith('https://')) {
    const libsql = createClient({
      url: databaseUrl,
      authToken: authToken,
    })
    const adapter = new PrismaLibSQL(libsql)
    return new PrismaClient({ adapter })
  }

  // Fallback genérico para local
  return new PrismaClient({
    log: getEnv('NODE_ENV') === 'development' ? ['query'] : [],
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (getEnv('NODE_ENV') !== 'production') globalForPrisma.prisma = db