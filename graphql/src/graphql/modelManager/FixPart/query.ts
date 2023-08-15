import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { FixPart } from 'nexus-prisma'

export const FixPartsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('fixPartConnection', {
      type: FixPart.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.fixPart.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.fixPart.count()
          },
        })
      },
    })
    t.field('getFixPart', {
      type: FixPart.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.fixPart.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})