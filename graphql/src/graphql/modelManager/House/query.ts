import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { House } from 'nexus-prisma'

export const HousesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('houseConnection', {
      type: House.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.house.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.house.count()
          },
        })
      },
    })
    t.field('getHouse', {
      type: House.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.house.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})