const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Sample test entries
  const testEntries = [
    {
      email: 'test1@example.com',
      role: 'developer',
      createdAt: new Date('2023-12-01')
    },
    {
      email: 'test2@example.com',
      role: 'designer',
      createdAt: new Date('2023-12-05')
    },
    {
      email: 'test3@example.com',
      role: 'business',
      createdAt: new Date('2023-12-10')
    }
  ]

  for (const entry of testEntries) {
    await prisma.waitlistEntry.create({
      data: entry
    })
  }

  console.log('Database seeded with test entries!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
