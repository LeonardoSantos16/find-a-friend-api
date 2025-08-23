import { Pet } from '@/domain/entities/pet'
import { PetRepository } from '@/repositories/pets-repository'

export class GetPetDetailsUseCase {
  constructor(private petRepository: PetRepository) {}
  async execute(id: string): Promise<Pet | null> {
    const pet = await this.petRepository.findById(id)
    return pet
  }
}
