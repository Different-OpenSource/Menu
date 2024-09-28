import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getStoreMenusWithCategoriesAndItems(storeId: string) {
  return prisma.store.findUnique({
    where: { id: storeId },
    include: {
      activeMenu: {
        include: {
          categories: {
            include: {
              items: {
                include: {
                  itemOptions: {
                    include: {
                      itemOption: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
}
