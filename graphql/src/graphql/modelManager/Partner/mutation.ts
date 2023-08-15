import { extendType,  stringArg, intArg, floatArg, BooleanArg } from 'nexus'
import { toPrismaId } from '@/lib/toPrismaId'
import { Partner } from 'nexus-prisma'
import { GraphQLError } from 'graphql'

export const PartnerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPartner', {
      type: Partner.$name,
      args: {
        companyName: stringArg(),
        contactPerson: stringArg(),
        companyAddress: stringArg(),
        companyTel: stringArg(),
        houseId: intArg(),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.partner.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new GraphQLError(`error: ${error}`)
        }
      },
    })
    t.field('updatePartner', {
      type: Partner.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        if (!args.id) throw new GraphQLError('id is required')

        const id = toPrismaId(args.id)
        const data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.partner.update({
            where: {
              id
            },
            data
          })
        } catch (error) {
          console.log(error)
          throw new GraphQLError(`error: ${error}`)
        }
      },
    })
    t.field('deletePartner', {
      type: Partner.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, { id }, ctx) {
        try {
          if (!id) throw new GraphQLError('id is required')

          return await ctx.prisma.partner.delete({
            where: {
              id: toPrismaId(id),
            },
          })
        } catch (error) {
          throw new GraphQLError(`error: ${error}`)
        }
      },
    })
  },
})