import { Pet } from '@/domain/entities/pet'
import { EnergyLevel, IndependenceLevel, Size } from '@/generated/prisma'

export interface FindManyByParams {
  city?: string
  size?: Size
  energy_level?: EnergyLevel
  level_independence?: IndependenceLevel
}

export interface PetRepository {
  create(data: Pet): Promise<void>
  findById(id: string): Promise<Pet | null>
  findManyByFilter(params: FindManyByParams): Promise<Pet[]>
}
