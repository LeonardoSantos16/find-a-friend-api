import { Organization } from '@/domain/entities/organization'
import { OrgsRepository } from '@/repositories/orgs-repository'

export class GetOrgByEmailUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(id: string): Promise<Organization | null> {
    const org = await this.orgsRepository.findById(id)
    return org
  }
}
