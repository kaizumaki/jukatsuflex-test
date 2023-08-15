import { objectType } from 'nexus'
import { RoomType } from 'nexus-prisma'

export const RoomTypeObject = objectType({
  name: RoomType.$name,
  description: RoomType.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(RoomType.name)
    t.field(RoomType.createdAt)
    t.field(RoomType.updatedAt)
    t.field(RoomType.roomTypeFixParts)
  },
})