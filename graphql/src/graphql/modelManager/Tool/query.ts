import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { Tool } from 'nexus-prisma'

export const ToolsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('toolConnection', {
      type: Tool.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.tool.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.tool.count()
          },
        })
      },
    })
    t.field('getTool', {
      type: Tool.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.tool.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})