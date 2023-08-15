import { objectType } from 'nexus'
import { FixPart } from 'nexus-prisma'

export const FixPartObject = objectType({
  name: FixPart.$name,
  description: FixPart.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(FixPart.estimateFixTime)
    t.field(FixPart.houseId)
    t.field(FixPart.createdAt)
    t.field(FixPart.updatedAt)
    t.field(FixPart.roomTypeFixParts)
  },
})