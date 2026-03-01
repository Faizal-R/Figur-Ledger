import { prisma } from '../prisma/PrismaClient'


 export async function connectDB() {
  try {
    await prisma.$connect()
    console.log('Prisma connected successfully✅')
    
  } catch (err) {
    console.error('Prisma connection failed', err)
    process.exit(1) // Hard stop. No zombie service.
  }
}


