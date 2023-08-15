import { extendType,  stringArg, intArg, floatArg, BooleanArg } from 'nexus'
import { toPrismaId } from '@/lib/toPrismaId'
import { FixPart } from 'nexus-prisma'
import { GraphQLError } from 'graphql'

export const FixPartMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createFixPart', {
      type: FixPart.$name,
      args: {
        estimateFixTime: stringArg(),
        houseId: intArg(),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.fixPart.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new GraphQLError(`error: ${error}`)
        }
      },
    })
    t.field('updateFixPart', {
      type: FixPart.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        if (!args.id) throw new GraphQLError('id is required')

        const id = toPrismaId(args.id)
        const data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.fixPart.update({
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
    t.field('deleteFixPart', {
      type: FixPart.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, { id }, ctx) {
        try {
          if (!id) throw new GraphQLError('id is required')

          return await ctx.prisma.fixPart.delete({
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