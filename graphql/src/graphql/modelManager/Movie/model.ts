import { objectType } from 'nexus'
import { Movie } from 'nexus-prisma'

export const MovieObject = objectType({
  name: Movie.$name,
  description: Movie.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(Movie.estimatedTime)
    t.field(Movie.learningTime)
    t.field(Movie.fixPartId)
    t.field(Movie.createdAt)
    t.field(Movie.updatedAt)
    t.field(Movie.movieSkills)
    t.field(Movie.movieTools)
  },
})