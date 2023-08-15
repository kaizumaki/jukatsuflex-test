import { objectType } from 'nexus'
import { MovieSkill } from 'nexus-prisma'

export const MovieSkillObject = objectType({
  name: MovieSkill.$name,
  description: MovieSkill.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(MovieSkill.movieId)
    t.field(MovieSkill.skillId)
    t.field(MovieSkill.createdAt)
    t.field(MovieSkill.updatedAt)
  },
})