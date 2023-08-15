import { extendType,  stringArg, intArg, floatArg, BooleanArg } from 'nexus'
import { toPrismaId } from '@/lib/toPrismaId'
import { RoomTypeFixPart } from 'nexus-prisma'
import { GraphQLError } from 'graphql'

export const RoomTypeFixPartMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createRoomTypeFixPart', {
      type: RoomTypeFixPart.$name,
      args: {
        roomTypeId: intArg(),
        fixPartId: intArg(),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.roomTypeFixPart.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new GraphQLError(`error: ${error}`)
        }
      },
    })
    t.field('updateRoomTypeFixPart', {
      type: RoomTypeFixPart.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        if (!args.id) throw new GraphQLError('id is required')

        const id = toPrismaId(args.id)
        const data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.roomTypeFixPart.update({
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
    t.field('deleteRoomTypeFixPart', {
      type: RoomTypeFixPart.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, { id }, ctx) {
        try {
          if (!id) throw new GraphQLError('id is required')

          return await ctx.prisma.roomTypeFixPart.delete({
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