import { Pet, PetProps } from '@/domain/entities/pet'
import { PetRepository } from '@/repositories/pets-repository'

export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    about,
    name,
    size,
    images,
    age,
    environment,
    energyLevel,
    levelIndependence,
    orgId,
  }: PetProps) {
    const payload = Pet.create({
      about,
      name,
      size,
      images,
      age,
      environment,
      energyLevel,
      levelIndependence,
      orgId,
    })
    await this.petRepository.create(payload)
  }
}
