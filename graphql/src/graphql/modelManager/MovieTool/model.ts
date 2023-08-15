import { objectType } from 'nexus'
import { MovieTool } from 'nexus-prisma'

export const MovieToolObject = objectType({
  name: MovieTool.$name,
  description: MovieTool.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(MovieTool.movieId)
    t.field(MovieTool.toolId)
    t.field(MovieTool.createdAt)
    t.field(MovieTool.updatedAt)
  },
})