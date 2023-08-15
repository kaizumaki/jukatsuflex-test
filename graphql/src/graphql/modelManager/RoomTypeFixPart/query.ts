import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { RoomTypeFixPart } from 'nexus-prisma'

export const RoomTypeFixPartsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('roomTypeFixPartConnection', {
      type: RoomTypeFixPart.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.roomTypeFixPart.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.roomTypeFixPart.count()
          },
        })
      },
    })
    t.field('getRoomTypeFixPart', {
      type: RoomTypeFixPart.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.roomTypeFixPart.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})