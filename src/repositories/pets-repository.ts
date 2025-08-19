import { Prisma, Pet } from '@/generated/prisma'

export interface FindManyByParams {
  city?: string
  level_independence?: string
  energy_level?: string
  size?: string
}

export interface PetRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet>
  findManyByFilter(params: FindManyByParams): Promise<Pet[]>
}
