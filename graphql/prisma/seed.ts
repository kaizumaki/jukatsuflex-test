import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const suzuki = await prisma.user.upsert({
    where: { email: 'suzuki@prisma.io' },
    update: {},
    create: {
      uid: 'suzuki',
      username: '鈴木',
      email: 'suzuki@prisma.io',
      iconUrl: 'https://avatars.githubusercontent.com/u/6020066?v=4',
      role: 'USER',
      houses: {
        create: [
          {
            name: '横浜市西区建物１',
            address: '〒220-0005 神奈川県横浜市西区南幸２丁目１８',
            fixParts: {
              create: [
                {
                  estimateFixTime: '300',
                  movies: {
                    create: [
                      {
                        estimatedTime: '30',
                        learningTime: '60',
                      },
                    ],
                  },
                },
              ],
            },
            partners: {
              create: [
                {
                  companyName: '株式会社ハウステック',
                  contactPerson: '山田太郎',
                  companyAddress: '〒220-0005 神奈川県横浜市西区南幸２丁目２０',
                  companyTel: '045-000-0000',
                  acceptableAreas: ['横浜市西区', '横浜市南区'],
                },
              ],
            },
          },
        ],
      },
    },
  })
  console.log({ suzuki })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
