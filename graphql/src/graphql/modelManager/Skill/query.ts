import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { Skill } from 'nexus-prisma'

export const SkillsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('skillConnection', {
      type: Skill.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.skill.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.skill.count()
          },
        })
      },
    })
    t.field('getSkill', {
      type: Skill.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.skill.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})