import { Pet } from '@/domain/entities/pet'
import { prisma } from '@/lib/prisma'
import { FindManyByParams, PetRepository } from '../pets-repository'
import { PrismaPetMapper } from './mappers/prisma-pet-mapper'

export class PrismaPetRepository implements PetRepository {
  async create(pet: Pet): Promise<void> {
    const data = PrismaPetMapper.toPrisma(pet)
    await prisma.pet.create({ data })
  }
  async findById(id: string): Promise<Pet | null> {
    const data = await prisma.pet.findUniqueOrThrow({ where: { id } })
    return PrismaPetMapper.toDomain(data)
  }

  async findManyByFilter(params: FindManyByParams): Promise<Pet[]> {
    const petsData = await prisma.pet.findMany({
      where: {
        org: { city: { equals: params.city, mode: 'insensitive' } },
        ...(params.size && { size: params.size }),
        ...(params.energy_level && { energy_level: params.energy_level }),
        ...(params.level_independence && {
          level_independence: params.level_independence,
        }),
      },
    })
    return petsData.map(PrismaPetMapper.toDomain)
  }
}
