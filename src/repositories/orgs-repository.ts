import { Organization } from '@/domain/entities/organization'

export interface OrgsRepository {
  create(data: Organization): Promise<void>
  findById(id: string): Promise<Organization | null>
}
