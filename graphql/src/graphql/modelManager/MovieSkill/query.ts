import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { MovieSkill } from 'nexus-prisma'

export const MovieSkillsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('movieSkillConnection', {
      type: MovieSkill.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.movieSkill.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.movieSkill.count()
          },
        })
      },
    })
    t.field('getMovieSkill', {
      type: MovieSkill.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.movieSkill.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})