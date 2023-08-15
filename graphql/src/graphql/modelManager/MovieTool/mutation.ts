import { extendType,  stringArg, intArg, floatArg, BooleanArg } from 'nexus'
import { toPrismaId } from '@/lib/toPrismaId'
import { MovieTool } from 'nexus-prisma'
import { GraphQLError } from 'graphql'

export const MovieToolMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createMovieTool', {
      type: MovieTool.$name,
      args: {
        movieId: intArg(),
        toolId: intArg(),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.movieTool.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new GraphQLError(`error: ${error}`)
        }
      },
    })
    t.field('updateMovieTool', {
      type: MovieTool.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        if (!args.id) throw new GraphQLError('id is required')

        const id = toPrismaId(args.id)
        const data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.movieTool.update({
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
    t.field('deleteMovieTool', {
      type: MovieTool.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, { id }, ctx) {
        try {
          if (!id) throw new GraphQLError('id is required')

          return await ctx.prisma.movieTool.delete({
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