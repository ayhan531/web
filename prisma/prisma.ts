import { PrismaClient } from '@prisma/client';

// Prisma Client yapılandırma seçenekleri
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = global.prisma ?? prismaClientSingleton();

// Development modunda hot-reloading için global instance'ı sakla
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
