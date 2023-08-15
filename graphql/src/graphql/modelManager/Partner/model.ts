import { objectType } from 'nexus'
import { Partner } from 'nexus-prisma'

export const PartnerObject = objectType({
  name: Partner.$name,
  description: Partner.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(Partner.companyName)
    t.field(Partner.contactPerson)
    t.field(Partner.companyAddress)
    t.field(Partner.companyTel)
    t.field(Partner.acceptableAreas)
    t.field(Partner.houseId)
    t.field(Partner.createdAt)
    t.field(Partner.updatedAt)
  },
})