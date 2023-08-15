import { objectType } from 'nexus'
import { Tool } from 'nexus-prisma'

export const ToolObject = objectType({
  name: Tool.$name,
  description: Tool.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(Tool.name)
    t.field(Tool.createdAt)
    t.field(Tool.updatedAt)
    t.field(Tool.movieTools)
  },
})