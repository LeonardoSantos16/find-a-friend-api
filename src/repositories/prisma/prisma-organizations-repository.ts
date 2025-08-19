import { Organization } from '@/domain/entities/organization'
import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '../orgs-repository'
import { PrismaOrganizationMapper } from './mappers/prisma-organization-mapper'

export class PrismaOrganizationsRepository implements OrgsRepository {
  async create(organization: Organization): Promise<void> {
    const data = PrismaOrganizationMapper.toPrisma(organization)
    await prisma.organization.create({
      data,
    })
  }
  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({ where: { id } })
    if (!organization) {
      return null
    }

    return PrismaOrganizationMapper.toDomain(organization)
  }
}
