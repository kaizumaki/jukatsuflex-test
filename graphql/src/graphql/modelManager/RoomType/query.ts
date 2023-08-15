import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { RoomType } from 'nexus-prisma'

export const RoomTypesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('roomTypeConnection', {
      type: RoomType.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.roomType.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.roomType.count()
          },
        })
      },
    })
    t.field('getRoomType', {
      type: RoomType.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.roomType.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})