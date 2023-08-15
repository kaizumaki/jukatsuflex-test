import { objectType } from 'nexus'
import { RoomTypeFixPart } from 'nexus-prisma'

export const RoomTypeFixPartObject = objectType({
  name: RoomTypeFixPart.$name,
  description: RoomTypeFixPart.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(RoomTypeFixPart.roomTypeId)
    t.field(RoomTypeFixPart.fixPartId)
    t.field(RoomTypeFixPart.createdAt)
    t.field(RoomTypeFixPart.updatedAt)
  },
})