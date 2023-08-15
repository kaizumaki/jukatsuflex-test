import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { UserSkill } from 'nexus-prisma'

export const UserSkillsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('userSkillConnection', {
      type: UserSkill.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.userSkill.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.userSkill.count()
          },
        })
      },
    })
    t.field('getUserSkill', {
      type: UserSkill.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.userSkill.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})