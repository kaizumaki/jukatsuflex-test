import { objectType } from 'nexus'
import { Skill } from 'nexus-prisma'

export const SkillObject = objectType({
  name: Skill.$name,
  description: Skill.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(Skill.name)
    t.field(Skill.createdAt)
    t.field(Skill.updatedAt)
    t.field(Skill.userSkills)
    t.field(Skill.movieSkills)
  },
})