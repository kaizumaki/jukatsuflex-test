import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { MovieTool } from 'nexus-prisma'

export const MovieToolsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('movieToolConnection', {
      type: MovieTool.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.movieTool.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.movieTool.count()
          },
        })
      },
    })
    t.field('getMovieTool', {
      type: MovieTool.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.movieTool.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})