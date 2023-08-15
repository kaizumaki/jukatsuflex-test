import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { Partner } from 'nexus-prisma'

export const PartnersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('partnerConnection', {
      type: Partner.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.partner.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.partner.count()
          },
        })
      },
    })
    t.field('getPartner', {
      type: Partner.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.partner.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})