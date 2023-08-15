import { extendType,  stringArg, intArg, floatArg, BooleanArg } from 'nexus'
import { toPrismaId } from '@/lib/toPrismaId'
import { Skill } from 'nexus-prisma'
import { GraphQLError } from 'graphql'

export const SkillMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createSkill', {
      type: Skill.$name,
      args: {
        name: stringArg(),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.skill.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new GraphQLError(`error: ${error}`)
        }
      },
    })
    t.field('updateSkill', {
      type: Skill.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        if (!args.id) throw new GraphQLError('id is required')

        const id = toPrismaId(args.id)
        const data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.skill.update({
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
    t.field('deleteSkill', {
      type: Skill.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, { id }, ctx) {
        try {
          if (!id) throw new GraphQLError('id is required')

          return await ctx.prisma.skill.delete({
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