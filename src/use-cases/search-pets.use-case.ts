import { Pet } from '@/domain/entities/pet'
import { EnergyLevel, IndependenceLevel, Size } from '@/generated/prisma'
import { FindManyByParams, PetRepository } from '@/repositories/pets-repository'

export interface FindByFilterPetUseCaseRequest {
  city?: string
  independence_level?: IndependenceLevel
  energy_level?: EnergyLevel
  size?: Size
}

export interface FindByFilterPetUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(
    params: FindByFilterPetUseCaseRequest
  ): Promise<FindByFilterPetUseCaseResponse> {
    const pets = await this.petRepository.findManyByFilter(params)
    return { pets }
  }
}
