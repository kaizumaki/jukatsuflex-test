import { objectType } from 'nexus'
import { UserSkill } from 'nexus-prisma'

export const UserSkillObject = objectType({
  name: UserSkill.$name,
  description: UserSkill.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(UserSkill.userId)
    t.field(UserSkill.skillId)
    t.field(UserSkill.createdAt)
    t.field(UserSkill.updatedAt)
  },
})