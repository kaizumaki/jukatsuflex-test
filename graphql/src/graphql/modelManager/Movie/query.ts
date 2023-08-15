import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { Movie } from 'nexus-prisma'

export const MoviesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('movieConnection', {
      type: Movie.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.movie.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.movie.count()
          },
        })
      },
    })
    t.field('getMovie', {
      type: Movie.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.movie.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})