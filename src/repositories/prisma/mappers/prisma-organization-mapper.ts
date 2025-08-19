import { Organization } from '@/domain/entities/organization'
import { Organization as PrimaOrganization } from '@/generated/prisma'

export class PrismaOrganizationMapper {
  static toDomain(raw: PrimaOrganization): Organization {
    return Organization.create(
      {
        responsibleName: raw.responsible_name,
        email: raw.email,
        cep: raw.cep,
        address: raw.address,
        city: raw.city,
        password: raw.password,
        createdAt: raw.created_at,
        whatsapp: raw.whatsapp,
      },
      raw.id
    )
  }

  static toPrisma(organization: Organization) {
    return {
      id: organization.id,
      responsible_name: organization.props.responsibleName,
      email: organization.props.email,
      address: organization.props.address,
      created_at: organization.props.createdAt,
      whatsapp: organization.props.whatsapp,
      password: organization.props.password,
      cep: organization.props.cep,
      city: organization.props.city,
    }
  }
}
