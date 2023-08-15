import { objectType } from 'nexus'
import { House } from 'nexus-prisma'

export const HouseObject = objectType({
  name: House.$name,
  description: House.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(House.name)
    t.field(House.address)
    t.field(House.userId)
    t.field(House.createdAt)
    t.field(House.updatedAt)
  },
})